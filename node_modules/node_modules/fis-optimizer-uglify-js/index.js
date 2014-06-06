/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var UglifyJS = require('uglify-js');

module.exports = function(content, file, conf){
    conf.fromString = true;
    return UglifyJS.minify(content, conf).code;
};