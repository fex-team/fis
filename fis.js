/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

//加载了核心模块
//kernel
var fis = module.exports = require('fis-kernel');
//fis默认的配置
//merge standard conf
fis.config.merge({
    modules : {
        postprocessor : {
            js : 'jswrapper'
        },
        optimizer : {
            js : 'uglify-js',
            css : 'clean-css',
            png : 'png-compressor'
        },
        spriter : 'csssprites',
        packager : 'map'
    }
});

//exports cli object
fis.cli = {};

fis.cli.name = 'fis';

//colors
fis.cli.colors = require('colors');

//commander object
fis.cli.commander = null;

//package.json
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

//output help info
fis.cli.help = function(){
    var content = [
        '',
        '  Usage: ' + fis.cli.name + ' <command>',
        '',
        '  Commands:',
        ''
    ];

    fis.cli.help.commands.forEach(function(name){
        var cmd = fis.require('command', name);
        name = cmd.name || name;
        name = fis.util.pad(name, 12);
        content.push('    ' + name + (cmd.desc || ''));
    });

    content = content.concat([
        '',
        '  Options:',
        '',
        '    -h, --help     output usage information',
        '    -v, --version  output the version number',
        '    --no-color     disable colored output',
        ''
    ]);
    console.log(content.join('\n'));
};

fis.cli.help.commands = [ 'release', 'install', 'server' ];

//output version info
fis.cli.version = function(){
    var content = [
        '',
        '  v' + fis.cli.info.version,
        '',
        ' __' + '/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'.bold.red + '__' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.yellow + '_____' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.green + '___',
        '  _' + '\\/\\\\\\///////////'.bold.red + '__' + '\\/////\\\\\\///'.bold.yellow + '____' + '/\\\\\\/////////\\\\\\'.bold.green + '_' + '       ',
        '   _' + '\\/\\\\\\'.bold.red + '_________________' + '\\/\\\\\\'.bold.yellow + '______' + '\\//\\\\\\'.bold.green + '______' + '\\///'.bold.green + '__',
        '    _' + '\\/\\\\\\\\\\\\\\\\\\\\\\'.bold.red + '_________' + '\\/\\\\\\'.bold.yellow + '_______' + '\\////\\\\\\'.bold.green + '_________' + '     ',
        '     _' + '\\/\\\\\\///////'.bold.red + '__________' + '\\/\\\\\\'.bold.yellow + '__________' + '\\////\\\\\\'.bold.green + '______' + '    ',
        '      _' + '\\/\\\\\\'.bold.red + '_________________' + '\\/\\\\\\'.bold.yellow + '_____________' + '\\////\\\\\\'.bold.green + '___' + '   ',
        '       _' + '\\/\\\\\\'.bold.red + '_________________' + '\\/\\\\\\'.bold.yellow + '______' + '/\\\\\\'.bold.green + '______' + '\\//\\\\\\'.bold.green + '__',
        '        _' + '\\/\\\\\\'.bold.red + '______________' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.yellow + '_' + '\\///\\\\\\\\\\\\\\\\\\\\\\/'.bold.green + '___',
        '         _' + '\\///'.bold.red + '______________' + '\\///////////'.bold.yellow + '____' + '\\///////////'.bold.green + '_____',
        ''
    ].join('\n');
    console.log(content);
};

function hasArgv(argv, search){
    var pos = argv.indexOf(search);
    var ret = false;
    while(pos > -1){
        argv.splice(pos, 1);
        pos = argv.indexOf(search);
        ret = true;
    }
    return ret;
}

//run cli tools
fis.cli.run = function(argv){
    //输出是否带颜色
    if(hasArgv(argv, '--no-color')){
        fis.cli.colors.mode = 'none';
    }
    //我们可以断点看看这个`argv`是什么
    var first = argv[2];
    if(argv.length < 3 || first === '-h' ||  first === '--help'){
        fis.cli.help();
    } else if(first === '-v' || first === '--version'){
        fis.cli.version();
    } else if(first[0] === '-'){
        fis.cli.help();
    } else {
        //commander是一个开源的nodejs命令工具
        //register command
        var commander = fis.cli.commander = require('commander');
        //在fis-kernel.js里面定义的方法
        //fis-command-[release | install | server]
        var cmd = fis.require('command', argv[2]);
        //例如，调用fis-command-release方法
        cmd.register(
            commander
                //这里会返回一个Command实例，命中执行第一个参数时会匹配这个实例里面通过option注册的格式的命令
                .command(cmd.name || first)
                //输入帮助信息时返回使用方法，这里没有传入
                .usage(cmd.usage)
                //命令说明
                .description(cmd.desc)
        );
        //上面已经注册(register option)好命令，开始解析并触发(trigger)命令
        commander.parse(argv);
    }
};