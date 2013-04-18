/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var CleanCss = require('clean-css');

module.exports = function(content, file, conf, fis){
    return CleanCss.process(content, conf);
};