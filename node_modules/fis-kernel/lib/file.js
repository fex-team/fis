/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

function normalizeExt(ext){
    if(ext){
        var rExt = fis.config.get('roadmap.ext' + ext);
        if(rExt){
            ext = (rExt[0] === '.') ? rExt : ('.' + rExt);
        }
    }
    return ext;
}

function ensure(str){
    return str.replace(/[:*?"<>|,; ()&$]/g, '_');
}

function normalizePath(path, reg, rExt){
    return ensure(path.replace(reg, '')) + rExt;
}

function addHash(path, file){
    var rExt  = file.rExt,
        qRExt = fis.util.escapeReg(rExt),
        qExt = fis.util.escapeReg(file.ext),
        hash = file.getHash(),
        reg = new RegExp(qRExt + '$|' + qExt + '$', 'i');
    return path.replace(reg, '') + '_' + hash + rExt;
}

function getDomainsByPath(path){
    var domain = fis.config.get('domain', {}), value = '';
    if(typeof domain === 'string'){
        value = domain;
    } else {
        fis.util.map(domain, function(pattern, domain){
            if(pattern === 'image' && fis.util.isImageFile(path)){
                value = domain;
                return true;
            } else if((new RegExp(pattern, 'i')).test(path)){
                value = domain;
                return true;
            }
        });
    }
    return value.split(/\s*,\s*/);
}


function getDomain(path, hash){
    var domains = getDomainsByPath(path),
        len = domains.length,
        domain = '';
    hash = hash || fis.util.md5(path);
    if(len){
        domain = domains[hash.charCodeAt(0) % len]
            .replace(/\\/g, '/')
            .replace(/\/+$/, '');
    }
    return domain;
}

var File = Object.derive(function(){
    var _ = fis.util,
        info = _.pathinfo(arguments);
    _.map(info, this, true);
    var ext = info.ext,
        rExt = this.rExt = normalizeExt(ext),
        realpath = this.realpath = _.realpathSafe(info.fullname),
        realpathNoExt = this.realpathNoExt = info.rest,
        root = fis.project.getProjectPath(),
        lib = fis.project.getLibPath(), type;
    
    this.useHash = rExt === '.js' || rExt === '.css' || _.isImageFile(rExt);
    this.isMod = false;
    this.requires = [];
    
    //lib first
    if(realpath.indexOf(lib + '/') === 0) {
        //e.g. realpath = lib_root/tangram/1.5.0/tangram/base.js
        //libPath = tangram/1.5.0/tangram/base.js
        var libPath = realpath.substring(lib.length + 1);
        var matches = libPath.match(/^([^\/]+)\/([^\/]+)\/.+$/);
        if(matches){
            //islib
            this.isLib = true;
            this.libName = matches[1];
            this.libVersion = matches[2];
            root = lib + '/' + matches[1] + '/' + matches[2];
        }
        type = 'lib';
    } else if(realpath.indexOf(root) === 0){
        type = 'project';
    }
    
    if(type){
        var len = root.length, subpath;
        this.subpath = subpath = realpath.substring(len);
        this.subdirname = info.dirname.substring(len);
        this.subpathNoExt = realpathNoExt.substring(len);
        fis.uri.roadmap(subpath, type, this);
        var reg = new RegExp(_.escapeReg(ext) + '$|' + _.escapeReg(rExt) + '$', 'i');
        if(!this.release){
            if(this.isLib){
                this.release = '/lib' + this.subpath;
            } else {
                this.release = this.subpath;
            }
        }
        this.release = normalizePath(this.release, reg, rExt);
        this.url = normalizePath(this.url || this.release, reg, rExt);
        this.id = this.id || subpath.replace(/^\//, '');
        var ns = this.isLib ? this.libName : fis.config.get('project.name', '');
        if(ns){
            this.id = ns + ':' + this.id;
        }
    }
}, {
    exists : function(){
        return fis.util.exists(this.realpath);
    },
    isText : function(){
        return fis.util.isTextFile(this.realpath);
    },
    isImage : function(){
        return fis.util.isImageFile(this.realpath);
    },
    toString : function(){
        return this.realpath;
    },
    getMtime : function(){
        return fis.util.mtime(this.realpath);
    },
    isFile : function(){
        return fis.util.isFile(this.realpath);
    },
    isDir : function(){
        return fis.util.isDir(this.realpath);
    },
    setContent : function(c){
        this._content = c;
        return this;
    },
    getContent : function(){
        if(typeof this._content === 'undefined'){
            this._content = fis.util.read(this.realpath);
        }
        return this._content;
    },
    getHash : function(){
        if(typeof this._hash === 'undefined'){
            this._hash = fis.util.md5(this.getContent());
        }
        return this._hash;
    },
    getBase64 : function(prefix){
        prefix = typeof prefix === 'undefined' ? true : prefix;
        if(prefix){
            prefix = 'data:' + fis.util.getMimeType(this.rExt) + ';base64,';
        } else {
            prefix = '';
        }
        return prefix + fis.util.base64(this._content);
    },
    writeTo : function(target){
        var charset = this.isText() ? fis.config.get('project.charset', 'utf-8') : null;
        fis.util.write(target, this._content, charset);
        return this;
    },
    getId : function(){
        return this.id;
    },
    getUrl : function(withHash, withDomain){
        var url;
        if(withHash && this.useHash){
            url = addHash(this.url, this);
            if(withDomain){
                url = getDomain(this.subpath, this.getHash()) + url;
            }
        } else {
            url = this.url;
        }
        return url + this.query;
    },
    getHashRelease : function(){
        if(this.useHash){
            return addHash(this.release, this);
        } else {
            return this.release;
        }
    },
    addRequire : function(id){
        if(id && (id = id.trim())){
            if(this.requires.indexOf(id) < 0){
                this.requires.push(id);
            }
            return id;
        }
        return false;
    },
    addSameNameRequire : function(ext){
        var path;
        if(fis.util.isFile(this.realpathNoExt + ext)){
            path = './' + this.filename + ext;
        } else {
            var map = fis.config.get('roadmap.ext');
            for(var key in map){
                if(map.hasOwnProperty(key)){
                    var rExt = map[key];
                    if(rExt === ext && fis.util.isFile(this.realpathNoExt + rExt)) {
                        path = './' + this.filename + rExt;
                        break;
                    }
                }
            }
        }
        if(path){
            var info = fis.uri.getId(path, this.dirname);
            this.addRequire(info.id);
        }
    },
    removeRequire : function(id){
        var pos = this.requires.indexOf(id);
        if(pos > -1){
            this.requires.splice(pos, 1);
        }
    },
    deliver : function(output, md5){
        var release = this.release;
        if(!release){
            fis.log.error('unable get release path of file['
                + this.realpath
                + ']: Maybe this file is not in current project');
        }
        if(fis.util.exists(output) && !fis.util.isDir(output)){
            fis.log.error('unable to deliver file['
                + this.realpath + '] to dir['
                + output + ']: invalid output dir.');
        }
        this.delivered = [];
        var target;
        if(md5 == 0 || !this.useHash){
            target = fis.util(output, release);
            this.writeTo(target);
            this.delivered.push(target);
        } else if(md5 == 1){
            target = fis.util(output, this.getHashRelease());
            this.writeTo(target);
            this.delivered.push(target);
        } else {
            target = fis.util(output, release);
            this.writeTo(target);
            this.delivered.push(target);
            
            target = fis.util(output, this.getHashRelease());
            this.writeTo(target);
            this.delivered.push(target);
        }
        return this;
    }
});

module.exports = File.factory();
module.exports.wrap = function(file){
    if(typeof file === 'string'){
        return new File(file);
    } else if(file instanceof File){
        return file;
    } else {
        fis.log.error('unable to convert [' + (typeof file) + '] to [File] object.');
    }
};