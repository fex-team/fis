/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

//oo
Function.prototype.derive = function(constructor, proto){
    if(typeof constructor === 'object'){
        proto = constructor;
        constructor = proto.constructor || function(){};
        delete proto.constructor;
    }
    var parent = this;
    var fn = function(){
        parent.apply(this, arguments);
        constructor.apply(this, arguments);
    };
    var tmp = function(){};
    tmp.prototype = parent.prototype;
    var fp = new tmp(),
        cp = constructor.prototype,
        key;
    for(key in cp){
        if(cp.hasOwnProperty(key)){
            fp[key] = cp[key];
        }
    }
    proto = proto || {};
    for(key in proto){
        if(proto.hasOwnProperty(key)){
            fp[key] = proto[key];
        }
    }
    fp.constructor = constructor.prototype.constructor;
    fn.prototype = fp;
    return fn;
};

//factory
Function.prototype.factory = function(){
    var clazz = this;
    function F(args){
        clazz.apply(this, args);
    }
    F.prototype = clazz.prototype;
    return function(){
        return new F(arguments);
    };
};

//EventEmitter
exports.EventEmitter = require('events').EventEmitter;

//log
exports.log = require('./lib/log.js');

//require
exports.require = require('./lib/require.js');

//system config
exports.config = require('./lib/config.js');

//utils
exports.util = require('./lib/util.js');

//resource location
exports.uri = require('./lib/uri.js');

//project
exports.project = require('./lib/project.js');

//file
exports.file = require('./lib/file.js');

//cache
exports.cache = require('./lib/cache.js');

//compile kernel
exports.compile = require('./lib/compile.js');

//release api
exports.release = require('./lib/release.js');

//package info
exports.info = exports.util.readJSON(__dirname + '/package.json');

//kernel version
exports.version = exports.info.version;


//test sth.
