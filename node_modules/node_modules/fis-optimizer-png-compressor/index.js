/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var pngcrunsh;
var pngquant;

module.exports = function(content, file, conf) {
    var C;
    if(conf.type === 'pngquant'){
        if(typeof pngquant === 'undefined'){
            try {
                pngquant = require('node-pngquant-native');
            } catch(e){
                pngquant = false;
                fis.log.warning('node-pngquant-native does not support your node ' + process.version +
                    ', report it to https://github.com/xiangshouding/node-pngquant-native/issues');
            }
        }
        C = pngquant;
    } else {
        if(typeof pngcrunsh === 'undefined'){
            try {
                pngcrunsh = require('node-pngcrush');
            } catch(e){
                pngcrunsh = false;
                fis.log.warning('node-pngcrush does not support your node ' + process.version +
                    ', report it to https://github.com/xiangshouding/node-pngcrush/issues');
            }
        }
        C = pngcrunsh;
    }
    if (C && C.compress) {
        return C.option(conf).compress(content);
    } else {
        return content;
    }
};