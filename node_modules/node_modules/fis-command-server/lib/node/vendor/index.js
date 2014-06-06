var fs = require('fs');
module.exports = function(req, res) {
    var html = '';
    if (req.url == '/favicon.ico') {
        var ico = __dirname + '/favicon.ico';
        if (fs.existsSync(ico)) {
            res.setHeader('Content-Type', 'image/x-icon');
            res.write(fs.readFileSync(ico));
        }
        res.end();
    } else {
        res.setHeader('Connection', 'close');
        res.setHeader('Content-type', 'text/html');

        html += '<!doctype html>';
        html += '<html>';
        html += '<head>';
        html += '<meta charset="utf-8"/>';
        html += '<title>hello, fis</title>';
        html += '<style>';
        html += '    pre {';
        html += '        line-height: 7px;';
        html += '        font-family: "Courier New", "Courier", "monospace", "Consolas", "DejaVu Sans Mono";';
        html += '        font-size: 11px;';
        html += '        color: #333;';
        html += '        border-bottom: 1px dashed #999;';
        html += '        padding-bottom: 1px;';
        html += '    }';
        html += '    .c1 {';
        html += '        color: #c00;';
        html += '    }';
        html += '    .c2 {';
        html += '        color: #03c;';
        html += '    }';
        html += '</style>';
        html += '</head>';
        html += '<body>';
        html += "<pre>          ;;;.              \n",
        html += "          @@@'                   \n",
        html += "          @@@+                   \n",
        html += "    @@ ;@@@@@@@@`.@.   '` @      \n",
        html += "   @@@@@@@@@@@@@@@@@.  @@@@;     \n",
        html += "   @@@@@@@@@@@@@@@@@@,@@. #@@    \n",
        html += "    @@@@@@@@@@@@@@@@ `@'   @#    \n",
        html += "   +@@@@@     ;@@@@@` @;   @@    \n",
        html += "   @@@@@       `@@@@@:@@  '@@    \n",
        html += "  .@@@@         +@@@@  @@@@#     \n",
        html += "+@@@@@@          @@@@@@+#,@.     \n",
        html += "+@@@@@+          @@@@@@ :.  @@   \n",
        html += "+@@@@@#          @@@@@@ @@@@@@`  \n",
        html += ";@@@@@@          @@@@@@.@@@@@@@'+\n",
        html += "  .@@@@         #@@@@ .@@@  `@@@@\n",
        html += "   @@@@@       ,@@@@@+@@@     @@:\n",
        html += "   +@@@@@,    #@@@@@ .@@#     @@@\n",
        html += "   :@@@@@@@@@@@@@@@@  @@#     @@@\n",
        html += "  .@@@@@@@@@@@@@@@@@@ ;@@     @@@\n",
        html += "   +@@@@@@@@@@@@@@@@  @@@@. ,@@@ \n",
        html += "    +# :@@@@@@@@` @   #.@@@@@@@` \n",
        html += "          @@@+           @@@@@@  \n",
        html += "          @@@+           @@  :   \n",
        html += '                                                  Forward request <em class="c1">'+req.url+'</em> to file [ <em class="c2">'+ __filename + '</em> ].\n';
        html += '@@@@@@@      @@@@`     @@@@@@@\n';
        html += '@@@@@@@      @@@@`     @@@@@@@\n';
        html += '@@            +@       @@\n';
        html += '@@@@@@        +@       @@@@@@@\n';
        html += '@@@@@@        +@       @@@@@@@\n';
        html += '@@            +@            `@\n';
        html += '@@       @@  @@@@` :@  @@@@@@@\n';
        html += '@@       @@  @@@@` :@  @@@@@@@\n';

        html += '</pre>';

        html += '</body>';
        html += '</html>';

        res.end(html);
    }
};
