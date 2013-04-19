/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

exports.name = 'server';
exports.usage = '<command> [options]';
exports.desc = 'launch a php-cgi server';
exports.register = function(commander, fis){
    
    function getConf(){
        return fis.project.getTempPath('server/conf.json');
    }
    
    function stop(callback){
        //del log file
        var log = fis.util(__dirname, 'log.txt');
        if(fis.util.exists(log)){
            fis.util.fs.unlinkSync(log);
        }
        var tmp = fis.util(__dirname, 'pid');
        if(fis.util.exists(tmp)){
            var pid = fis.util.fs.readFileSync(tmp, 'utf8').trim().split(/\s*,\s*/);
            var list, msg = '';
            var isWin = fis.util.isWin();
            if(isWin){
                list = require('child_process').spawn('tasklist');
            } else {
                list = require('child_process').spawn('ps', ['a']);
            }
            list.stdout.on('data', function(chunk){
                msg += chunk.toString('utf8').toLowerCase();
            });
            list.on('exit', function(){
                var reg = /\b(node|java)\b/;
                var indexs = {
                    'node' : 0,
                    'java' : 1
                };
                msg.split(/[\r\n]+/).forEach(function(item){
                    var match = item.match(reg);
                    if(match){
                        item = item.split(/\s+/);
                        var id = item[isWin ? 1 : 0];
                        if(id == pid[indexs[match[1]]]){
                            process.kill(id);
                        }
                    }
                });
                fis.util.fs.unlinkSync(tmp);
                if(callback){
                    callback();
                }
            });
        } else {
            if(callback){
                callback();
            }
        }
    }
    
    function matchVersion(str){
        var version = false;
        var reg = /\b\d+(\.\d+){2}/;
        var match = str.match(reg);
        if(match){
            version = match[0];
        }
        return version;
    }
    
    function start(opt){
        var tmp = getConf();
        if(opt){
            fis.util.write(tmp, JSON.stringify(opt));
        } else {
            if(fis.util.exists(tmp)){
                opt = fis.util.readJSON(tmp);
            } else {
                opt = {};
            }
        }
        
        if(opt.root){
            if(fis.util.exists(opt.root)){
                if(!fis.util.isDir(opt.root)){
                    fis.log.error('document root [' + opt.root + '] is not a directory');
                }
            } else {
                fis.util.mkdir(opt.root);
            }
        } else {
            fis.log.error('invalid document root');
        }
        
        var spawn = require('child_process').spawn;
        
        //check java
        process.stdout.write('checking java support : ');
        var java = spawn('java', ['-version']);
        var javaVersion = false;
        java.stderr.on('data', function(data){
            if(!javaVersion){
                javaVersion = matchVersion(data.toString('utf8'));
                if(javaVersion){
                    process.stdout.write('version ' + javaVersion + '\n');
                }
            }
        });
        java.on('error', function(err){
            fis.log.error(err);
        });
        java.on('exit', function(){
            if(javaVersion){
                //check php-cgi
                process.stdout.write('checking php-cgi support : ');
                var php = spawn(opt['php_exec'] ? opt['php_exec'] : 'php-cgi', ['-v']);
                var phpVersion = false;
                php.stdout.on('data', function(data){
                    if(!phpVersion){
                        phpVersion = matchVersion(data.toString('utf8'));
                        if(phpVersion){
                            process.stdout.write('version ' + phpVersion + '\n');
                        }
                    }
                });
                php.on('error', function(err){
                    fis.log.error(err);
                });
                php.on('exit', function(){
                    if(phpVersion){
                        fis.log.debug('document root [' + opt.root + ']');
                        process.stdout.write('starting fis-server on port : ');
                        var cmd = [
                            fis.util.escapeShellArg(process.execPath),
                            fis.util.escapeShellArg(fis.util(__dirname, 'child.js'))
                        ].join(' ');
                        fis.util.map(opt, function(key, value){
                            if(typeof value === 'string'){
                                value = fis.util.escapeShellArg(value);
                            }
                            cmd += ' --' + key + ' ' + value;
                        });
                        fis.util.nohup(cmd, { cwd : __dirname });
                        setTimeout(function(){
                            process.stdout.write(opt.port + '\n');
                        }, 2000);
                    } else {
                        fis.log.error('unsupported php-cgi environment');
                    }
                });
            } else {
                fis.log.error('unsupported java environment');
            }
        });
    }
    
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
    
    function printObj(obj, prefix){
        prefix = prefix || '';
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] === 'object'){
                    printObj(obj[key], prefix + key + '.');
                } else {
                    console.log(prefix + key + '=' + obj[key]);
                }
            }
        }
    }
    
    commander
        .option('-p, --port <int>', 'server listen port', parseInt, 8080)
        .option('--root <path>', 'document root', getRoot, fis.project.getTempPath('www'))
        .option('--script <name>', 'rewrite entry file name', String)
        .option('--php_exec <path>', 'path to php-cgi executable file', String)
        .option('--php_exec_args <args>', 'php-cgi arguments', String)
        .option('--php_fcgi_children <int>', 'the number of php-cgi processes', parseInt)
        .option('--php_fcgi_max_requests <int>', 'the max number of requests', parseInt)
        .option('--no-rewrite', 'disable rewrite feature', Boolean)
        .action(function(cmd, options){
            var conf = getConf();
            switch (cmd){
                case 'start':
                    var opt = {};
                    fis.util.map(options, function(key, value){
                        if(typeof value !== 'object' && key[0] !== '_'){
                            opt[key] = value;
                        }
                    });
                    stop(function(){ start(opt); });
                    break;
                case 'stop':
                    stop();
                    break;
                case 'restart':
                    stop(start);
                    break;
                case 'install':
                    var name = options;
                    options = arguments[2];
                    if(typeof name === 'string'){
                        name = name.split('@');
                        var version = name[1] || '0';
                        name = name[0];
                        var remote = fis.config.get(
                            'system.repos', fis.project.DEFAULT_REMOTE_REPOS
                        ).replace(/\/$/, '');
                        var url = remote + '/' + name + '/' + version + '.tar';
                        process.stdout.write('download module [' + name + '@' + version + '] ... ');
                        fis.util.download(url, function(err){
                            if(err){
                                process.stdout.write('fail\n');
                                fis.log.error( 'unable to download module [' +
                                    name + '@' + version + '] from [' + url + '], error [' + err + ']');
                            } else {
                                process.stdout.write('ok\n');
                            }
                        }, options['root']);
                    } else {
                        fis.log.error('invalid framework name');
                    }
                    break;
                case 'info':
                    if(fis.util.isFile(conf)){
                        conf = fis.util.readJSON(conf);
                        printObj(conf);
                    } else {
                        console.log('nothing...');
                    }
                    break;
                case 'open':
                    if(fis.util.isFile(conf)){
                        conf = fis.util.readJSON(conf);
                        if(fis.util.isDir(conf.root)){
                            var open = fis.util.isWin() ? 'start' : 'open';
                            require('child_process').exec(open + ' ' + fis.util.escapeShellArg(conf.root));
                        }
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
        .command('install <name>')
        .description('install server framework');
};