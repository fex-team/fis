/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

var Cache = Object.derive(function(path, dir){
    var file = fis.util.realpath(path);
    if(!fis.util.isFile(file)){
        fis.log.error('unable to cache file[' + path + ']: No such file.');
    }
    this.timestamp = fis.util.mtime(file).getTime();
    this.deps = {};
    this.version = fis.version;
    this.expired = true;
    
    var info = fis.util.pathinfo(file);
    var basename = fis.project.getCachePath(dir, info.basename);
    var hash = fis.util.md5(file, 10);
    this.cacheFile = basename + '-c-' + hash + '.tmp';
    this.cacheInfo = basename + '-o-' + hash + '.json';
}, {
    save : function(content, info){
        var infos = {
            version : this.version,
            timestamp : this.timestamp,
            deps : this.deps,
            info : info
        };
        fis.util.write(this.cacheInfo, JSON.stringify(infos));
        fis.util.write(this.cacheFile, content);
    },
    revert : function(file){
        fis.log.debug('revert cache');
        if(
            fis.config.get('project.cache', true)
            && fis.util.exists(this.cacheInfo)
            && fis.util.exists(this.cacheFile)
        ){
            fis.log.debug('cache file exists');
            var infos = fis.util.readJSON(this.cacheInfo);
            fis.log.debug('cache info read');
            if(infos.version == this.version && infos.timestamp == this.timestamp){
                var deps = infos['deps'];
                for(var f in deps){
                    if(deps.hasOwnProperty(f)){
                        var d = fis.util.mtime(f);
                        if(d == 0 || deps[f] != d.getTime()){
                            fis.log.debug('cache is expired');
                            this.expired = true;
                            return false;
                        }
                    }
                }
                fis.log.debug('cache is valid');
                file.info = infos.info;
                file.content = fis.util.read(this.cacheFile);
                fis.log.debug('revert cache finished');
                this.expired = false;
                return true;
            }
        }
        fis.log.debug('cache is expired');
        this.expired = true;
        return false;
    },
    addDeps : function(file){
        var path = fis.util.realpath(file);
        if(path){
            this.deps[path] = fis.util.mtime(path).getTime();
        } else {
            fis.log.warning('unable to add dependency file[' + file + ']: No such file.');
        }
        return this;
    },
    removeDeps : function(file){
        var path = fis.util.realpath(file);
        if(path && this.deps[path]){
            delete this.deps[path];
        }
        return this;
    },
    mergeDeps : function(cache){
        var deps = {};
        if(cache instanceof Cache){
            deps = cache.deps
        } else if(typeof cache === 'object'){
            deps = cache
        } else {
            fis.log.error('unable to merge deps of data[' + cache + ']');
        }
        fis.util.map(deps, this.deps, true);
    }
});

module.exports = Cache.factory();
module.exports.Cache = Cache;
module.exports.clean = function(name){
    name = name || '';
    var path = fis.project.getCachePath(name);
    if(fis.util.exists(path)){
        fis.util.del(path);
    }
};