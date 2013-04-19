/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

exports.DEFAULT_REMOTE_REPOS = 'http://web.baidu.com/repos';
exports.DEFAULT_CONF_FILE = 'fis-conf.json';

var FIS_CONF;

Object.defineProperty(exports, 'conf', {
    enumerable : true,
    set : function(value){
        if(fis.util.isFile(value)){
            FIS_CONF = fis.util.realpath(value);
            fis.config.merge(fis.util.readJSON(FIS_CONF));
        } else {
            fis.log.error('invalid fis-conf file [' + value + ']');
        }
    },
    get : function(){
        if(!FIS_CONF){
            fis.log.error('undefined fis-conf file');
        }
        return FIS_CONF;
    }
});

exports.init = function(root, conf, callback){
    
    if(fis.util.isDir(root)){
        //set root
        exports.setProjectRoot(root);
        
        if(typeof conf === 'function'){
            callback = conf;
            conf = fis.config.get('system.conf', exports.DEFAULT_CONF_FILE);
        }
        
        exports.conf = conf;
        
        //undownloaded dependencies counter
        var count = 0;
        
        //traverse dependencies
        fis.util.map(fis.config.get('deps', {}), function(name, version){
            var dir = exports.getLibPath(name, version);
            var flag = dir + '/.inited';
            if(!fis.util.exists(flag)){
                count++;
                var remote = fis.config.get(
                    'system.repos', exports.DEFAULT_REMOTE_REPOS
                ).replace(/\/$/, '');
                var url = remote + '/' + name + '/' + version + '.tar';
                process.stdout.write('download module [' + name + '@' + version + '] ... ');
                fis.util.download(url, function(err){
                    if(err){
                        process.stdout.write('fail\n');
                        fis.log.error( 'unable to download module [' +
                            name + '@' + version + '] from [' + url + '], error [' + err + ']');
                    } else {
                        process.stdout.write('ok\n');
                        var str = [
                            'name : ' + name + '@' + version,
                            'from : ' + url,
                            'time : ' + (new Date)
                        ].join('\n');
                        fis.util.write(flag, str);
                        if(--count == 0){
                            callback();
                        }
                    }
                }, dir);
            }
        });
        if(count == 0){
            callback();
        }
    } else {
        fis.log.error('invalid project root dir [' + root + ']');
    }
};

exports.getSource = function(opt){
    var root = exports.getProjectPath(),
        dirs = [root];
    fis.util.map(fis.config.get('deps', {}), function(name, version){
        var dir = exports.getLibPath(name, version);
        if(fis.util.isDir(dir)){
            dir = fis.util.realpath(dir);
            dirs.push(dir);
        } else {
            fis.log.error('unable to find dependency [' + name + '@' + version + ']');
        }
    });
    var source = {};
    var reg = /\/output\b/i;
    opt = opt || {};
    var conf = exports.conf;
    dirs.forEach(function(path){
        fis.util.find(path, opt.include, opt.exclude).forEach(function(file){
            if(file !== conf && !reg.test(file)){
                file = fis.file(file);
                source[file.subpath] = file;
            }
        });
    });
    return source;
};

//paths
var PROJECT_ROOT;
var LIB_ROOT;
var TEMP_ROOT;

function getPath(root, args){
    if(args && args.length > 0){
        args = root + '/' + Array.prototype.join.call(args, '/');
        return fis.util(args);
    } else {
        return root;
    }
}

function initDir(path, title){
    if(fis.util.exists(path)){
        if(!fis.util.isDir(path)){
            fis.log.error('unable to set path[' + path + '] as ' + title + ' directory.');
        }
    } else {
        fis.util.mkdir(path);
    }
    path = fis.util.realpath(path);
    if(path){
        return path;
    } else {
        fis.log.error('unable to create dir [' + path + '] for ' + title + ' directory.');
    }
}

exports.getProjectPath = function(){
    if(PROJECT_ROOT){
        return getPath(PROJECT_ROOT, arguments);
    } else {
        fis.log.error('undefined project root');
    }
};

exports.setProjectRoot = function(path){
    if(fis.util.isDir(path)){
        PROJECT_ROOT = fis.util.realpath(path);
    } else {
        fis.log.error('invalid project root path [' + path + ']');
    }
};

exports.setTempRoot = function(tmp){
    TEMP_ROOT = initDir(tmp);
};

exports.getTempPath = function(){
    if(!TEMP_ROOT){
        var list = ['LOCALAPPDATA', 'APPDATA', 'HOME'];
        var tmp;
        for(var i = 0, len = list.length; i < len; i++){
            if(tmp = process.env[list[i]]){
                break;
            }
        }
        tmp = tmp || __dirname + '/../';
        exports.setTempRoot(tmp + '/.fis-tmp');
    }
    return getPath(TEMP_ROOT, arguments);
};

exports.setLibRoot = function(path){
    LIB_ROOT = initDir(path);
};

exports.getLibPath = function(){
    if(!LIB_ROOT){
        exports.setLibRoot(exports.getTempPath('fis_modules'));
    }
    return getPath(LIB_ROOT, arguments);
};

exports.getCachePath = function(){
    return getPath(exports.getTempPath('cache'), arguments);
};