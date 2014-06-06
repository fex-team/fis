/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var Cache = Object.derive(function(path, dir){
    var file = fis.util.realpath(path);
    if(!fis.util.isFile(file)){
        fis.log.error('unable to cache file[' + path + ']: No such file.');
    }
    this.timestamp = fis.util.mtime(file).getTime();
    this.deps = {};
    this.version = fis.version;

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
            exports.enable
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
                            return false;
                        }
                    }
                }
                this.deps = deps;
                fis.log.debug('cache is valid');
                if(file){
                    file.info = infos.info;
                    file.content = fis.util.fs.readFileSync(this.cacheFile);
                }
                fis.log.debug('revert cache finished');
                return true;
            }
        }
        fis.log.debug('cache is expired');
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

exports = module.exports = Cache.factory();
exports.enable = true;
exports.Cache = Cache;
exports.clean = function(name){
    name = name || '';
    var path = fis.project.getCachePath(name);
    if(fis.util.exists(path)){
        fis.util.del(path);
    }
};