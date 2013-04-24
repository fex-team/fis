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