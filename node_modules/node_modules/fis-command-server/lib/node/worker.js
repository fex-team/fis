var Socket = require('net').Socket;
var http = require('http');
var _ = require('../util.js');
var fs = require('fs');
var MIME_MAP = {
    //text
    'css' : 'text/css',
    'tpl' : 'text/plain',
    'js' : 'text/javascript',
    'php' : 'text/plain',
    'asp' : 'text/plain',
    'jsp' : 'text/jsp',
    'txt' : 'text/plain',
    'json' : 'application/json',
    'xml' : 'text/xml',
    'htm' : 'text/html',
    'text' : 'text/plain',
    'md' : 'text/plain',
    'xhtml' : 'text/html',
    'inc' : 'text/plain',
    'html' : 'text/html',
    'conf' : 'text/plain',
    'po' : 'text/plain',
    'config' : 'text/plain',
    'coffee' : 'text/javascript',
    'less' : 'text/css',
    'sass' : 'text/css',
    'manifest' : 'text/cache-manifest',
    //image
    'svg' : 'image/svg+xml',
    'tif' : 'image/tiff',
    'tiff' : 'image/tiff',
    'wbmp' : 'image/vnd.wap.wbmp',
    'webp' : 'image/webp',
    'png' : 'image/png',
    'bmp' : 'image/bmp',
    'fax' : 'image/fax',
    'gif' : 'image/gif',
    'ico' : 'image/x-icon',
    'jfif' : 'image/jpeg',
    'jpg' : 'image/jpeg',
    'jpe' : 'image/jpeg',
    'jpeg' : 'image/jpeg',
    'woff' : 'image/woff',
    'cur' : 'application/octet-stream'
};

var www_root;
var server = http.createServer(function(req, res){
    //run default script
    var argv = _.parseArgs(process.argv);
    www_root = argv['root'];
    if (argv['rewrite'] === 'true') {
        var index = www_root + '/' + (argv['script'] || 'index.js');
        require(index)(req, res);
    } else {
        res.setHeader('Server', 'fis-server');
        res.setHeader('Connection', 'close');
        var pathname = req.url;
        var pos = pathname.indexOf('?');
        if(pos > -1){
            pathname = pathname.substring(0, pos);
        }
        pathname = pathname.replace(/\/$/, '');
        var fullpath = www_root + pathname;
        if(fs.existsSync(fullpath)){
            var stat = fs.statSync(fullpath);
            if(stat.isFile()){
                pos = fullpath.lastIndexOf('/');
                if(pos > -1){
                    var filename = fullpath.substring(pos + 1);
                    pos = filename.lastIndexOf('.');
                    if(pos > -1){
                        var ext = filename.substring(pos + 1);
                        res.setHeader('Content-Type', MIME_MAP[ext] || 'application/x-' + ext);
                    }
                }
                var content = fs.readFileSync(fullpath);
                res.setHeader('Content-Length', content.length);
                res.end(content);
                return;
            } else if(stat.isDirectory()){
                var html = '';
                if(fs.existsSync(fullpath + '/index.html') && fs.statSync(fullpath + '/index.html').isFile()){
                    html = fs.readFileSync(fullpath + '/index.html');
                } else if(fs.existsSync(fullpath + '/index.htm') && fs.statSync(fullpath + '/index.htm').isFile()){
                    html = fs.readFileSync(fullpath + '/index.htm');
                } else {
                    var files = fs.readdirSync(fullpath);
                    html = '<!doctype html>';
                    html += '<html>';
                    html += '<head>';
                    html += '<title>' + (pathname || '/') + '</title>';
                    html += '</head>';
                    html += '<body style="margin:0;padding:0 20px;">';
                    html += '<h1> - ' + (pathname || '/') + '</h1>';
                    html += '<div id="file-list">';
                    html += '<ul>';
                    if(pathname){
                        html += '<li><a href="' + pathname + '/..">..</a></li>';
                    }
                    files.forEach(function(item) {
                        var s_url = pathname + '/' + item;
                        html += '<li><a href="' + s_url + '">'+ item + '</a></li>';
                    });
                    html += '</ul>';
                    html += '</div>';
                    html += '</body>';
                    html += '</html>';
                }
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Content-Length', html.length);
                res.end(html);
                return;
            }
        }
        res.statusCode = 404;
        res.end('NOT FOUND');
    }
});

process.on('message', function(message, handle){
    if(handle){
        var socket = new Socket({
            handle : handle,
            allowHalfOpen : server.allowHalfOpen
        });
        socket.readable = socket.writable = true;
        socket.resume();
        socket.server = server;
        socket.on('close', function() {
            process.disconnect();
            process.exit();
        });
        server.emit('connection', socket);
        socket.emit('connect');
    }
});
