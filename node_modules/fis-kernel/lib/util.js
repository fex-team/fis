/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js'),
    fs = require('fs'),
    pth = require('path'),
    crypto = require('crypto'),
    Url = require('url'),
    _exists = fs.existsSync || pth.existsSync,
    iconv, tar;

var IS_WIN = process.platform.indexOf('win') === 0;

var TEXT_FILE_EXTS = [
        'css', 'tpl', 'js', 'php',
        'txt', 'json', 'xml', 'htm',
        'text', 'xhtml', 'html',
        'conf', 'po', 'config', 'tmpl',
        'coffee', 'less', 'sass',
        'scss', 'manifest', 'bak',
        'tmp'
    ],
    IMAGE_FILE_EXTS = [
        'svg', 'tif', 'tiff', 'wbmp',
        'png', 'bmp', 'fax', 'gif',
        'ico', 'jfif', 'jpe', 'jpeg',
        'jpg', 'cur'
    ],
    MIME_MAP = {
        //text
        'css' : 'text/css',
        'tpl' : 'text/html',
        'js' : 'text/javascript',
        'php' : 'text/html',
        'txt' : 'text/plain',
        'json' : 'application/json',
        'xml' : 'text/xml',
        'htm' : 'text/html',
        'text' : 'text/plain',
        'xhtml' : 'text/html',
        'html' : 'text/html',
        'conf' : 'text/plain',
        'po' : 'text/plain',
        'config' : 'text/plain',
        'coffee' : 'text/javascript',
        'less' : 'text/css',
        'sass' : 'text/css',
        'manifest' : 'text/cache-manifest',
        //image
        'svg' : 'image/svg+xml',
        'tif' : 'image/tiff',
        'tiff' : 'image/tiff',
        'wbmp' : 'image/vnd.wap.wbmp',
        'png' : 'image/png',
        'bmp' : 'image/bmp',
        'fax' : 'image/fax',
        'gif' : 'image/gif',
        'ico' : 'image/x-icon',
        'jfif' : 'image/jpeg',
        'jpg' : 'image/jpeg',
        'jpe' : 'image/jpeg',
        'jpeg' : 'image/jpeg',
        'cur' : 'application/octet-stream'
    };

function getIconv(){
    if(!iconv){
        iconv = require('iconv-lite');
    }
    return iconv;
}

function getTar(){
    if(!tar){
        tar = require('tar');
    }
    return tar;
}

var _ = module.exports = function(path){
    var type = typeof path;
        if(arguments.length > 1) {
            path = Array.prototype.join.call(arguments, '/');
        } else if(type === 'string') {
            //do nothing for quickly determining.
        } else if(type === 'object') {
            path = Array.prototype.join.call(path, '/');
        } else if(type === 'undefined') {
            path = '';
        }
        if(path){
            path = pth.normalize(path.replace(/[\/\\]+/g, '/')).replace(/\\/g, '/');
            if(path !== '/'){
                path = path.replace(/\/$/, '');
            }
        }
        return path;
};

_.is = function(source, type){
    return Object.prototype.toString.call(source) === '[object ' + type + ']';
};

_.map = function(obj, callback, merge){
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            if(merge){
                callback[key] = obj[key];
            } else if(callback(key, obj[key])) {
                break;
            }
        }
    }
};

_.pad = function(str, len, fill, pre){
    if(str.length < len){
        fill = (new Array(len)).join(fill || ' ');
        if(pre){
            str = (fill + str).substr(-len);
        } else {
            str = (str + fill).substring(0, len);
        }
    }
    return str;
};

_.merge = function(source, target){
    if(_.is(source, 'Object') && _.is(target, 'Object')){
        _.map(target, function(key, value){
            source[key] = _.merge(source[key], value);
        });
    } else {
        source = target;
    }
    return source;
};

_.escapeReg = function(str){
    return str.replace(/[\.\\\+\*\?\[\^\]\$\(\){}=!<>\|:\/]/g, '\\$&');
};

_.escapeShellArg = function(str){
    return str.replace(/ /g, '"$&"');
};

_.stringQuote = function(str, quotes, trim){
    var info = {
        origin : str,
        rest   : str,
        quote  : ''
    };
    if(trim !== false) {
        str = str.trim();
    }
    if(str){
        quotes = quotes || '\'"';
        var strLen = str.length - 1;
        for(var i = 0, len = quotes.length; i < len; i++){
            var c = quotes[i];
            if(str[0] === c && str[strLen] === c){
                info.quote = c;
                info.rest  = str.substring(1, strLen);
                break;
            }
        }
    }
    return info;
};

_.getMimeType = function(ext){
    if(ext[0] === '.'){
        ext = ext.substring(1);
    }
    return MIME_MAP[ext] || 'application/x-' + ext;
};

_.exists = _exists;
_.fs = fs;

_.realpath = function(path){
    if(path && _exists(path)){
        path = fs.realpathSync(path);
        if(IS_WIN){
            path = path.replace(/\\/g, '/');
        }
        if(path !== '/'){
            path = path.replace(/\/$/, '');
        }
        return path;
    } else {
        return false;
    }
};

_.realpathSafe = function(path){
    return _.realpath(path) || _(path);
};

_.isAbsolute = function(path) {
    if (IS_WIN) {
        return /^[a-z]:/i.test(path);
    } else {
        if(path === '/'){
            return true;
        } else {
            var split = path.split('/');
            return (split[0] === '' && split[1] && _.isDir('/' + split[1])) || split[0] === '~';
        }
    }
};

_.isFile = function(path){
    return _exists(path) && fs.statSync(path).isFile();
};

_.isDir = function(path){
    return _exists(path) && fs.statSync(path).isDirectory();
};

_.mtime = function(path){
    var time = 0;
    if(_exists(path)){
        time = fs.statSync(path).mtime;
    }
    return time;
};

_.touch = function(path, mtime){
    if(!_exists(path)){
        _.write(path, '');
    }
    if(mtime instanceof Date){
        //do nothing for quickly determining.
    } else if(typeof mtime === 'number') {
        var time = new Date();
        time.setTime(mtime);
        mtime = time;
    } else {
        fis.log.error('invalid argument [mtime]');
    }
    fs.utimesSync(path, mtime, mtime);
};

_.isWin = function(){
    return IS_WIN;
};

function getFileTypeReg(type){
    var map = [],
        ext = fis.config.get('project.fileType.' + type, []);
    if(type === 'text'){
        map = TEXT_FILE_EXTS;
    } else if(type === 'image'){
        map = IMAGE_FILE_EXTS;
    }
    map = map.concat(ext);
    map = map.join('|');
    return new RegExp('\\.(?:' + map + ')$', 'i');
}

_.isTextFile = function(path){
    return getFileTypeReg('text').test(path || '');
};

_.isImageFile = function(path){
    return getFileTypeReg('image').test(path || '');
};

_.md5 = function(data, len){
    var md5sum = crypto.createHash('md5'),
        encoding = typeof data === 'string' ? 'utf8' : 'binary';
    md5sum.update(data, encoding);
    len = len || fis.config.get('project.md5Length', 7);
    return md5sum.digest('hex').substring(0, len);
};

_.base64 = function(data){
    if(data instanceof Buffer){
        //do nothing for quickly determining.
    } else if(data instanceof Array){
        data = new Buffer(data);
    } else {
        //convert to string.
        data = new Buffer(String(data || ''));
    }
    return data.toString('base64');
};

_.mkdir = function(path, mode){
    if (typeof mode === 'undefined') {
        //511 === 0777
        mode = 511 & (~process.umask());
    }
    if(_exists(path)) return;
    path.split('/').reduce(function(prev, next) {
        if(prev && !_exists(prev)) {
            fs.mkdirSync(prev, mode);
        }
        return prev + '/' + next;
    });
    if(!_exists(path)) {
        fs.mkdirSync(path, mode);
    }
};

_.toEncoding = function(str, encoding){
    return getIconv().toEncoding(String(str), encoding);
};

_.isUtf8 = function(bytes) {
    var i = 0;
    while(i < bytes.length) {
        if((// ASCII
            bytes[i] == 0x09 ||
            bytes[i] == 0x0A ||
            bytes[i] == 0x0D ||
            (0x20 <= bytes[i] && bytes[i] <= 0x7E)
        )) {
            i += 1;
            continue;
        }
        
        if((// non-overlong 2-byte
            (0xC2 <= bytes[i] && bytes[i] <= 0xDF) &&
            (0x80 <= bytes[i+1] && bytes[i+1] <= 0xBF)
        )) {
            i += 2;
            continue;
        }
        
        if(
            (// excluding overlongs
                bytes[i] == 0xE0 &&
                (0xA0 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF)
            ) || (// straight 3-byte
                ((0xE1 <= bytes[i] && bytes[i] <= 0xEC) ||
                bytes[i] == 0xEE ||
                bytes[i] == 0xEF) &&
                (0x80 <= bytes[i + 1] && bytes[i+1] <= 0xBF) &&
                (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
            ) || (// excluding surrogates
                bytes[i] == 0xED &&
                (0x80 <= bytes[i+1] && bytes[i+1] <= 0x9F) &&
                (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
            )
        ) {
            i += 3;
            continue;
        }
        
        if(
            (// planes 1-3
                bytes[i] == 0xF0 &&
                (0x90 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
            ) || (// planes 4-15
                (0xF1 <= bytes[i] && bytes[i] <= 0xF3) &&
                (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
            ) || (// plane 16
                bytes[i] == 0xF4 &&
                (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0x8F) &&
                (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
            )
        ) {
            i += 4;
            continue;
        }
        return false;
    }
    return true;
};

_.readBuffer = function(buffer){
    if(_.isUtf8(buffer)){
        buffer = buffer.toString('utf8');
        if (buffer.charCodeAt(0) === 0xFEFF) {
            buffer = buffer.substring(1);
        }
    } else {
        buffer = getIconv().decode(buffer, 'gbk');
    }
    return buffer;
};

_.read = function(path){
    var content = false;
    if(_exists(path)){
        content = fs.readFileSync(path);
        if(_.isTextFile(path)){
            content = _.readBuffer(content);
        }
    } else {
        fis.log.error('unable to read file[' + path + ']: No such file or directory.');
    }
    return content;
};

_.write = function(path, data, charset, append){
    if(!_exists(path)){
        _.mkdir(_.pathinfo(path).dirname);
    }
    if(charset){
        data = getIconv().encode(data, charset);
    }
    if(append) {
        fs.appendFileSync(path, data, null);
    } else {
        fs.writeFileSync(path, data, null);
    }
};

_.filter = function(str, include, exclude){
    return !((!!include && str.search(include) < 0) || (!!exclude && str.search(exclude) > -1));
};

_.find = function(rPath, include, exclude){
    var list = [],
        path = _.realpath(rPath);
    if(path){
        var stat = fs.statSync(path);
        if(stat.isDirectory()){
            fs.readdirSync(path).forEach(function(p){
                if(p[0] != '.') {
                    list = list.concat(_.find(path + '/' + p, include, exclude));
                }
            });
        } else if(stat.isFile() && _.filter(path, include, exclude)) {
            list.push(path);
        }
    } else {
        fis.log.error('unable to find [' + rPath + ']: No such file or No such file or directory.');
    }
    return list.sort();
};

_.del = function(rPath, include, exclude){
    var removedAll = true,
        path = _.realpath(rPath);
    if(path) {
        if(/^(?:\w:)?\/$/.test(path)){
            fis.log.error('unable to delete directory [' + rPath + '].');
        }
        var stat = fs.statSync(path);
        if(stat.isDirectory()){
            fs.readdirSync(path).forEach(function(name){
                if(name != '.' && name != '..') {
                    removedAll = removedAll && _.del(path + '/' + name, include, exclude);
                }
            });
            if(removedAll) {
                fs.rmdirSync(path);
            }
        } else if(stat.isFile() && _.filter(path, include, exclude)) {
            fs.unlinkSync(path);
        } else {
            removedAll = false;
        }
    } else {
        //fis.log.error('unable to delete [' + rPath + ']: No such file or No such file or directory.');
    }
    return removedAll;
};

_.copy = function(rSource, target, include, exclude, uncover, move){
    var removedAll = true,
        source = _.realpath(rSource);
    target = _(target);
    if(source){
        var stat = fs.statSync(source);
        if(stat.isDirectory()){
            fs.readdirSync(source).forEach(function(name){
                if(name != '.' && name != '..') {
                    removedAll = removedAll && _.copy(
                        source + '/' + name,
                        target + '/' + name,
                        include, exclude,
                        uncover, move
                    );
                }
            });
            if(move && removedAll) {
                fs.rmdirSync(source);
            }
        } else if(stat.isFile() && _.filter(source, include, exclude)){
            if(uncover && _exists(target)){
                //uncover
            } else {
                _.write(target, fs.readFileSync(source, null));
            }
            if(move) {
                fs.unlinkSync(source);
            }
        } else {
            removedAll = false;
        }
    } else {
        fis.log.error('unable to copy [' + rSource + ']: No such file or No such file or directory.');
    }
    return removedAll;
};

_.ext = function(str){
    var info = _.query(str), pos;
    str = info.fullname = info.rest;
    if((pos = str.lastIndexOf('/')) > -1){
        if(pos === 0){
            info.rest = info.dirname = '/';
        } else {
            info.dirname = str.substring(0, pos);
            info.rest = info.dirname + '/';
        }
        str = str.substring(pos + 1);
    } else {
        info.rest = info.dirname = '';
    }
    if((pos = str.lastIndexOf('.')) > -1){
        info.ext = str.substring(pos).toLowerCase();
        info.filename = str.substring(0, pos);
        info.basename = info.filename + info.ext;
    } else {
        info.basename = info.filename = str;
        info.ext = '';
    }
    info.rest += info.filename;
    return info;
};

_.query = function(str){
    var rest = str,
        pos = rest.indexOf('?'),
        query = '';
    if(pos > -1){
        query = rest.substring(pos);
        rest  = rest.substring(0, pos);
    }
    rest = rest.replace(/\\/g, '/');
    if(rest !== '/'){
        rest = rest.replace(/\/\.?$/, '');
    }
    return {
        origin : str,
        rest : rest,
        query : query
    };
};

_.pathinfo = function(path){
    //can not use _() method directly for the case _.pathinfo('a/').
    var type = typeof path;
    if(arguments.length > 1) {
        path = Array.prototype.join.call(arguments, '/');
    } else if(type === 'string') {
        //do nothing for quickly determining.
    } else if(type === 'object') {
        path = Array.prototype.join.call(path, '/');
    }
    return _.ext(path);
};

_.camelcase = function(str){
    var ret = '';
    if(str){
        str.split(/[-_ ]+/).forEach(function(ele){
            ret += ele[0].toUpperCase() + ele.substring(1);
        });
    } else {
        ret = str;
    }
    return ret;
};

_.parseUrl = function(url, opt){
    opt = opt || {};
    url = Url.parse(url);
    var ssl = url.protocol === 'https:';
    opt.host = opt.host
        || opt.hostname
        || ((ssl || url.protocol === 'http:') ? url.hostname : 'localhost');
    opt.port = opt.port || (url.port || (ssl ? 443 : 80));
    opt.path = opt.path || (url.pathname + (url.search ? url.search : ''));
    opt.method = opt.method || 'GET';
    opt.agent = opt.agent || false;
    return opt;
};

_.download = function(url, callback, extract, opt){
    opt  = _.parseUrl(url, opt || {});
    var http = opt.protocol === 'https:' ? require('https') : require('http'),
        name = _.md5(url, 8) + _.ext(url).ext,
        tmp  = fis.project.getTempPath('downloads', name),
        data = opt.data;
    delete opt.data;
    _.write(tmp, '');
    var writer = fs.createWriteStream(tmp),
        http_err_handler = function(err){
            writer.destroy();
            fs.unlinkSync(tmp);
            var msg = typeof err === 'object' ? err.message : err;
            if(callback){
                callback(msg);
            } else {
                fis.log.error('request error [' + msg + ']');
            }
        },
        req = http.request(opt, function(res){
            var status = res.statusCode;
            res
                .on('data', function(chunk){
                    writer.write(chunk);
                })
                .on('end', function(){
                    if(status >= 200 && status < 300 || status === 304){
                        if(extract){
                            fs
                                .createReadStream(tmp)
                                .pipe(getTar().Extract({ path : extract }))
                                .on('error', function(err){
                                    if(callback){
                                        callback(err);
                                    } else {
                                        fis.log.error('extract tar file [' + tmp + '] fail, error [' + err + ']');
                                    }
                                })
                                .on('end', function(){
                                    if(callback && (typeof callback(null, tmp, res) === 'undefined')){
                                        fs.unlinkSync(tmp);
                                    }
                                });
                        } else if(callback && (typeof callback(null, tmp, res) === 'undefined')){
                            fs.unlinkSync(tmp);
                        }
                    } else {
                        http_err_handler(status);
                    }
                })
                .on('error', http_err_handler);
        });
    req.on('error', http_err_handler);
    if(data){
        req.write(data);
    }
    req.end();
};

_.upload = function(url, opt, data, file, callback){
    var content = file.getContent();
    if(typeof content === 'string'){
        content = new Buffer(content, 'utf8');
    } else if(!(content instanceof  Buffer)){
        fis.log.error('unable to upload content [' + (typeof content) + ']');
    }
    data = data || {};
    var endl = '\r\n';
    var boundary = '-----np' + Math.random();
    var collect = [];
    _.map(data, function(key, value){
        collect.push('--' + boundary + endl);
        collect.push('Content-Disposition: form-data; name="' + key + '"' + endl);
        collect.push(endl);
        collect.push(value + endl);
    });
    collect.push('--' + boundary + endl);
    collect.push('Content-Disposition: form-data; name="file"; filename="' + file.subpath + '"' + endl);
    collect.push(endl);
    collect.push(content);
    collect.push('--' + boundary + '--' + endl);
    
    var length = 0;
    collect.forEach(function(ele){
        length += ele.length;
    });
    
    opt = opt || {};
    opt.method = opt.method || 'POST';
    opt.headers = {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': length
    };
    opt = _.parseUrl(url, opt);
    var http = opt.protocol === 'https:' ? require('https') : require('http');
    var req = http.request(opt, function(res){
        var status = res.statusCode;
        var body = '';
        res
            .on('data', function(chunk){
                body += chunk;
            })
            .on('end', function(){
                if(status >= 200 && status < 300 || status === 304){
                    callback(null, body);
                } else {
                    callback(status);
                }
            })
            .on('error', function(err){
                callback(err.message || err);
            });
    });
    collect.forEach(function(d){
        req.write(d);
        if(d instanceof Buffer){
            req.write(endl);
        }
    });
    req.end();
};

_.readJSON = function(path){
    var json = _.read(path),
        result = {};
    try {
        result = JSON.parse(json);
    } catch(e){
        fis.log.error('parse json file[' + path + '] fail, error [' + e.message + ']');
    }
    return result;
};

_.nohup = function(cmd, options, callback){
    if(typeof options === 'function'){
        callback = options;
        options = null;
    }
    var exec = require('child_process').exec;
    if(IS_WIN){
        var cmdEscape = cmd.replace(/"/g, '""'),
            file = fis.project.getTempPath('nohup-' + _.md5(cmd) + '.vbs'),
            script = '';
        script += 'Dim shell\n';
        script += 'Set shell = Wscript.CreateObject("WScript.Shell")\n';
        script += 'ret = shell.Run("cmd.exe /c start /b ' + cmdEscape + '", 0, TRUE)\n';
        script += 'WScript.StdOut.Write(ret)\n';
        script += 'Set shell = NoThing';
        _.write(file, script);
        return exec('cscript.exe /nologo "' + file + '"', options, function(error, stdout){
            if(stdout != '0'){
                fis.log.error('exec command[' + cmd + '] fail.');
            }
            fs.unlinkSync(file);
            if(typeof callback === 'function') {
                callback();
            }
        });
    } else {
        return exec('nohup ' + cmd + ' > /dev/null 2>&1 &', options, function(error, stdout){
            if(error !== null) {
                fis.log.error('exec command[' + cmd + '] fail, stdout [' + stdout + '].');
            }
            if(typeof callback === 'function') {
                callback();
            }
        });
    }
};

_.normalize = _;