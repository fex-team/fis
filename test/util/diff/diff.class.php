<?php
require_once dirname(__FILE__) . "/File.class.php";
require_once dirname(__FILE__) . "/inline_diff/inline_function.php";
/**
 * 对不同的版本编译的结果进行diff
 */
class Diff{
    /**
     * @var 版本编译对象
     */
//    protected $fisbuild_new;
//    protected $fisbuild_old;
    /**
     * @var  文件依赖分析工具
     */
//    protected $analyze;

    /**
     * @var $config 配置信息
     */
    private static $config = array();

    /**
     * @var string
     */
    protected $Diff = array();
//    protected $requireDiff = array();

    /**
     * @var string
     */
    protected $proInfo = array();

//    protected $loginfo =array();
//
//    protected $buildtimeinfo =array();

    protected static $rootPath;

    public function __construct($productName){
        self::$rootPath = File::normalize(dirname(__FILE__));
//        FILE::delete(self::$rootPath."/".$productName);
        self::loadConfig(self::$rootPath.'/config'.$_SESSION['o'].'.php');
        $product = self::getConfig('product');
        $this->proInfo = $product[$productName];
//        $this->analyze = new Analyze();
    }

//    protected  function getProduct(){
//        $productsvn = $this->proInfo['svn'];
//        $svncmd = "svn co --username=mawenlin --password= --no-auth-cache $productsvn ".$this->proInfo['dir']." 2>&1";
//        exec($svncmd,$info,$ret);
//        if($ret != 0){
//            echo "svn get code error! exist!"."\n";
//            var_dump($info);
//            exit;
//        }
//    }

    /**
     *  用新老版本的FIS对产品线的代码进行编译。
     */
//    public function build(){
//        $new = self::getConfig('new');
//        $old = self::getConfig('old');
//        $productmodules = $this->proInfo['modules'];
//
////        $this->getProduct();
//        //使用新版本的fis进行编译
//        $cmd_buildnew="php -f build.class.php ".$new['dir']." ".
//            $this->proInfo['newoutputdir']." ".
//            $this->proInfo['dir']." ".
//            $productmodules." ".
//            $this->proInfo['result']." ".
//            $new['fisname']." 2>&1";
//
//
//        //使用老版本的fis进行编译
//        $cmd_buildold="php -f build.class.php ".$old['dir']." ".
//            $this->proInfo['oldoutputdir']." ".
//            $this->proInfo['dir']." ".
//            $productmodules." ".
//            $this->proInfo['result']." ".
//            $old['fisname']." 2>&1";
//
//        var_dump($cmd_buildnew);
//        var_dump($cmd_buildold);
//        exec($cmd_buildnew,$outputnew,$retnew);
//        if($retnew){
//            var_dump($outputnew);
//            exit;
//        }
//        exec($cmd_buildold,$outputold,$retold);
//        if($retold){
//            var_dump($outputold);
//            exit;
//        }
//        reset_product_svn($this->proInfo['dir']);
//    }
    /**
     * 调用文件依赖分析工具，获取分析结果。
     */
//    protected  function analyzeEach($fisname,$outputDir,$resultDir){
//        $this->analyze->init($outputDir,ANALYZE_ROOT_PATH);
//
//        $this->analyze->analyzeFile();
//        //检查文件依赖关系是否正确
//        $this->analyze->lookForDefine();
//
//        $defines = "<?php $".$fisname."_define=".var_export(Info::getDefines(),TRUE).";";
//        $requires = "<?php $".$fisname."_require=".var_export(Info::getRequires(),TRUE).";";
//        $log = "<?php $".$fisname."_log=".var_export(Info::getLogInfo(),TRUE).";";
//
//        File::write($resultDir."/"."$fisname"."_define.php",$defines);
//        File::write($resultDir."/"."$fisname"."_require.php",$requires);
//        File::write($resultDir."/"."$fisname"."_log.php",$log);
//    }

    /**
     *  分析新老版本的文件依赖数据。
     */
//    public function analyze(){
//        $new = self::getConfig('new');
//        $old = self::getConfig('old');
//        /** 分别分析两个编译后的output文件夹 */
//        $this->analyzeEach($new['fisname'],$this->proInfo['newoutputdir'],$this->proInfo['result']);
//        $this->analyzeEach($old['fisname'],$this->proInfo['oldoutputdir'],$this->proInfo['result']);
//    }

    /**
     * 获取define数据不同的地方
     */
//    public function getDefineDiff(){
//        $fisname_new = self::getConfig('new','fisname');
//        $fisname_old = self::getConfig('old','fisname');
//        $resultDir = $this->proInfo['result'];
//        require_once $resultDir."/".$fisname_new."_define.php";
//        require_once $resultDir."/".$fisname_old."_define.php";
//
//        /** 先比较两个define中文件tpl文件不同的地方 */
//        foreach(${$fisname_new."_define"}['tpl'] as $key1 => $value1){
//            foreach(${$fisname_old."_define"}['tpl'] as $key2 => $value2){
//                if($key1 == $key2 && $value1 == $value2){
//                    unset(${$fisname_old."_define"}['tpl'][$key2]);
//                    unset(${$fisname_new."_define"}['tpl'][$key1]);
//                }else if($key1 != $key2 && $value1 == $value2){
//                    $diff_data = array(
//                        'name' => str_replace("/","_",$value1),
//                        'new' => $value1,
//                        'old' => $value1,
//                        'ext' => 'tpl',
//                    );
//                    array_push($this->Diff,$diff_data);
//                    unset(${$fisname_old."_define"}['tpl'][$key2]);
//                    unset(${$fisname_new."_define"}['tpl'][$key1]);
//                }
//            }
//        }
//        if(!empty(${$fisname_new."_define"}['tpl'])){
//            foreach(${$fisname_new."_define"}['tpl'] as $value){
//                $diff_data = array(
//                    'name' => str_replace("/","_",$value),
//                    'new' => $value,
//                    'old' => $value,
//                    'ext' => 'tpl'
//                );
//                array_push($this->Diff,$diff_data);
//            }
//        }
//        if(!empty(${$fisname_old."_define"}['tpl'])){
//            foreach(${$fisname_old."_define"}['tpl'] as $value){
//                $diff_data = array(
//                    'name' => str_replace("/","_",$value),
//                    'new' => $value,
//                    'old' => $value,
//                    'ext' => 'tpl',
//                );
//                array_push($this->Diff,$diff_data);
//            }
//        }
//    }

    /**
     * 根据define diff的结果获取，对应文件在新老版本下require的不同值。
     */
//    protected  function getRequireDiffFromDifine(){
//        $fisname_new = self::getConfig('new','fisname');
//        $fisname_old = self::getConfig('old','fisname');
//        $resultDir = $this->proInfo['result'];
//        require_once $resultDir."/"."$fisname_new"."_require.php";
//        require_once $resultDir."/"."$fisname_old"."_require.php";
//        $requireDiff=array();
//        foreach($this->Diff as $diff){
//            $diffs = array();
//            foreach(${$fisname_new."_require"} as $class_values){
//                $diffnew = File::normalize($this->proInfo['newoutputdir'] .$diff['new']);
//                //先获取md5值不一样的文件名，然后根据这个文件名去require的数组中获取对应的key值。
//                $keys = array_keys($class_values, $diffnew);
//                if(!empty($keys)){
//                    $diffs['new']=$keys;
//                }
//            }
//            //再从老版本里面拿require的信息
//            foreach(${$fisname_old."_require"} as $class_values){
//                $diffold = File::normalize($this->proInfo['oldoutputdir'] .$diff['old']);
//                //先获取md5值不一样的文件名，然后根据这个文件名去require的数组中获取对应的key值。
//                $keys=array_keys($class_values, $diffold);
//                if(!empty($keys)){
//                    $diffs['old']=$keys;
//                }
//            }
//            while(!empty($diffs['new'])){
//                $diff=array();
//                $new = array_pop($diffs['new']);
//                $old = array_pop($diffs['old']);
//                $diff['name'] = str_replace("/","_",$new);
//                $diff['new'] = $new;
//                $diff['old'] = $old;
//
//                $newfile = new FILE($this->proInfo['newoutputdir'].$new);
//                $diff['ext'] = $newfile->ext;
//                $cmd = "diff ".$this->proInfo['newoutputdir'].$new." ".$this->proInfo['oldoutputdir'].$old." 2>&1";
//                exec($cmd,$output,$retdiff);
//                if($retdiff && $diff['ext']!='tpl' && $diff['ext']!="html"){
//                    array_push($requireDiff,$diff);
//                }
//            }
//        }
//        foreach($requireDiff as $value){
//            if(!in_array($this->Diff,$value)){
//                array_push($this->Diff,$value);
//            }
//        }
//        return $requireDiff;
//    }

    /**
     * 获取文件依赖分析结果
     */
//    public function getLog(){
//        $fisname_new = self::getConfig('new','fisname');
//        $fisname_old = self::getConfig('old','fisname');
//        $resultDir = $this->proInfo['result'];
//        include $resultDir."/"."$fisname_new"."_log.php";
//        include $resultDir."/"."$fisname_old"."_log.php";
//
//        $this->loginfo['new'] = ${$fisname_new."_log"};
//        $this->loginfo['old'] = ${$fisname_old."_log"};
//    }

    /**
     * 获取前后编译时间不同
     */
//    public function getBuildTime(){
//        $fisname_new = self::getConfig('new','fisname');
//        $fisname_old = self::getConfig('old','fisname');
//        $resultDir = $this->proInfo['result'];
//        include $resultDir."/"."$fisname_new"."_buildtime.php";
//        include $resultDir."/"."$fisname_old"."_buildtime.php";
//
//        $buildtimes['new']=${$fisname_new."_buildtime"};
//        $buildtimes['old']=${$fisname_old."_buildtime"};
//
//        foreach($buildtimes['new'] as $key => $value){
//            $buildtime = array();
//            $buildtime['module'] = $key;
//            $buildtime['new'] = $value;
//            $buildtime['old'] = $buildtimes['old'][$key];
//            $buildtime['change']=round(($buildtime['new'] - $buildtime['old'])/$buildtime['old'],4)*100;
//            var_dump($buildtime['change']);
//            array_push($this->buildtimeinfo,$buildtime);
//        }
//    }

    /**
     * 获取文件夹下文件路径
     */
    protected function getFiles($path){
        if(is_dir($path)){
            $dp=dir($path);
            while($file=$dp->read())
                if($file!='.'&&$file!='..')
                    $this->getFiles($path.'/'.$file);
            $dp->close();
        }
        else {
            array_push($this->proInfo['files'],$path);
        }
    }

    protected function isImg($file_name,$pass_type=array('jpg','jpeg','gif','bmp','png')){
        $yx_file = $pass_type;
        $kzm = substr(strrchr($file_name,"."),1);
        $is_img = in_array(strtolower($kzm),$yx_file);
        if($is_img){
            return true;
        }else{
            return false;
        }
    }
    /**
     * 展示文件内容不同
     */
    public function DisplayDetails(){
        $smartyConfig = self::getConfig('smarty');
        $outputConfig = self::getConfig('output');
		$diffdatas = array();
        $this->proInfo['files'] = array();

        $this->getFiles($this->proInfo['oldoutputdir']);

        foreach($this->proInfo['files'] as $path){
            $old = $path;
            $new = str_replace($outputConfig['oldoutputdir'],$outputConfig['newoutputdir'],$old);
            if(filesize($old) != filesize($new) && !preg_match("/fis_version.txt$/", $old)){
                $this->smarty->assign('new',$new);
                $this->smarty->assign('old',$old);
                $newtext = file_get_contents($new);
                $oldtext = file_get_contents($old);
                $nl = '#**!)@#';
                $diffdata = inline_diff($oldtext, $newtext, $nl);
                array_push($diffdatas,$diffdata);
                //文件内容diff的结果展示
                $this->smarty->assign('diffdata',mb_convert_encoding($diffdata,'utf-8', 'gbk'));
                $html = $this->smarty->fetch($smartyConfig['templatedir']."diffdetails.tpl");
                $htmlpath = $smartyConfig['templatedir'].$this->proInfo['name']."_".str_replace("/", "_",substr($old,strrpos($old,$outputConfig['oldoutputdir']) + 13)).".html";
                $fileurl = self::getConfig('url').str_replace("/home/work/repos/","",$htmlpath);
                $diff = array(
                    'url' => $fileurl,
                    'name' => str_replace("/", "_",substr($old,strrpos($old,$outputConfig['oldoutputdir']) + 13)),
                    'old' => substr($old,strrpos($old,$outputConfig['oldoutputdir']) + 13),
                    'new' => substr($old,strrpos($new,$outputConfig['newoutputdir']) + 13)
                );
                array_push($this->Diff, $diff);
                File::write($htmlpath,$html);
            }
        }
//		$this->generateReport($diffdatas);
    }
    /**
     * 分别展示不同的地方
     */
    public function Display(){
//        $this->getDefineDiff(); //tpl文件不同的地方
//        $this->getRequireDiffFromDifine(); //静态资源不同的地方
//        $this->getLog(); //获取文件依赖关系分析信息
//        $this->getBuildTime();//获取编译时间的diff
        $smartyConfig = self::getConfig('smarty');
        require_once $smartyConfig['dir'].'/Smarty.class.php';
        $this->smarty = new Smarty();
        $this->smarty->setTemplateDir($smartyConfig['templatedir']);

        //展示文件内容的不同
        $this->DisplayDetails();

//        //文件依赖关系分析内容
//        //老的
//        $this->smarty->assign('difflog',$this->loginfo['old']);
//        $html = $this->smarty->fetch($smartyConfig['templatedir']."/analyzeinfo.tpl");
//        File::write($smartyConfig['templatedir'].$this->proInfo['name']."_old_log.html",$html);
//        $oldlogurl = self::getConfig('url').str_replace("/home/work/repos/","",
//            $smartyConfig['templatedir'].$this->proInfo['name']."_old_log.html");
//
//        //新的
//        $this->smarty->assign('difflog',$this->loginfo['new']);
//        $html = $this->smarty->fetch($smartyConfig['templatedir']."/analyzeinfo.tpl");
//        File::write($smartyConfig['templatedir'].$this->proInfo['name']."_new_log.html",$html);
//        $newlogurl = self::getConfig('url').str_replace("/home/work/repos/","",
//            $smartyConfig['templatedir'].$this->proInfo['name']."_new_log.html");

        //不同文件的list展示
        $this->smarty->assign('newversion',file_get_contents($this->proInfo['newoutputdir']."/fis_version.txt"));
        $this->smarty->assign('oldversion',file_get_contents($this->proInfo['oldoutputdir']."/fis_version.txt"));
        $this->smarty->assign('productname',$this->proInfo['name']);
        $this->smarty->assign('difflist',$this->Diff);
        $html = $this->smarty->fetch($smartyConfig['templatedir']."/difflist.tpl");
        File::write($smartyConfig['templatedir'].$this->proInfo['name']."_difflist.html",$html);
//        $diffData = array(
//            $this->proInfo['name'] =>$this->buildtimeinfo
//        );
//        $this->createDiffDate($diffData);
		$this->generateReport($this->Diff);
    }

    /**
     * 从php文件加载config，并合并到当前的配置数据中，加载成功则返回true，否则为false
     * @static
     * @param string $path php配置文件的路径，该文件内部代码为<?php $config=array(..);?>，配置数据必须是名为$config的变量
     * @return bool
     */
    public static function loadConfig($path) {
        if(is_file($path)){
            $config = array();
            try {
                include $path;
            } catch (Exception $e) {
                Log::error("配置文件[{$path}]解析失败：" . $e->getMessage());
            }
            self::merge($config);
            return self::$config;
        } else {
            Log::warning("配置文件[{$path}]不存在.");
        }
        return false;
    }

    /**
     * 将数据递归合并到当前配置数据上
     * @static
     * @param mixed $data 要合并的关联数组数据
     */
    public static function merge($data){
        self::_merge(self::$config, $data);
    }
    /**
     * 递归合并数据函数
     * @static
     * @param array $source
     * @param mixed $data
     */
    private static function _merge(&$source, $data){
        if(is_array($data)){
            foreach($data as $key => $value){
                if(array_key_exists($key, $source)){
                    self::_merge($source[$key], $value);
                } else {
                    $source[$key] = $value;
                }
            }
        } else {
            $source = $data;
        }
    }

    /**
     * @static
     * @param $key
     * @param $key1
     * @return null  返回配置信息
     */
    public static function getConfig($key,$key1=null){
        if(!$key){
            return  null;
        }else if($key1){
            return self::$config[$key][$key1];
        }else{
            return self::$config[$key];
        }
    }
	
	
	
	/*
	 *生成测试报告
	 *
	*/
	private function generateReport($diffdatas){
        $smartyConfig = self::getConfig('smarty');
		$dom = new DOMDocument("1.0","utf-8");
		$xmlFile = $smartyConfig['templatedir']."report.xml";
		$tatalCount = 0;
		$tatalFailure = 0;

		if(file_exists($xmlFile)){
			$dom->load($xmlFile);
			$testsuite = $dom->getElementsByTagName("testsuite")->item(0);
			$tatalCount = $testsuite->getAttribute("tests");
			$tatalFailure = $testsuite->getAttribute("failures");
		}else{
			$testsuites = $dom->createElement("testsuites");
			$dom->appendChild($testsuites);
			$testsuite = $dom->createElement("testsuite");
			$testsuites->appendChild($testsuite);
		}

		if(is_array($diffdatas) && count($diffdatas)>0){
			$count = count($diffdatas);
			$tatalCount += $count;
			$tatalFailure += $count;
			$testsuite->setAttribute("name","diff*  ");
			$testsuite->setAttribute("tests",$tatalCount);
			$testsuite->setAttribute("time",$tatalCount);
			$testsuite->setAttribute("failures",$tatalFailure);
			$testsuite->setAttribute("total",$tatalCount);

			foreach($diffdatas as $diffdata){
				$testcase=$dom->createElement("testcase");
				$testsuite->appendChild($testcase);
				$testcase->setAttribute("name",$diffdata["name"]);
				$testcase->setAttribute("time","1");
				$testcase->setAttribute("failures","1");
				$testcase->setAttribute("total","1");

				$failure = $dom->createElement("failure");
				$testcase->appendChild($failure);
				$failure->setAttribute("type","junit.framework.AssertionFailedError");
				$msgText = $dom->createTextNode("diff");
				$failure->appendChild($msgText);

			}

		}else if(!file_exists($xmlFile)){

			$testsuite->setAttribute("name","diff*  ");
			$testsuite->setAttribute("tests",1);
			$testsuite->setAttribute("time",1);
			$testsuite->setAttribute("failures",0);
			$testsuite->setAttribute("total",1);

			$testcase=$dom->createElement("testcase");
			$testsuite->appendChild($testcase);
			$testcase->setAttribute("name","testcase0");
			$testcase->setAttribute("time","1");
			$testcase->setAttribute("failures","0");
			$testcase->setAttribute("total","1");
		}
		$dom->save($xmlFile);
	}
	


    /*
     *  生成diff文件，提供给report工具使用
     * */
    private function createDiffDate($diffdatas){
        $smartyConfig = self::getConfig('smarty');
        $saveFile = $smartyConfig['templatedir']."diffDate.php";
        $fileData = array();
        if(file_exists($saveFile)){
              $fileData = include $saveFile;
        }
        //$res = array_diff($fileData,$diffdatas);
        //$fileData = $res;
        $fileData = array_merge($fileData,$diffdatas);
        $str_content = "<?php return ".var_export($fileData,TRUE).";";
        file_put_contents($saveFile,$str_content);
    }
	
}



//$diff = new Diff('pic');
//$diff->build();
//$diff->analyze();
//$diff->Display();
//$diff->Display("require");



