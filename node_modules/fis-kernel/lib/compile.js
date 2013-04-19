/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fis = require('../fis-kernel.js');

var CACHE_DIR;

var exports = module.exports = function(file){
    if(!CACHE_DIR){
        fis.log.error('uninitialized compile cache dir');
    }
    file = fis.file.wrap(file);
    if(file.isText()){
        if(file.isFile()){
            var cache = file.cache = fis.cache(file.realpath, CACHE_DIR),
                revertObj = {};
            if(cache.revert(revertObj)){
                file.requires = revertObj.info;
                file.setContent(revertObj.content);
            } else {
                file.setContent(fis.util.read(file.realpath));
                process(file);
                cache.save(file.getContent(), file.requires);
            }
        } else if(!file.realpath){
            process(file);
        } else {
            fis.log.error('unable to compile [' + file.realpath + ']: Invalid file path.');
        }
    } else if(file.realpath) {
        file.setContent(fis.util.read(file.realpath));
    }
    file.compiled = true;
    return file;
};

exports.settings = {
    debug    : false,
    optimize : false,
    lint     : false,
    hash     : false,
    domain   : false
};

exports.setup = function(opt){
    fis.util.merge(exports.settings, opt || {});
    CACHE_DIR = 'compile/'
        + (exports.settings.debug    ? 'debug'     : 'release')
        + (exports.settings.optimize ? '-optimize' : '')
        + (exports.settings.hash     ? '-hash'     : '')
        + (exports.settings.domain   ? '-domain'   : '');
    return CACHE_DIR;
};

exports.clean = function(name){
    fis.cache.clean('compile/' + (name || ''));
};

Object.defineProperty(exports, 'lang', {
    enumerable : true,
    value : (function(){
        var keywords = ['require', 'embed', 'uri', 'dep'],
            LD = '<[{', RD = '}]>',
            qLd = fis.util.escapeReg(LD),
            qRd = fis.util.escapeReg(RD),
            map = {
                reg : new RegExp(
                    qLd + '(' + keywords.join('|') + ')\\(([^\\(\\)]*)\\)' + qRd,
                    'g'
                )
            };
        keywords.forEach(function(key){
            map[key] = {};
            map[key]['ld'] = LD + key + '(';
            map[key]['rd'] = ')' + RD;
        });
        return map;
    })()
});

function process(file){
    pipe(file, 'parser', file.ext);
    standard(file);
    if(file.isLib || file.isMod){
        pipe(file, 'modular', file.rExt);
    }
    if(exports.settings.lint){
        pipe(file, 'lint', file.rExt, true);
    }
    if(exports.settings.optimize){
        pipe(file, 'optimizer', file.rExt);
    }
}

function getConf(key, filename){
    var conf = fis.config.get('settings.' + key, {});
    conf.filename = filename;
    return conf;
}

function pipe(file, type, ext, keep){
    var names = fis.config.get('modules.' + type + '.' + ext, '').trim();
    if(names){
        names.split(/\s*,\s*/).forEach(function(name){
            if(name){
                var key = type + '.' + name;
                var conf = getConf(key, file.realpath),
                    processor = fis.require(type, name),
                    content = processor(file.getContent(), file, conf, fis);
                if(!keep && typeof content !== 'undefined'){
                    file.setContent(content);
                }
            }
        });
    }
}

var embeddedMap = {};

function embeddedCheck(main, embedded){
    main = fis.file.wrap(main).realpath;
    embedded = fis.file.wrap(embedded).realpath;
    if(main === embedded){
        fis.log.error('unable to embed file[' + main + '] into itself.');
    } else if(embeddedMap[embedded]) {
        var next = embeddedMap[embedded],
            msg = [embedded];
        while(next !== embedded){
            msg.push(next);
            next = embeddedMap[next];
        }
        msg.push(embedded);
        fis.log.error('circular embedded on [' + msg.join('] -> [') + '].');
    }
    embeddedMap[embedded] = main;
    return true;
}

function embeddedUnlock(file){
    delete embeddedMap[file.realpath];
}

function addDeps(a, b){
    if(a && a.cache && b){
        if(b.cache){
            a.cache.mergeDeps(b.cache);
        }
        a.cache.addDeps(b.realpath || b);
    }
}

function standard(file){
    var path = file.realpath,
        content = file.getContent();
    if(typeof content === 'string'){
        content = content.replace(exports.lang.reg, function(all, type, value){
            var ret = '', info;
            switch(type){
                case 'require':
                    info = fis.uri.getId(value, file.dirname);
                    file.addRequire(info.id);
                    ret = info.quote + info.id + info.quote;
                    break;
                case 'uri':
                    info = fis.uri(value, file.dirname);
                    var url;
                    if(info.file){
                        if(exports.settings.hash){
                            if(info.file.isFile() && embeddedCheck(file, info.file)){
                                exports(info.file);
                                addDeps(file, info.file);
                            } else {
                                fis.log.warning('unable to locate resource [' + value + '] in file [' + path + ']');
                            }
                        }
                        url = info.file.getUrl(exports.settings.hash, exports.settings.domain);
                    } else {
                        url = info.rest;
                    }
                    ret = info.quote + url + info.query + info.quote;
                    addDeps(file, info.file);
                    break;
                case 'dep':
                    if(file.cache){
                        info = fis.uri(value, file.dirname);
                        addDeps(file, info.file);
                    } else {
                        fis.log.warning('unable to add deps to file [' + path + ']');
                    }
                    break;
                case 'embed':
                    info = fis.uri(value, file.dirname);
                    var f;
                    if(info.file){
                        f = info.file;
                    } else if(fis.util.isAbsolute(info.rest)){
                        f = fis.file(info.rest);
                    }
                    if(f && f.isFile()){
                        if(embeddedCheck(file, f)){
                            exports(f);
                            embeddedUnlock(f);
                            addDeps(file, f);
                            f.requires.forEach(function(id){
                                file.addRequire(id);
                            });
                            if(f.isText()){
                                ret = f.getContent();
                            } else {
                                ret = info.quote + f.getBase64() + info.quote;
                            }
                        }
                    } else {
                        fis.log.error('unable to embed file[' + value + '] into file[' + path + ']: No such file.');
                    }
                    break;
            }
            return ret;
        });
        file.setContent(content);
    }
}