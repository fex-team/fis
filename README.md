# Front End Integrated Solution.

*Unfinished until version 1.0.0*

## Installation

    $ npm install -g fis

## commands

    Usage: fis <command>
    
    Commands:
    
      release     build and deploy your project
      server      launch a php-cgi server
    
    Options:
    
      -h, --help     output usage information
      -v, --version  output the version number

## fis release

    Usage: release [options]
    
    Options:
    
      -h, --help          output usage information
      -d, --dest <names>  release output destination
      -w, --watch         monitor the changes of project
      -c, --clean         clean cache before releasing
      --md5 <level>       md5 release option
      --domains           add domain
      --lint              with lint
      --optimize          with optimize
      --pack              with package
      --debug             debug mode

## fis server

    Usage: server <command> [options]
    
    Commands:
    
      start                  start server
      stop                   shutdown server
      restart                restart server
      info                   output server info
      open                   open document root directory
      install <name>         install server framework
    
    Options:
    
      -h, --help                     output usage information
      -p, --port <int>               server listen port
      --root <path>                  document root
      --script <name>                rewrite entry file name
      --timeout <seconds>            rewrite entry file name
      --php_exec <path>              path to php-cgi executable file
      --php_exec_args <args>         php-cgi arguments
      --php_fcgi_children <int>      the number of php-cgi processes
      --php_fcgi_max_requests <int>  the max number of requests
      --no-rewrite                   disable rewrite feature

## fis-conf.js

### vim path/to/project/fis-conf.js

### settings

    fis.config.merge({          //merge user settings
        namespace : 'photo',    //using namespace, it can be omitted.
        roadmap : {             //configure directory and release specification.
            ext : {
                less : 'css'    //all the less files will be compiled into css files.
            }，
            domain : {
                '*.js' : 'http://img.baidu.com'  //add domain to all js files.
            },
            path : [            //configure directory specification.
                {
                    reg : /^\/test\//i,     //all the files in "/test/" directory
                    release : false         //will not be released
                },
                {
                    reg : /^\/widget\/.*\.(js|css)$/i,  //all the js & css files in "/widget/" directory
                    isMod : true,                       //is modular file
                    release : '/static/${namespace}$&'  //release to "path/to/output/static/photo/..."
                },
                {
                    reg : /^\/widget\/(.*\.tpl)$/i,     //all the tpl files in "/widget/" directory
                    isMod : true,                       //is modular file
                    url : 'widget/${namespace}/$1',     //resource locator is "widget/photo/..."
                    release : '/template/widget/${namespace}/$1'    //release to "path/to/output/template/widget/photo/..."
                },
                {
                    reg : /^\/plugin\//i                //all the files in "/plugin/" directory will be released to "path/to/output/plugin/..."
                },
                {
                    reg : /^\/.+\.tpl$/i,                   //other tpl files
                    release : '/template/${namespace}$&'    //release to "path/to/output/template/photo/..."
                },
                {
                    reg : /^\/photo-map\.json$/i,           //photo-map.json
                    release : '/config$&'                   //release to "path/to/output/config/photo-map.json"
                },
                {
                    reg : /^.*$/,                           //any other files
                    release : '/static/${namespace}$&'      //release to "path/to/output/static/photo/..."
                }
            ]
        },
        deploy : {
            'rd-test' : {   //a deploy example
                receiver : 'http://zhangyunlong.fe.baidu.com/receiver.php',     //receiver
                to : '/home/zhangyunlong/public_html/'                          //post all the released files to the reciever, and save them to "/home/zhangyunlong/public_html/" directory of remote
            }
        },
        modules : {             //using plugins
            parser : {
                less : 'less'   //parse less file with "fis-parser-less" plugin (not built-in, install it with npm)
            }
        },
        settings : {                //plugin settings
            optimizer : {
                'uglify-js' : {     //configure uglify-js plugin, @see https://npmjs.org/package/uglify-js
                    booleans : true,
                    if_return : false,
                }
            }
        }
    });