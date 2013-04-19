/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var DEFALUT_SETTINGS = {
    system : {
        conf  : 'fis-conf.json',
        repos : 'http://web.baidu.com/repos'
    },
    project : {
        cache : true,
        charset : 'utf8',
        md5Length : 7
    }
};

var fis = require('../fis-kernel.js');

//You can't use merge in util.js
function merge(source, target){
    if(typeof source === 'object' && typeof target === 'object'){
        for(var key in target){
            if(target.hasOwnProperty(key)){
                source[key] = merge(source[key], target[key]);
            }
        }
    } else {
        source = target;
    }
    return source;
}

var Config = fis.EventEmitter.derive({
    constructor : function(){
        this.init.apply(this, arguments);
    },
    init : function(){
        this.data = {};
        if(arguments.length > 0){
            this.merge.apply(this, arguments);
        }
        return this;
    },
    get : function(path, def){
        var result = this.data || {};
        (path || '').split('.').forEach(function(key){
            if(key && (typeof result !== 'undefined')){
                result = result[key];
            }
        });
        if(typeof result === 'undefined'){
            return def;
        } else {
            return result;
        }
    },
    set : function(path, value){
        if(typeof value === 'undefined'){
            this.data = path;
            this.emit('set', null, path);
            this.emit('change');
        } else {
            path = String(path || '').trim();
            if(path){
                var paths = path.split('.'),
                    last = paths.pop(),
                    data = this.data || {};
                paths.forEach(function(key){
                    var type = typeof data[key];
                    if(type === 'object'){
                        data = data[key];
                    } else if(type === 'undefined'){
                        data = data[key] = {};
                    } else {
                        fis.log.error('forbidden to set property[' + key + '] of [' + type + '] data');
                    }
                });
                data[last] = value;
                this.emit('set', path, value);
                this.emit('change');
            }
        }
    },
    del : function(path){
        path = String(path || '').trim();
        if(path){
            var paths = path.split('.'),
                data = this.data,
                last = paths.pop(), key;
            for(var i = 0, len = paths.length; i < len; i++){
                key = paths[i];
                if(typeof data[key] === 'object'){
                    data = data[key];
                } else {
                    return;
                }
            }
            if(typeof data[last] !== 'undefined'){
                var value = data[last];
                delete data[last];
                this.emit('del', path, value);
                this.emit('change');
            }
        }
    },
    merge : function(){
        var self = this;
        [].slice.call(arguments).forEach(function(arg){
            if(typeof arg === 'object'){
                merge(self.data, arg);
                self.emit('merge', arg);
                self.emit('change');
            } else {
                fis.log.warning('unable to merge data[' + arg + '].');
            }
        });
        return this;
    }
});

module.exports = (new Config).init(DEFALUT_SETTINGS);
module.exports.Config = Config;