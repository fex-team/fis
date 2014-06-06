/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';
module.exports = function(content, file, conf){
    if(file.isMod || conf.wrapAll){
        //wrap
        if(conf.template){
            content = String(conf.template)
                .split('${content}').join(content)
                .split('${id}').join(file.getId());
        } else if(conf.type === 'amd') {
            if(!/^\s*define\s*\(/.test(content)){
                content = 'define(\'' + file.getId() + '\', function(require, exports, module){\n\n' + content + '\n\n});';
            }
        } else {
            if(!/^\s*(?:[!(]\s*|void\s+)function\(/.test(content)){
                content = '!function(){try{\n\n' + content + '\n\n}catch(e){}}();';
            }
        }
    }
    return content;
};