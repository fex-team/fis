/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

exports.L_ALL    = 0x01111;
exports.L_NOTIC  = 0x00001;
exports.L_DEBUG  = 0x00010;
exports.L_WARNI  = 0x00100;
exports.L_ERROR  = 0x01000;
exports.L_NORMAL = 0x01101;

exports.level = exports.L_NORMAL;
exports.throw = true;
exports.alert = false;

exports.now = function(){
    var d = new Date(), str;
    str = [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].join(':').replace(/\b\d\b/g, '0$&');
    str += '.' + ('00' + d.getMilliseconds()).substr(-4);
    return str;
};

function log(type, msg, code){
    code = code || 0;
    if((exports.level & code) > 0){
        var listener = exports.on[type];
        if(listener){
            listener(msg);
        }
        exports.on.any(type, msg);
    }
}

exports.debug = function(msg){
    log('debug', exports.now() + ' ' + msg, exports.L_DEBUG);
};

exports.notice = function(msg){
    log('notice', msg, exports.L_NOTIC);
};

exports.warning = function(msg){
    log('warning', msg, exports.L_WARNI);
};

exports.error = function(msg){
    if(exports.alert){
        msg += '\u0007';
    }
    if(exports.throw){
        throw new Error(msg);
    } else {
        log('error', msg, exports.L_ERROR);
        process.exit(1);
    }
};

exports.on = {
    any     : function(type, msg){},
    debug   : function(msg){ console.log('[DEBUG] ' + msg); },
    notice  : function(msg){ console.log('[NOTIC] ' + msg); },
    warning : function(msg){ console.warn('[WARNI] ' + msg); },
    error   : function(msg){ console.error('[ERROR] ' + msg); }
};