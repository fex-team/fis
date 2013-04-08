/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

//kernel
var fis = module.exports = require('fis-kernel');

//exports cli object
fis.cli = {};

//runtime config
fis.cli.rc = {};

//commander object
fis.cli.commander = null;

//package.json
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

//get rc file
fis.cli.getRCFile = function(){
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
};

//output help info
fis.cli.help = function(){
    var content = [
            '',
            '  usage: fis <command>',
            '',
            '  commands:',
            ''
        ],
        prefix = 'fis-command-',
        prefixLen = prefix.length;
    fis.util.map(fis.cli.info.dependencies, function(name, version){
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
        var rc = fis.cli.rc = fis.util.readJSON(fis.cli.getRCFile());
        //command alias
        if(rc.alias && rc.alias[first] && fis.util.is(rc.alias[first], 'Array')){
            Array.prototype.splice.apply(argv, [2, 1].concat(rc.alias[first]));
        }
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