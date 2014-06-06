/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function(ret, conf, settings, opt){
    var pkgMap = {}, packed = {},
        ns = fis.config.get('namespace'),
        connector = fis.config.get('namespaceConnector', ':'),
        root = fis.project.getProjectPath();
    //construct package table
    fis.util.map(conf, function(path, patterns, index){
        if(typeof patterns === 'string' || patterns instanceof RegExp){
            patterns = [ patterns ];
        }
        if(fis.util.is(patterns, 'Array') && patterns.length){
            var pid = (ns ? ns + connector : '') + 'p' + index,
                subpath = path.replace(/^\//, ''),
                pkg = fis.file(root, subpath);
            if(typeof ret.src[pkg.subpath] !== 'undefined'){
                fis.log.warning('there is a namesake file of package [' + path + ']');
            }
            pkgMap[pid] = {
                id : pid,
                file : pkg,
                regs : patterns,
                pkgs : new Array(patterns.length)
            };
        } else {
            fis.log.warning('invalid pack config [' + path + ']');
        }
    });
    
    //determine if subpath hit a pack config
    var hit = function(subpath, regs){
        for(var i = 0, len = regs.length; i < len; i++){
            var reg = regs[i];
            if(reg && fis.util.filter(subpath, reg)){
                return i;
            }
        }
        return false;
    };
    
    //pack file
    var pack = function(subpath, file){
        if(packed[subpath] || file.isImage()) return;
        fis.util.map(pkgMap, function(pid, pkg){
            var index = hit(file.subpath, pkg.regs);
            if(index !== false){
                packed[subpath] = true;
                file.requires.forEach(function(id){
                    var dep = ret.ids[id];
                    if(dep && dep.rExt === file.rExt){
                        pack(dep.subpath, dep);
                    }
                });
                var stack = pkg.pkgs[index] || [];
                stack.push(file);
                pkg.pkgs[index] = stack;
                //stop to pack
                return true;
            }
        });
    };
    
    //walk
    fis.util.map(ret.src, function(subpath, file){
        pack(subpath, file);
    });
    
    //pack
    fis.util.map(pkgMap, function(pid, pkg){
        //collect contents
        var content = '', has = [], index = 0,
            requires = [], requireMap = {};
        pkg.pkgs.forEach(function(pkg){
            pkg.forEach(function(file){
                var id = file.getId();
                if(ret.map.res[id]){
                    var c = file.getContent();
                    if(c != ''){
                        if(index++ > 0){
                            content += '\n';
                            if(file.isJsLike){
                                content += ';';
                            } else if(file.isCssLike){
                                c = c.replace(/@charset\s+(?:'[^']*'|"[^"]*"|\S*);?/gi, '');
                            }
                        }
                        content += c;
                    }
                    ret.map.res[id].pkg = pid;
                    requires = requires.concat(file.requires);
                    requireMap[id] = true;
                    has.push(id);
                }
            });
        });
        if(has.length){
            pkg.file.setContent(content);
            ret.pkg[pkg.file.subpath] = pkg.file;
            //collect dependencies
            var deps = [];
            requires.forEach(function(id){
                if(!requireMap[id]){
                    deps.push(id);
                    requireMap[id] = true;
                }
            });
            var pkgInfo = ret.map.pkg[pid] = {
                uri  : pkg.file.getUrl(opt.hash, opt.domain),
                type : pkg.file.rExt.replace(/^\./, ''),
                has  : has
            };
            if(deps.length){
                pkgInfo.deps = deps;
            }
        }
    });
};