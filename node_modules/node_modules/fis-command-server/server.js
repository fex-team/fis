/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var server = require('./lib/server.js');

exports.name = 'server';
exports.usage = '<command> [options]';
exports.desc = 'launch a php-cgi server';
exports.register = function(commander) {
    function getRoot(root){
        if(fis.util.exists(root)){
            if(!fis.util.isDir(root)){
                fis.log.error('invalid document root');
            }
        } else {
            fis.util.mkdir(root);
        }
        return fis.util.realpath(root);
    }

    //support glob: a**,b**,/usr**,/*/*
    function glob(str, prefix) {
        var globArr = str.split(',');
        var group = [];
        var s_reg;
        globArr.forEach(function(g) {
            if (g.length > 0) {
                s_reg = fis.util.glob(g).toString();
                //replace
                // '/^' => ''
                // '$/i' => ''
                s_reg = s_reg.substr(2, s_reg.length - 5);
                group.push(s_reg);
            }
        });
        prefix = prefix || '';
        if (prefix) {
            s_reg = fis.util.glob(prefix).toString();
            // '/^' => '', '%/i' => ''
            prefix = s_reg.substr(2, s_reg.length - 5);
        }
        return new RegExp('^'+ prefix + '(' + group.join('|') + ')$', 'i');
    }

    var serverRoot = (function(){
        var key = 'FIS_SERVER_DOCUMENT_ROOT';
        if(process.env && process.env[key]){
            var path = process.env[key];
            if(fis.util.exists(path) && !fis.util.isDir(path)){
                fis.log.error('invalid environment variable [' + key + '] of document root [' + path + ']');
            }
            return path;
        } else {
            return fis.project.getTempPath('www');
        }
    })();
    
    commander
        .option('-p, --port <int>', 'server listen port', parseInt, process.env.FIS_SERVER_PORT || 8080)
        .option('--root <path>', 'document root', getRoot, serverRoot)
        .option('--type <php|java|node>', 'process language', String)
        .option('--rewrite [script]', 'enable rewrite mode', String, fis.config.get('server.rewrite', false))
        .option('--repos <url>', 'install repository', String, process.env.FIS_SERVER_REPOSITORY)
        .option('--timeout <seconds>', 'start timeout', parseInt, 15)
        .option('--php_exec <path>', 'path to php-cgi executable file', String, 'php-cgi')
        .option('--php_exec_args <args>', 'php-cgi arguments', String)
        .option('--php_fcgi_children <int>', 'the number of php-cgi processes', parseInt)
        .option('--php_fcgi_max_requests <int>', 'the max number of requests', parseInt)
        .option('--include <glob>', 'clean include filter', String)
        .option('--exclude <glob>', 'clean exclude filter', String)
        .action(function(){
            var args = Array.prototype.slice.call(arguments);
            var options = args.pop();
            var cmd = args.shift();
            var root = options.root;
            if (options.rewrite) {
                if(options.rewrite != true){
                    options.script = options.rewrite;
                    options.rewrite = true;
                }
            }

            if(root){
                if(fis.util.exists(root) && !fis.util.isDir(root)){
                    fis.log.error('invalid document root [' + root + ']');
                } else {
                    fis.util.mkdir(root);
                }
            } else {
                fis.log.error('missing document root');
            }

            function download(names) {
                if((typeof names === 'string') && names.trim().length > 0){
                    var remote = options.repos || fis.config.get(
                        'system.repos', fis.project.DEFAULT_REMOTE_REPOS
                    ).replace(/\/$/, '') + '/server';
                    var option = {
                        extract : options['root'],
                        remote : remote
                    };
                    names.split(',').forEach(function(name){
                        name = name.split('@');
                        fis.util.install(name[0], name[1], option);
                    });
                } else {
                    fis.log.error('invalid server component name');
                }
            }

            switch (cmd) {
                case 'start':
                    var opt = {};
                    fis.util.map(options, function(key, value){
                        if(typeof value !== 'object' && key[0] !== '_'){
                            opt[key] = value;
                        }
                    });
                    server.stop(function() {
                        server.start(opt);
                    });
                    break;
                case 'stop':
                    server.stop(function() {

                    });
                    break;
                case 'restart':
                    server.stop(server.start);
                    break;
                case 'install':
                    var names = args.shift();
                    download(names);
                    break;
                case 'info':
                    server.info();
                    break;
                case 'open':
                    server.open();
                    break;
                case 'clean':
                    process.stdout.write(' δ '.bold.yellow);
                    var now = Date.now();
                    var user_include = fis.config.get('server.clean.include');
                    var user_exclude = fis.config.get('server.clean.exclude');
                    //flow: command => user => default
                    var include = options.include  ? glob(options.include, root) : (user_include ? glob(user_include, root) : null);
                    var exclude = options.exclude ? glob(options.exclude, root) : (user_exclude ? glob(user_exclude, root) : /\/WEB-INF\/cgi\//);
                    fis.util.del(root, include, exclude);
                    process.stdout.write((Date.now() - now + 'ms').green.bold);
                    process.stdout.write('\n');
                    break;
                case 'init':
                    var libs = fis.config.get('server.libs');
                    if (fis.util.is(libs, 'Array')) {
                        libs.forEach(function(name) {
                            download(name);
                        });
                    } else if(fis.util.is(libs, 'String')) {
                        download(libs);
                    }
                    break;
                default :
                    commander.help();
            }
        });
    
    commander
        .command('start')
        .description('start server');
    
    commander
        .command('stop')
        .description('shutdown server');
    
    commander
        .command('restart')
        .description('restart server');
    
    commander
        .command('info')
        .description('output server info');
    
    commander
        .command('open')
        .description('open document root directory');
    
    commander
        .command('clean')
        .description('clean files in document root');
    
    commander
        .command('install <name>')
        .description('install server framework');

    if (fis.config.get('server.libs')) {
        commander
            .command('init')
            .description('initialize server framework');
    }
};
