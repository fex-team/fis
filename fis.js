/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

//kernel
var fis = module.exports = require('fis-kernel');

fis.cli = {
    conf : null,
    commander : null,
    info : fis.util.readJSON(fis.util(__dirname, 'package.json')),
    rc : function(){
        var list = ['LOCALAPPDATA', 'APPDATA', 'USERPROFILE', 'HOME'],
            name = '.fisrc', conf;
        for(var i = 0, len = list.length; i < len; i++){
            var dir = process.env[list[i]];
            if(dir){
                conf = fis.util(dir, name);
                break;
            }
        }
        conf = conf || fis.path.getTempPath(name);
        if(!fis.util.exists(conf)){
            fis.util.write(conf, '{}');
        }
        return conf;
    },
    help : function(){
        var content = [
                '',
                '  usage: fis <command>',
                '',
                '  commands:',
                ''
            ],
            prefix = 'fis-command-',
            prefixLen = prefix.length;
        fis.util.map(this.info.dependencies, function(name, version){
            if(name.indexOf(prefix) === 0){
                name = name.substring(prefixLen);
                var cmd = fis.require('command', name);
                name = fis.util.pad(cmd.name || name, 12);
                content.push('    ' + name + (cmd.desc || ''));
            }
        });
        content = content.concat([
            '',
            '  options:',
            '',
            '    -h, --help     output usage information',
            '    -v, --version  output the version number',
            ''
        ]);
        console.log(content.join('\n'));
    },
    version : function(){
        var content = [
            '',
            '   v' + this.info.version,
            '',
            '  ┏┛┻━━━┛┻┓',
            '  ┃｜｜｜｜｜｜｜┃',
            '  ┃　　　━　　　┃',
            '  ┃　┳┛　┗┳　┃ ',
            '  ┃　　　　　　　┃',
            '  ┃　　　┻　　　┃',
            '  ┃　　　　　　　┃',
            '  ┗━┓　　　┏━┛',
            '  　　┃　　　┃',
            '  　　┃　　　┃',
            '  　　┃　　　┃',
            '  　　┃　　　┃',
            '  　　┃　　　┗━━━┓',
            '  　　┃            　┣┓',
            '  　　┃            　┃',
            '  　　┗┓┓┏━┳┓┏┛',
            '  　　　┃┫┫　┃┫┫',
            '  　　　┗┻┛　┗┻┛'
        ].join('\n');
        console.log(content);
    },
    run : function(argv){
        var first = argv[2];
        if(argv.length < 3 || first === '-h' ||  first === '--help'){
            this.help();
        } else if(first === '-v' || first === '--version'){
            this.version();
        } else if(first[0] === '-'){
            this.help();
        } else {
            var conf = this.conf = fis.util.readJSON(this.rc());
            if(conf.alias && conf.alias[first]){
                var alias = conf.alias[first].split(/\s+/);
                Array.prototype.splice.apply(argv, [2, 1].concat(alias));
            }
            var commander = this.commander = require('commander');
            commander
                .version(this.info.version)
                .usage('<command>');
            var cmd = fis.require('command', argv[2]);
            commander
                .command(cmd.name || first)
                .usage(cmd.usage)
                .description(cmd.desc);
            cmd.register(commander, fis);
            commander.parse(argv);
        }
    }
};