/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

function replaceDefine(value, escape){
    return value.replace(/\$\{([^\}]+)\}/g, function(all, $1){
        var val = fis.config.get($1);
        if(typeof val === 'undefined'){
            fis.log.error('undefined property [' + $1 + '].');
        } else {
            return escape ? fis.util.escapeReg(val) : val;
        }
        return all;
    });
}

function replaceMatches(value, matches){
    return value.replace(/\$(\d+|&)/g, function(all, $1){
        return matches[$1 === '&' ? '0' : $1] || all;
    });
}

function roadmap(subpath, path, obj){
    var map = fis.config.get('roadmap.' + path, []);
    for(var i = 0, len = map.length; i < len; i++){
        var opt = map[i], reg = opt.reg;
        if(reg){
            reg = new RegExp(replaceDefine(reg, true), 'i');
            var matches = subpath.match(reg);
            if(matches){
                obj = obj || {};
                for(var key in opt){
                    if(key !== 'reg' && opt.hasOwnProperty(key)){
                        var value = opt[key];
                        if(typeof value === 'string'){
                            value = replaceMatches(
                                replaceDefine(value),
                                matches
                            );
                        }
                        obj[key] = value;
                    }
                }
                return obj;
            }
        } else {
            fis.log.error('[roadmap.' + path + '] missing property [reg].');
        }
    }
    return false;
}

var uri = module.exports = function(path, dirname){
    var info = fis.util.stringQuote(path),
        qInfo = fis.util.query(info.rest),
        root = fis.project.getProjectPath();
    info.query = qInfo.query;
    info.rest = qInfo.rest;
    if(info.rest){
        path = info.rest;
        switch(path[0]){
            case '.': //relative
                if(dirname){
                    info.file = fis.file(dirname, path);
                } else {
                    fis.log.error('invalid dirname.');
                }
                break;
            case '/': //absolute
                info.file = fis.file(root, path);
                break;
            default :
                if(!/^[a-zA-Z]+:\/\//.test(path)){
                    var match = path.match(/^([\w\-\.]+):(.+)/);
                    if(match){
                        var name = match[1];
                        var subpath = match[2];
                        if(name === fis.config.get('project.name')){
                            info.file = fis.file(root, subpath);
                        } else {
                            var version = fis.config.get('deps.' + name);
                            if(version){
                                info.file = fis.file(fis.project.getLibPath(name, version, subpath));
                            }
                        }
                    } else {
                        //unknown
                    }
                }
        }
    }
    return info;
};

uri.getId = function(path, dirname){
    var info = uri(path, dirname);
    if(info.file){
        info.id = info.file.getId();
    } else {
        info.id = info.rest;
    }
    return info;
};

uri.replaceDefine = replaceDefine;
uri.replaceMatches = replaceMatches;
uri.roadmap = roadmap;