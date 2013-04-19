/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

function normalize(str, defaultExt, fis){
    var info = fis.util.stringQuote(str);
    var rest = info.rest.trim();
    var pathinfo = fis.util.ext(rest);
    if(pathinfo.dirname == '' && pathinfo.filename.indexOf(':') === -1){
        rest += ':' + rest;
    }
    if(pathinfo.ext == ''){
        rest += defaultExt;
    }
    return info.quote + rest + info.quote;
}

function analyseJs(content, file, fis){
    var reg = /"(?:[^\\"]|\\[\s\S])+"|'(?:[^\\']|\\[\s\S])+'|\/\/[\r\n]+|\/\*[\s\S]+?\*\/|\brequire\s*\(\s*("(?:[^\\"]|\\[\s\S])+"|'(?:[^\\']|\\[\s\S])+')\s*\)/g;
    content = content.replace(reg, function(m, value){
        if(value){
            value = normalize(value, '.js', fis);
            var info = fis.uri.getId(value, file.dirname);
            file.addRequire(info.id);
            m = 'require(' + info.quote + info.id + info.quote + ')';
        }
        return m;
    });
    //wrap
    var deps = file.requires.length ? '[\'' + file.requires.join("', '") + '\']' : '[]';
    content = 'define(\'' + file.getId() + '\', ' + deps + ', function(require, exports, module){\n' + content + ';\nreturn exports;});';
    return content;
}

function analyseCss(content, file, fis){
    var reg = /@require\s+('[^']+'|"[^"]+"|[^\s{}]+)[\s;]*/g;
    return content.replace(reg, function(m, value){
        value = normalize(value, '.css', fis);
        var info = fis.uri.getId(value, file.dirname);
        file.addRequire(info.id);
        return '';
    });
}

module.exports = function(content, file, conf, fis){
    if(file.rExt === '.js'){
        return analyseJs(content, file, fis);
    } else if(file.rExt === '.css'){
        return analyseCss(content, file, fis);
    }
};