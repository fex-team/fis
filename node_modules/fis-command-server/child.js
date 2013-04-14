/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var fs = require('fs');

function log(buffer){
    var log = fs.openSync(__dirname + '/log.txt', 'a+');
    fs.writeSync(log, buffer, 0, buffer.length);
    fs.closeSync(log);
}

var args = ['-jar', 'client/client.jar'].concat(process.argv.splice(2));
var spawn = require('child_process').spawn;
var server = spawn('java', args, { cwd : __dirname });

server.stderr.on('data', function(chunk){
    log(chunk);
});

server.stdout.on('data', function(chunk){
    log(chunk);
});

server.on('error', function(err){
    log(err.message);
});


fs.writeFileSync(__dirname + '/pid', process.pid + ',' + server.pid);