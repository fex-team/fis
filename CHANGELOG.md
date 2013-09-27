## 1.4.15 / Fri Sep 27 2013

> 升级fis-command-release至v0.8.11
>
> 升级fis-optimizer-png-compressor至v0.0.3
>
> 升级fis-spriter-csssprites至v0.1.4

* 修改 fis release ``-C`` &lt;path&gt; 参数为 fis release ``-f`` &lt;path&gt;
* 升级压缩器插件，减少文件体积，提升性能

## 1.4.14 / Thu Sep 26 2013

> 升级fis-kernel至v1.8.14

* html不会自动添加对useMap为false的同名文件的依赖

## 1.4.13 / Wed Sep 25 2013

> 升级fis-kernel至v1.8.13

* 支持配置文件的md5连接符：

    ```javascript
    //默认是'_'
    fis.config.set('project.md5Connector', '.');
    ```

* 修复定义文件query属性时输出的bug

## 1.4.12 / Thu Sep 19 2013

> 升级fis-kernel至v1.8.12

* 修复csssprite针对单文件处理之后文件发布时md5不匹配的bug

## 1.4.11 / Thu Sep 19 2013

* 包装fis的系统能自动识别release\install\server三条命令

## 1.4.10 / Wed Sep 18 2013

> 升级fis-kernel至v1.8.11

* 修复fis.uri.getId如果指向一个目录时居然会返回id的bug

## 1.4.9 / Wed Sep 18 2013

> 升级fis-kernel至v1.8.10
>
> 升级fis-command-server至v0.6.5
>
> 升级fis-command-release至v0.8.10

* fis server clean支持使用 ``--include`` 、 ``--exclude`` 参数来指定清除调试目录时的过滤器，例如：

    ```bash
    fis server clean --include template_c/**
    ```

* fis release 支持使用 ``-C`` 或者 ``--conf`` 参数制定配置文件名称，默认是 ``fis-conf.js``，配置文件请尽量使用 ``fis-`` 作为文件名前缀，并放置到项目根目录下。例如：

    ```bash
    fis release --conf fis-conf-dev.js
    ```

## 1.4.8 / Wed Sep 18 2013

> 升级fis-kernel至v1.8.9

* 新增asp.NET体系下的文件识别
* 对于不是图片也也不是文本的文件设置useCompile为false
* 修复uglify插件报错不识别的bug

## 1.4.7 / Tue Sep 17 2013

> 升级fis-command-release至v0.8.9

* 修复超多文件时发布任务队列递归爆栈的bug

## 1.4.6 / Tue Sep 17 2013

> 升级fis-kernel至v1.8.8

* project配置节点支持include、exclude配置，用以排除项目中不是源码的文件。用法：

```javascript
//支持通配，请从项目根目录开始写起，如果配了include，则要发布的源码只匹配的文件。
fis.config.set('project.include', '/static/**');
//也支持正则
fis.confis.set('project.exclude', /\/_debug\//i);
```

## 1.4.5 / Tue Sep 17 2013

> 升级fis-postprocessor-jswrapper至v0.0.6

* 支持模板包装方式，配置为：

```javascript
//${content}作为源码替换的标记
fis.config.set('settings.postprocessor.jswrapper.tempalte', '!function(){${content}}();');
```

## 1.4.4 / Sun Sep 15 2013

> 升级fis-kernel至v1.8.7

* 修复utf8编码识别bug

## 1.4.3

> 剔除readme中的恶心品牌

## 1.4.2

> 升级fis-kernel至v1.8.6

* 文件对象添加useCache属性，默认值是 ``true``，如果设置为false，则不会对编译结果建立缓存。例如：

```javascript
fis.config.set('roadmap.path', [
    {
        reg : '**.oncache.js',
        useCache : false
    }
]);
```

## 1.4.1

> 升级commander至v1.3.2

## 1.4.0

> 升级fis-kernel至v1.8.5

* 将postpackager插件的调用时机提到map.json文件创建之前，如果有在postpackager插件中处理map.json的地方， ``请谨慎升级这个版本``

## 1.3.9

> 升级fis-spriter-csssprites至v0.1.3

* 修复找不到图片时csssprite的替换处理操作，提升运行性能

## 1.3.8

> 升级fis-optimizer-uglify-js至v0.1.0

* 升级fis-optimizer-uglify-js依赖的压缩工具uglify-js至v2.4.0

## 1.3.7

> 升级fis-command-release至v0.8.8

* 升级chokidar依赖到最新版的0.6.3，使用后台运行watch

## 1.3.6

> 升级fis-command-server至v0.6.4

* 支持jsp解析

## 1.3.5

> 1.3.4因为npm的问题不能发布，额外发布一个新版本

## 1.3.4

> 升级colors至v0.6.2

* 使用原版的colors，不再使用fix的版本

## 1.3.3

> 升级fis-command-server至v0.6.3

* 支持没有php-cgi环境时，server启动一个简单的静态资源服务器

## 1.3.2

> 升级fis-command-server至v0.6.2

* 修复gnome下不能打开目录的bug

## 1.3.1

> 升级fis-kernel至v1.8.4

* 修复html中使用 &lt;link href="xx.css?__inline"/&gt; 嵌入时的编译bug

## 1.3.0

> 升级fis-kernel至v1.8.3

* 完善核心的报错信息
* 在类html文件中使用link标签嵌入资源可以保留link标签上的属性给编译后的style标签。例如：

    ```html
    <link rel="stylesheet" type="text/css" href="pdf.css?__inline" media="print" data-test="msg">
    ```
    
    编译后得到

    ```html
    <style type="text/css" media="print" data-test="msg">...</style>
    ```

## 1.2.9
> 升级fis-spriter-csssprites至v0.1.2
>
> 升级fis-optimizer-png-compressor至v0.0.2

* PNG压缩工具支持Windows X64（64位node）
* csssprites支持Windows X64（64位node）

## 1.2.8

> 升级fis-command-release至v0.8.7

* 将--debug参数修改为--verbose

## 1.2.7

> 升级fis-postprocessor-jswrapper至v0.0.5

* 如果文件已经自己手写了define，则不对其进行强制包装

## 1.2.6

* 默认配置开启csssprites

## 1.2.5

> 正式集成 [fis-spriter-csssprites](https://github.com/xiangshouding/fis-spriter-csssprites)

## 1.2.4

> 升级fis-kernel至v1.8.2
>
> 删除对 fis-optimizer-html-minifier 的依赖， 不再压缩html

* 区分script标签的type属性，如果有type属性，而且属性值不为text/javascript，则当做html处理
* 从核心中剔除html压缩工具，理由是：
    1. 收益非常非常小。大多数产品线线上都开启了gzip，线下压缩相当多余，最后送达到用户浏览器的html大小没差别
    1. 各种压缩选项非常危险。比如 ``removeRedundantAttributes`` 会删除 &lt;input type="text"&gt; 元素的type属性，虽然逻辑上是等价的，但是会导致有些css属性选择器失效
    1. ``removeCDATASectionsFromCDATA`` 压缩选项有bug，如下html：
        
        ```html
        <script type="text/template">a<!--div--></script>
        ```
        
        压缩完得到：
        
        ```html
        <script type=text/template>a<!--div</script>
        ```
    1. 就算所有压缩选项都关闭，只保留空格压缩选项，也有问题。删除空格后会影响元素间距，这会给平时开发带来困扰，因为平时开发fis release通常不会加 ``--optimize`` 参数，等到上线才会加上，一旦加上，却和开发中的效果不一致，这是非常郁闷的。
    1. 对于特别留恋html-minifier的同学，不要桑心，它还在npm上，只是不是fis内核提供而已，要想使用它，你需要：
        
        ```bash
        # 安装它
        npm install -g fis-optimizer-html-minifier
        ```
        
        再在项目的配置文件里使用它就可以了：
        
        ```javascript
        fis.config.set('modules.optimizer.html', 'html-minifier');
        ```

## 1.2.3

> 升级fis-kernel至v1.8.1
>
> 升级fis-optimizer-html-minifier至v0.0.6

* 修复roadmap.path的release中出现多个'//'的时候被替换为空字符串的bug
* 修改html压缩器的默认配置，不移除多余属性，因为这些属性可能是css选择器需要的

## 1.2.2

> 升级fis-kernel至v1.8.0

* fis.compile方法支持对不存在的文件对象进行编译，不过没有缓存

## 1.2.1

    使用fis-optimizer-png-compressor作为png图片压缩插件

* 图片压缩支持pngcrush和pngquant压缩器选择，默认为pngcrush，如果要切换为pngquant，可在配置文件中设置：

    ```javascript
    fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');
    ```
    
    或者：
    
    ```javascript
    fis.config.merge({
        settings : {
            optimizer : {
                'png-compressor' : {
                    type : 'pngquant' //default is pngcrush
                }
            }
        }
    });
    ```
    
    pngcrush压缩会保持原来的色彩位数，如果原图片的色彩超过256色，在ie6下背景无法透明，会出现灰色的填充色背景。pngquant会强制把各种png图片压缩为png8格式，因此对于png24的图片压缩后会出现一定的质量折损（基本都是可以接受的），对于需要兼容ie6的产品线推荐使用pngquant作为压缩器。

## 1.2.0

> 升级fis-optimizer-pngcrush至v0.0.6

* 修复小于1k的png图片压缩bug

## 1.1.9

> 升级fis-kernel至v1.7.9

* 支持roadmap.path配置指定文件不经过编译处理，例：

    ```javascript
    fis.config.merge({
        roadmap : {
            path : [
                {
                    reg : '**.js',      //所有的js文件
                    useCompile : false  //不要经过编译处理
                }
            ]
        }
    });
    ```

## 1.1.8

> 升级fis-command-release至v0.8.6

* deploy支持 ``subOnly`` 参数，支持只发布子目录的需求，例如：

    ```javascript
    fis.config.merge({
        deploy : {
            local : {
                from : '/static',
                to : '../output'
            }
        }
    });
    ```
    
    如果执行 fis release -d ``local``，则把编译后的 ``/static`` 目录复制到 ``../output`` 中，得到 ``../output/static``，添加 ``subOnly`` 参数后：

    ```javascript
    fis.config.merge({
        deploy : {
            local : {
                from : '/static',
                to : '../output',
                subOnly : true
            }
        }
    });
    ```
    
    如果执行 fis release -d ``local``，则把编译后的/static的 ``子目录`` 复制到 ``../output`` 中，得到 ``../output/**``

## 1.1.7

> 升级fis-kernel至v1.7.8
>
> 升级fis-command-release至v0.8.5

* 允许没有pack配置仍然进入打包逻辑
* 修复打包处理阶段不能修改内容的bug
* .ico文件默认不做hash输出

## 1.1.6

> 升级fis-optimizer-pngcrush至v0.0.6

* 修复pngcrush压缩压缩时图片不是png格式的bug

## 1.1.5

> 升级fis-optimizer-clean-css至v0.0.8
> 升级fis-optimizer-pngcrush至v0.0.4

* 升级clean-css依赖的版本至v1.0.12，并且不允许clean-css处理@import标记，由fis接管
* 升级node-pngcrush版本至v0.0.6，超强的压缩效果

## 1.1.3

> 升级fis-kernel至v1.7.7

* 修复无后缀文件的处理失败的bug

## 1.1.2

> 升级fis-command-server至v0.6.1

* 采用spawn的detached参数技术替代实现nohup功能

## 1.1.1

> 升级fis-packager-map至v0.0.7

* 修复打包配置不支持单独的正则bug

## 1.1.0

> 内置fis-optimizer-pngcrush插件

* 推出png图片自动压缩功能

## 1.0.10

> 升级fis-kernel至v1.7.5

* 修复文本文件缓存处理bug

## 1.0.9

> 升级fis-kernel至v1.7.4
>
> 升级fis-command-release至v0.8.4

* 支持对图片进行pipe处理和缓存控制，为图片压缩做准备
* 修复新建文件没有添加文件监听的bug

## 1.0.8

> 升级fis-kernel至v1.7.3

* 修复fis.util.clone的bug

## 1.0.7

> 升级fis-kernel至v1.7.2
>
> 升级fis-command-release至v0.8.3
>
> 升级fis-packager-map至v0.0.6

* 自动上传限制了并发数，一次最多只开启5个并发的上传请求
* 调整了打包策略，例如：

    ```javascript
    fis.config.merge({
        pack : {
            'static/pkg/ui.js' : ['widget/**.js', 'components/**.js'],
            'static/pkg/others.js' : '**.js'
        }
    });
    ```
    
    如果在项目中，有a.js依赖了widget/b.js的话，在 ``1.0.6`` 或以前版本，会在吧 ``a.js`` 合并到 ``others.js`` 的时候，就近将 ``widget/b.js`` 也并入到 ``others.js``(很明显，widget/b.js也符合others.js包的合并约束条件) 。1.0.7以后，将不会做这样的处理，而将 ``widget/a.js`` 合入到 ``ui.js`` 中。

## 1.0.6

> 升级fis-kernel至v1.7.1

* roadmap.path支持使用 ``useMap`` 指定文件是否入map.json表。用法：

    ```javascript
    fis.config.merge({
        roadmap : {
            path : [
                {
                    reg : '**.png',
                    useMap : true
                },
                {
                    reg : 'test/**',
                    useMap : false
                }
            ]
        }
    });
    ```

## 1.0.5

> 升级fis-kernel至v1.7.0
>
> 升级fis-packager-map至v0.0.5

* 用户可以使用namespaceConnector配置节点来定义命名空间连接符，默认为“:”。用法：

    ```javascript
    fis.config.merge({
        namespace : 'common',
        namespaceConnector : '/'
    });
    ```
