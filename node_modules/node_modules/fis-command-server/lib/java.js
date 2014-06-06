
var _ = require('./util.js');
var exports = module.exports;
var child_process = require('child_process');
var spawn = child_process.spawn;
var resPath = __dirname + '/jetty';

exports.run = function(opt) {
    process.stdout.write('starting fis-server .');
    var timeout = Math.max(opt.timeout * 1000, 5000); delete opt.timeout;
    var errMsg = 'fis-server fails to start at port [' + opt.port + '], error: ';
    var args = [
        '-Dorg.apache.jasper.compiler.disablejsr199=true',
        //'-Djava.nio.channels.spi.SelectorProvider=sun.nio.ch.PollSelectorProvider',
        '-jar', resPath + '/client/client.jar'
    ];
    if(opt.rewrite && !opt.script){
        if(opt.php_exec){
            opt.script = 'index.php';
        } else {
            opt.script = 'index.jsp';
        }
    }
    var ready = false;
    var log = '';
    fis.util.map(opt, function(key, value){
        args.push('--' + key, String(value));
    });
    var server = spawn('java', args, { cwd : __dirname, detached: true });
    server.stderr.on('data', function(chunk){
        //console.log(chunk.toString('utf8'));
        if(ready) return;
        chunk = chunk.toString('utf8');
        log += chunk;
        process.stdout.write('.');
        if(chunk.indexOf('Started SelectChannelConnector@') > 0){
            ready = true;
            process.stdout.write(' at port [' + opt.port + ']\n');

            //copy fis ico
            var favicon = fis.util(opt.root, 'favicon.ico');
            if(!fis.util.exists(favicon)){
                fis.util.copy(resPath + '/vendor/favicon.ico', favicon);
            }

            //copy script
            if(opt.rewrite){
                var script = fis.util(opt.root, opt.script);
                if(!fis.util.exists(script)){
                    fis.util.copy(resPath + '/vendor/' + opt.script, script);
                }
            }
            setTimeout(function(){
                _.open('http://127.0.0.1' + (opt.port == 80 ? '/' : ':' + opt.port + '/'), function(){
                    process.exit();
                });
            }, 200);
        } else if(chunk.indexOf('Exception') > 0) {
            process.stdout.write(' fail\n');
            try { process.kill(server.pid, 'SIGKILL'); } catch(e){}
            var match = chunk.match(/exception:?\s+([^\r\n]+)/i);
            if(match){
                errMsg += match[1];
            } else {
                errMsg += 'unknown';
            }
            console.log(log);
            fis.log.error(errMsg);
        }
    });
    server.on('error', function(err){
        try { process.kill(server.pid, 'SIGKILL'); } catch(e){}
        fis.log.error(err);
    });
    server.unref();
    fis.util.write(_.getPidFile(), server.pid);
    setTimeout(function(){
        process.stdout.write(' fail\n');
        if(log) console.log(log);
        fis.log.error(errMsg + 'timeout');
    }, timeout);
};