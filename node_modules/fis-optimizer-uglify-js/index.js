/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var UglifyJS = require('uglify-js');

module.exports = function(content, file, conf, fis){
    conf.fromString = true;
    UglifyJS.AST_Node.warn_function = function(txt){
        fis.log.error(txt)
    };
    return UglifyJS.minify(content, conf).code;
};