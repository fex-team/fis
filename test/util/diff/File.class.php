<?php

/**
 * 文件类，用于分析、存储文件相关信息及数据
 *
 * @package core.kernel
 * @copyright 2011-2012 FIS team
 * @license
 * @link      http://fis.baidu.com/
 */

final class File {

    /**
     * 格式化的文件绝对路径
     * @var string
     */
    public $filepath;

    /**
     * 文件所在目录的格式化绝对路径
     * @var string
     */
    public $dirname;

    /**
     * 文件名，不含后缀
     * @var string
     */
    public $filename;

    /**
     * 包含后缀的文件名
     * @var string
     */
    public $basename;

    /**
     * 文件后缀
     * @var string
     */
    public $ext = '';

    /**
     * 文件类型，默认为“file”，创建文件后，可由业务框架对其类别进行判断
     * @var string
     */
    public $type = 'file';

    /**
     * 文件路径的分割数组
     * @var array
     */
    public $split = array();

    /**
     * 查询字符串，创建文件对象时，可以分离出"?参数=值"这样的字符串
     * @var string
     */
    public $query = '';

    /**
     * 相对用户根目录的子路径
     * @var string
     */
    public $subpath;

    /**
     * 文件编译后产出路径的相对路径，用于和产出目录拼成产出绝对路径
     * @var string
     */
    public $release;

    /**
     * 文件是否需要以hash形式产出
     * @var bool
     */
    public $md5_release = false;

    /**
     * 标记文件内容是否经过语法解析
     * @var bool
     */
    public $parsed = false;

    /**
     * 当前文件是否为文本文件
     * @var bool
     */
    protected $_isText = false;

    /**
     * 暂存文件的hash
     * @var string
     */
    protected $_hash;

    /**
     * 文件的内容暂存
     * @var string
     */
    protected $_content;

    /**
     * 文件的附属信息，在语法处理中会对其进行修改，业务框架也会加工此数据
     * @var array
     */
    protected $_info = array();

    /**
     * 构造函数，分析文件的基本信息。会调用FIS的接口来分析文件
     * @param string $path 可以是已存在的文件，也可以是不存在的文件
     * @see FIS::analyseFile
     */
    public function __construct($path){
        if (($pos = strpos($path, '?')) !== false) {
            //query
            $this->query = substr($path, $pos + 1);
            $path = substr($path, 0, $pos);
        }
        if (is_file($path)) {
            $path = self::realpath($path);
        } else if (is_dir($path)) {
            FISLog::error("File类不能处理目录[{$path}].");
        } else {
            $path = self::normalize($path);
        }
        $this->filepath = $path;
        $split = self::getPathSplit($path, $prefix);
        $this->basename = $basename = array_pop($split);
        $this->dirname = $prefix . implode('/', $split);
        if (($pos = strrpos($basename, '.')) === false) {
            $this->filename = $basename;
        } else {
            $this->filename = substr($basename, 0, $pos);
            $this->ext = $ext = substr($basename, $pos + 1);
            $this->_isText = self::isTextFile('.' . $ext);
        }
        /*
        if($root){
            $this->release = $this->subpath = str_replace($root, '', $this->filepath);
            $this->split = self::getPathSplit($this->subpath);
        } else {
        */
            $this->split = $split;
        //}
    }

    /**
     * 返回格式化的文件绝对路径
     * @return string
     */
    public function __toString(){
        return $this->filepath;
    }

    /**
     * 返回文件或者目录是否存在
     * @return bool
     */
    public function exists(){
        return file_exists($this->filepath);
    }

    /**
     * 从缓存文件中恢复文件数据，包括info、content
     * @param FISCache $cache 缓存对象
     * @return bool 如果缓存存在，则返回true，否则返回false
     */
    public function revertCache(FISCache $cache){
        if($cache->exists()){
            $this->_content = $cache->get();
            $properties = $cache->getCachedFileProperties();
            foreach($properties as $key => $value){
                 $this->setInfo($key, $value);
            }
            return true;
        }
        return false;
    }

    /**
     * 将文件数据存储为缓存
     * @param FISCache $cache 缓存对象
     * @param bool $replacePHPTag 是否替换php标签
     */
    public function saveCache(FISCache $cache, $replacePHPTag = true){
        $cache->setData($this->getContent(), $replacePHPTag);
        $cache->setProperties($this->getInfo());
        $cache->save();
    }

    /**
     * 当前文件是否为文本文件
     * @return bool
     */
    public function isText(){
        return $this->_isText;
    }

    /**
     * 获取文件内容，第一次会从源文件中读取，后面会暂存在对象中，供语法工具处理
     * @return mixed
     */
    public function getContent(){
        if($this->_content === null){
            $this->_content = self::read($this->filepath);
        }
        return $this->_content;
    }

    /**
     * 设置文件内容
     * @param string $content
     */
    public function setContent($content){
        $this->_content = $content;
    }

    /**
     * 设置文件附属信息
     * @param string|array $key
     * @param mixed $value
     */
    public function setInfo($key, $value = null){
        $this->_info[$key] = $value;
    }

    /**
     * 批量设置文件附属信息
     * @param array $value
     */
    public function setInfos(Array $value){
        foreach($value as $key => $val){
            $this->_info[$key] = $val;
        }
    }

    /**
     * 获取文件附属信息
     * @param null|string $key 如果为null，则返回所有附属信息
     * @return mixed
     */
    public function getInfo($key = null){
        if($key == null){
            return $this->_info;
        } else {
            return $this->_info[$key];
        }
    }

    /**
     * 获取文件的hash值，默认返回前8位，可以通过project的md5_length属性来修改
     * @return string
     */
    public function getHash(){
        if(!$this->_hash){
            if(!$this->parsed){
                FIS::parse($this);
            }
            $this->_hash = self::getContentHash($this->getContent());
        }
        return $this->_hash;
    }

    //---------------------------------------------- 静态方法 ----------------------------------------------//

    /**
     * 获取文件后缀，可以排除“?”查询字符串
     * @static
     * @param string $path
     * @return string
     */
    public static function getExt($path){
        if (($pos = strpos($path, '?')) !== false) {
            $path = substr($path, 0, $pos);
        }
        if (($pos = strrpos($path, '.')) !== false) {
            $ext = substr($path, $pos + 1);
        } else {
            $ext = '';
        }
        return $ext;
    }

    /**
     * 根据文件内容获取hash值
     * @static
     * @param $content
     * @return string
     */
    public static function getContentHash($content){
        return substr(
            hash('md4', $content),
            0,
            FIS::get('project', 'md5_length', 8)
        );
    }

    /**
     * 格式化路径字符串
     *
     * * replace "\" to "/"
     * * replace contiguous "/" to one "/"
     * * replace "a/b/../c" to "a/c"
     * * remove "/./"
     * * remove "/" at the end.
     *
     * @static
     * @param string $path 路径字符串（路径存在与否）
     * @return string
     */
    public static function normalize($path) {
        $normal_path = preg_replace(
            array('/[\/\\\\]+/', '/\/\.\//', '/^\.\/|\/\.$/', '/\/$/'),
            array('/', '/', '', ''),
            $path
        );
        $path = $normal_path;
        do {
            $normal_path = $path;
            $path = preg_replace('/[^\\/\\.]+\\/\\.\\.(?:\\/|$)/', '', $normal_path);
        } while ($path != $normal_path);
        $path = preg_replace('/\/$/', '', $path);
        return $path;
    }

    /**
     * 判断当前系统是否为windows
     * @static
     * @return bool
     */
    public static function isWin() {
        return FIS_IS_WIN;
    }

    /**
     * 判断路径字符串是否是绝对路径
     * @static
     * @param string $path
     * @return bool
     */
    public static function isAbsolute($path) {
        if (self::isWin()) {
            return 0 != preg_match("/^[a-z]\\:/i", $path);
        } else {
            if ($path == '/') {
                return false;
            }
            $split = explode('/', $path);
            return (($split[0] == '' && $split[1] && is_dir('/' . $split[1])) || $split[0] == '~');
        }
    }

    /**
     * @static   编译后查看css中引用的文件是否是相对路径，"./"
     * @param $path
     * @return bool
     */
    public static function isRelative($path) {
        return 0 != preg_match('/^[^\/]/i', $path);
    }

    /**
     * @static   编译后查看Smarty中引用的文件是否是相对路径，"./"
     * @param $path
     * @return bool
     */
    public static function isTplRelative($path) {
        return 0 != preg_match('/^\./i', $path);
    }

    /**
     * 判断文件路径字符串是否为文本文件，文本文件由后缀决定，包括（css、tpl、js、php、txt、json、xml、htm、text、xhtml、html、conf、json、po、config）
     * @static
     * @param string $path
     * @return bool
     */
    public static function isTextFile($path){
        return preg_match('/\.(?:css|tpl|js|php|txt|json|xml|htm|text|xhtml|html|conf|json|po|config)$/i', $path) != false;
    }

    /**
     * 将路径或url切分为数组
     * @static
     * @param $url 路径或url
     * @param null $prefix 通过该值可以获取到要处理的路径第一位字符，该值是“/”或空字符串
     * @return array
     */
    public static function getPathSplit($url, &$prefix = null) {
        $prefix = $url{0} == '/' ? '/' : '';
        $url = preg_replace(array('/^\//', '/\/$/'), '', $url);
        return explode('/', $url);
    }

    /**
     * 判断给定文件路径是否符合include和exclude规则
     * @static
     * @param string $file 路径字符串
     * @param null $include 包含文件的正则
     * @param null $exclude 排除文件的正则
     * @param null $m 从这个值可以获取包含正则的匹配分组
     * @return bool
     */
    public static function filter($file, $include = null, $exclude = null, &$m = null) {
        return !(($include && preg_match($include, $file, $m) == 0) || ($exclude && preg_match($exclude, $file) != 0));
    }

    /**
     * 将通配符字符串翻译为正则表达式
     * @static
     * @param string $pattern
     * @return string
     */
    public static function getPathExpReg($pattern) {
        $rePattern = preg_quote(str_replace('\\', '/', $pattern), '/');
        $dirSep = preg_quote('\\', '/');
        $patternReplacements = array(
            $dirSep . '\*\*' . $dirSep => $dirSep . '.*(?:' . $dirSep . ')?',
            $dirSep . '\*\*' => $dirSep . '.*',
            '\*\*' . $dirSep => '.*',
            '\*\*' => '.*',
            '\*' => '[^' . $dirSep . ']*',
            '\?' => '[^' . $dirSep . ']'
        );
        return str_replace(
            array_keys($patternReplacements),
            array_values($patternReplacements),
            $rePattern
        ) . '$';
    }

    /**
     * 返回统一'/'分隔符的realpath结果
     * @static
     * @param string $path
     * @return string|bool
     */
    public static function realpath($path){
        //第一次字符从替换，是防止linux下对\识别错误
        $path = realpath(str_replace('\\', '/', $path));
        if($path && self::isWin()){
            //第二次替换，是将win下的反斜杠替换回来
            $path = str_replace('\\', '/', $path);
        }
        return $path;
    }

    /**
     * 查找指定目录下的文件或目录
     * @static
     * @param string $path 目录路径
     * @param null $include 要包含的文件正则，如果设置了，则只有符合这个正则的文件才能被请求到
     * @param null $exclude  要排除的文件正则，如果设置了，即使是包含的文件，也会被排除
     * @param bool $recursion 是否递归查找，默认是true
     * @param bool $include_dir 找到的结果是否包含目录，默认为false，不包含
     * @param array $files 递归用的存储容器，不应该被用到
     * @return array 数组
     */
    public static function find($path, $include = null, $exclude = null, $recursion = true, $include_dir = false, &$files = array()) {
        $path = self::realpath($path);
        if (is_dir($path)) {
            $path .= '/';
            $dir = dir($path);
            while (false !== ($entry = $dir->read())) {
                if ($entry == '.' || $entry == '..' || ($entry{0} == '.' && is_dir($entry))) {
                    continue;
                }
                $entry = $path . $entry;
                if (is_dir($entry)) {
                    if ($include_dir && self::filter($entry, $include, $exclude)) {
                        $files[] = $entry;
                    }
                    if ($recursion) {
                        self::find($entry, $include, $exclude, true, $include_dir, $files);
                    }
                } else {
                    if (!self::filter($entry, $include, $exclude)) {
                        continue;
                    }
                    $files[] = $entry;
                }
            }
            $dir->close();
            return $files;
        } else if (is_file($path) && self::filter($path, $include, $exclude)) {
            $files[] = $path;
        }
        return $files;
    }

    /**
     * 将文件或目录复制到到指定位置，支持从文件复制到文件、从目录复制到目录、从文件复制到目录
     * @static
     * @param string $source 要复制的文件或目录路径
     * @param string $target 目标路径
     * @param null $include 包含文件正则
     * @param null $exclude 排除文件正则
     * @param bool $cover 是否覆盖已存在的目标文件，默认是TRUE，覆盖
     * @param bool $recursion 是否递归复制操作，默认是TRUE，递归
     * @param bool $move 是否为移动操作 默认False
     */
    public static function copy($source, $target, $include = null, $exclude = null, $cover = true, $recursion = true, $move = false) {
        $source = self::realpath($source);
        if (is_dir($source)) {
            $source = $source . '/';
            if (is_file(self::realpath($target))) {
                FISLog::error("There is a file named {$target} can't copy to.");
            } else {
                self::mkdir($target, 0777);
                $target = self::realpath($target) . '/';
                $dir = dir($source);
                while (($file = $dir->read()) !== false) {
                    if ($file == '.' || $file == '..' || ($file{0} == '.' && is_dir($file))) {
                        continue;
                    }
                    if (!self::filter(str_replace('\\', '/', $source) . $file, $include, $exclude)) {
                        continue;
                    }
                    $s = $source . $file;
                    $t = $target . $file;
                    if (is_dir($s)) {
                        if ($recursion && stripos(self::realpath($target), self::realpath($file)) === false) {
                            self::copy($s, $t, $include, $exclude, $cover, true, $move);
                        }
                        continue;
                    } else if (file_exists($t) && $cover == false) {
                        continue;
                    } else {
                        if (file_exists($t)) {
                            self::delete($t);
                        }
                        if($move)
                            rename($s, $t);
                        else
                            copy($s, $t);
                    }
                }
                $dir->close();
            }
        } elseif (is_file($source)) {
            if (is_file($target) && !$cover) {
                return;
            }
            $targetName = null;
            $info = pathinfo($target);
            if (!file_exists($target)) {
                if (array_key_exists('extension', $info)) {
                    $target = $info['dirname'];
                    $targetName = $info['basename'];
                }
                self::mkdir($target);
            } elseif (is_file($target)) {
                self::delete($target);
                $target = dirname($target);
                $targetName = $info['basename'];
            }
            $info = pathinfo($source);
            $name = isset($targetName) ? $targetName : $info['basename'];
            if($move)
                rename($source, self::realpath($target) . '/' . $name);
            else
                copy($source, self::realpath($target) . '/' . $name);
        } else {
            FISLog::error("The {$source} is not a file or directory!");
        }
    }

    /**
     * 删除文件或目录
     * @static
     * @param string $path 要删除的文件或目录
     * @param null $include 要删除的文件正则
     * @param null $exclude 不删除的文件正则
     * @return bool 删除成功返回true，否则返回false
     */
    public static function delete($path, $include = null, $exclude = null) {
        $result = true;
        $path = self::realpath($path);
        //防止错误删除根目录
        if ($path == false || $path == self::realpath('/')) {
            return $result;
        }
        if (is_dir($path)) {
            $path = $path . DIRECTORY_SEPARATOR;
            $dir = dir($path);
            while (($file = $dir->read()) !== false) {
                if ($file == '.' || $file == '..') {
                    continue;
                }
                $file = $path . $file;
                if (!self::filter(str_replace('\\', '/', $file), $include, $exclude)) {
                    continue;
                }
                if (is_dir($file)) {
                    $result = $result && self::delete($file, $include, $exclude);
                } else {
                    $result = $result && @unlink($file);
                }
            }
            $dir->close();
            $result = $result && @rmdir($path);
            return $result;
        } else {
            return @unlink($path);
        }
    }

    /**
     * 修改文件或目录权限
     * @static
     * @param string $path 文件或目录
     * @param int $mod 权限，默认是0777
     * @return bool 设置成功返回true，否则返回false
     */
    public static function chmod($path, $mod = 0777){
        if(file_exists($path)){
            if(@chmod($path, $mod)){
                return true;
            } else {
                FISLog::error("Chmod path[{$path}] mod[{$mod}] faild.");
            }
        } else {
            FISLog::error("Path[{$path}] is not a dir, can't chmod.");
        }
        return false;
    }

    /**
     * 写内容进文件，如果文件不存在，则创建
     * @static
     * @param string $path 目标路径
     * @param string $contents 文件内容
     * @param string $charset 写入的文件编码
     * @param int $dir_perms 设置权限，默认是0777
     * @return bool 写入成功则返回true，否则返回false
     */
    public static function write($path, $contents, $charset = null, $dir_perms = 0777) {
        if ($charset != null) {
            $contents = iconv('UTF-8', $charset, $contents);
        }
        $file = new self($path);
        if ($file->dirname !== '.' && !file_exists($file->dirname)) {
            if(self::mkdir($file->dirname, $dir_perms) == false){
                return false;
            }
        }
        return @file_put_contents($path, $contents) !== false;
    }

    /**
     * 从文件中读取内容，如果是文本文件，则以utf-8编码读入内存中
     * @static
     * @param string $file 文件路径
     * @param null|string $charset 此参数可以读取文件编码
     * @return string 返回文件内容
     */
    public static function read($file, &$charset = null) {
        if (is_file($file)) {
            $content = file_get_contents($file);
            if(self::isTextFile($file)){
                $charset = $charset == null ? self::getCharset($content) : self::normalizeCharset($charset);
                $content = iconv($charset, FIS_DEFAULT_CHARSET, $content);
            }
            return $content;
        } else {
            FISLog::error("Unable to get file contents {$file}");
            return '';
        }
    }

    /**
     * 判断文本内容的编码
     * @static
     * @param string $content 文本内容
     * @return string 编码值，UTF-8、GB2312或GBK
     */
    public static function getCharset($content) {
        $charset = $defaultCharset = "UTF-8";
        if (function_exists('mb_detect_encoding')) {
            $charset = mb_detect_encoding(
                $content,
                array_unique(
                    array(
                         $defaultCharset,
                         'UTF-8',
                         'GB2312',
                         'GBK'
                    )
                )
            );
            if ($charset === false) {
                $charset = $defaultCharset;
            }
        } else {
            if(utf8_encode(utf8_decode($content)) == $content){
                $charset = 'UTF-8';
            }
        }
        $charset = self::normalizeCharset($charset);
        return $charset;
    }

    /**
     * 格式化字符编码
     *
     * * UTF-8 or UTF8 => UTF-8
     * * GBK or CP936 => GBK
     * * GB2312 or EUC-CN => GB2312
     * * other => report a warning
     *
     * @static
     * @param  $charset 字符编码名称
     * @return string 格式化后的字符编码名称
     */
    public static function normalizeCharset($charset) {
        $charset = strtoupper($charset);
        switch ($charset) {
            case "UTF-8":
            case "UTF8":
                return "UTF-8";
            case "GBK":
            case "CP936":
                return "GBK";
            case "GB2312":
            case "EUC-CN":
                return "GB2312";
            default :
                FISLog::warning("Unknown charset[{$charset}].");
        }
        return $charset;
    }

    /**
     * 创建目录，并设置权限，默认是0777
     * @static
     * @param string $path 目录路径
     * @param int $mode 权限，默认是0777
     * @return bool 设置成功返回true，否则为false
     */
    public static function mkdir($path, $mode = 0777) {
        if (is_dir($path)) {
            return self::chmod($path, $mode);
        } else {
            if(@mkdir($path, $mode, true)){
                return true;
            }
        }
        return false;
    }

    public static function getSubpath($rootPath,$filePath){
        $rootPath = File::normalize($rootPath);
        $filePath = File::normalize($filePath);
        return str_replace($rootPath,"",$filePath);
    }
}
