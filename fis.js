/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

//kernel
var fis = module.exports = require('fis-kernel');

//exports cli object
fis.cli = {};

//colors
fis.cli.colors = require('colors');

//runtime config
fis.cli.rc = {};

//get rc file
fis.cli.rcFile = (function(){
    var name = '.fisrc', conf;
    for(var i = 0, len = arguments.length; i < len; i++){
        var dir = process.env[arguments[i]];
        if(dir){
            conf = fis.util(dir, name);
            break;
        }
    }
    conf = conf || fis.project.getTempPath(name);
    if(!fis.util.exists(conf)){
        fis.util.write(conf, '{}');
    }
    return conf;
})('LOCALAPPDATA', 'APPDATA', 'USERPROFILE', 'HOME');

//commander object
fis.cli.commander = null;

//package.json
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

//output help info
fis.cli.help = function(){
    var content = [
            '',
            '  Usage: fis <command>',
            '',
            '  Commands:',
            ''
        ],
        prefix = 'fis-command-',
        prefixLen = prefix.length;
    
    //built-in commands
    var deps = {};
    //from package.json dependencies
    fis.util.merge(deps, fis.cli.info.dependencies);
    //from package.json devDependencies
    fis.util.merge(deps, fis.cli.info.devDependencies);
    //traverse
    fis.util.map(deps, function(name){
        if(name.indexOf(prefix) === 0){
            name = name.substring(prefixLen);
            try {
                var cmd = fis.require('command', name);
                name = fis.util.pad(cmd.name || name, 12);
                content.push('    ' + name + (cmd.desc || ''));
            } catch (e){
                //maybe devDependencies.
            }
        }
    });
    content = content.concat([
        '',
        '  Options:',
        '',
        '    -h, --help     output usage information',
        '    -v, --version  output the version number',
        ''
    ]);
    console.log(content.join('\n'));
};

//output version info
fis.cli.version = function(){
    var content = [
        '',
        '   v' + fis.cli.info.version,
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
};

//run cli tools
fis.cli.run = function(argv){
    
    var first = argv[2];
    if(argv.length < 3 || first === '-h' ||  first === '--help'){
        fis.cli.help();
    } else if(first === '-v' || first === '--version'){
        fis.cli.version();
    } else if(first[0] === '-'){
        fis.cli.help();
    } else {
        //read runtime config
        var rc = fis.cli.rc = fis.util.readJSON(fis.cli.rcFile);
        
        //set log config
        var logrc = rc.log || {};
        fis.log.throw = logrc.throw == 1;
        fis.log.level = logrc.debug == 1 ? fis.log.L_ALL : fis.log.L_NORMAL;
        fis.log.beauty = typeof logrc.beauty === 'undefined' ? true : logrc.beauty == 1;
        fis.log.alert = typeof logrc.alert === 'undefined' ? true : logrc.alert == 1;
        
        //register command
        var commander = fis.cli.commander = require('commander');
        var cmd = fis.require('command', argv[2]);
        cmd.register(
            commander
                .command(cmd.name || first)
                .usage(cmd.usage)
                .description(cmd.desc),
            fis
        );
        commander.parse(argv);
    }
};