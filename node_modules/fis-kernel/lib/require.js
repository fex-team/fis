/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

module.exports = function(){
    var name = 'fis-' + Array.prototype.slice.call(arguments, 0).join('-');
    try {
        return require(name);
    } catch(e) {
        fis.log.error(e);
    }
};