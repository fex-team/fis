## 1.9.44 / Thu Feb 25 2016

- 升级依赖中多个二进制插件版本选择错误的版本修复。

## 1.9.38 / Mon Nov 16 2015
- 更新 node 4.x 支持
- 更新 fis-kernel 解决编译机并发编译问题。

## 1.9.34 / Sat Oct 10 2015

- 更新 fis-optimizer-uglify-js，支持sourcemap 文件 domain 设置。

## 1.9.33 / Tue Aug 21 2015

- hotfix [fex-team/fis#646](https://github.com/fex-team/fis/issues/646)

## 1.9.32 / Tue Aug 18 2015

- 升级 fis-optimizer-uglify-js, 修复 uglify 报错时的提示错误。

## 1.9.31 / Wed Jul 29 2015

- 升级 fis-optimizer-uglify-js, 优化 sourcemap

## 1.9.30 / Wed Jul 22 2015

- 升级 fis-command-install 通过镜像下载 fis-components。

## 1.9.29 / Wed Jul 08 2015

> 升级 fis-command-install，解决 component.json 可能被替换成 0 的问题。

## 1.9.28 / Mon Jun 15 2015

> 升级 fis-command-release 解决 watch 时文件夹被删的 bug.

## 1.9.27 / Thu Jun 11 2015

> 升级 fis-kernel 至 v2.0.17 <br>
> 升级 fis-commond-release 至 v0.12.1

- 修复 Bug [#530](https://github.com/fex-team/fis/issues/530)
    - 缓存 File 对象导致的 watch 两次相互影响的问题

## 1.9.26 / Mon Jun 08 2015

> 升级 fis-command-release 至 v0.12.0 <br>
> 升级 fis-kernel 至 v2.0.16

- 修复 Bug #455
- 修复 Bug #527
- project.exclude & project.include 过滤条件也在 watch 时能正常工作
- 固定 fis-command-install 的版本号
- 支持 img `srcset`


## 1.9.24 / Tue May 26 2015

> 升级 fis-kenerl 至 v2.0.15

## 1.9.21 / Wed May 13 2015

> 升级 fis-command-server至v0.7.5

- 本地调试支持https服务器

## 1.9.20 / Wed May 13 2015

> 升级 fis-postprocessor-jswrapper至v0.0.12

- 恢复原有 `define` 包裹逻辑，防止现有代码异常

## 1.9.19 / Tue May 12 2015

> 升级 fis-optimizer-png-compressor至v0.1.0

> 升级 fis-spriter-csssprites至v0.3.0

- 禁止 png 图片压缩时 `libpng` warning 信息输出 (非 Windows 环境)
- 提升 Linux x64 上的图片压缩的稳定性，提升 csssprites 的稳定性
- 提供 Linux / Unix 系统下手动编译依赖图形工具的[教程]()及其[编译脚本](https://github.com/xiangshouding/some-scripts/blob/master/install-fis-image-deps.sh)，以防某些系统由于 glibc 版本过低导致已提供二进制扩展无法加载时方便修复；

## 1.9.18 / Wed May 06 2015

> 升级 fis-command-server至v1.7.4

> 升级 fis-deploy-default至v0.0.6

> 升级 fis-postprocessor-jswrapper至v0.0.11

- 修正 `fis server {open|clean}`, `fis release -d preview` 服务器 root 一致性问题；

    当用户 `fis server start --root=<root>` 设定了某一个目录为服务器 root，那么后续执行
    `fis server open`、`fis server clean`、`fis release` 的时候都会操作这个目录。这个 root
     信息会被保存，现在未提供**重置**的接口。

- 修正 jswrapper 如果一个文件已经 define 的情况下仍然去做 define 的问题
- 更新了所有依赖的代码，可方便在 fis 仓库查看 fis 依赖的核心代码。

## 1.9.16 / Wed Apr 29 2015

> 升级 fis-preprocessor-components 到 0.1.18

- 支持 `paths` 设置

## 1.9.13 / Fri Apr 10 2015


> 升级 fis-command-server至v1.7.3

- 提升 node 服务稳定性

## 1.9.12 / Thu Apr 09 2015

> 升级 fis-preprocessor-components 到 0.1.16

## 1.9.11 / Wed Mar 25 2015

> 升级 fis-optimizer-uglify-js 到 0.1.7

## 1.9.10 / Mon Mar 17 2015

- bugfix
    - 由于调用 chdir 导致的产出目录工作异常的问题
    - 修复由于文件结尾注释导致的 jswrapper 失效问题

## 1.9.8 / Mon Mar 16 2015

- 支持 node 0.12.0
    - *Linux 32* 还未支持，欢迎PR，详细参考 #331

## 1.9.5 / Mon Feb 09 2015

hotfix

## 1.9.4 / Mon Feb 02 2015

> 升级fis-command-release至v0.11.4

- 修复`-m 2`无法保留不带md5文件的问题


## 1.9.3 / Wed Jan 28 2015

添加 fis-prepackager-derived 插件，允许编译期派生出新文件来。

## 1.9.1 / Mon Jan 12 2015

> 添加[组件生态](https://github.com/fis-components/components)功能。

## 1.8.13 / Tue Dec 31 2014

> hotfix

> 升级fis-kernel至v2.0.12

## 1.8.12 / Tue Dec 30 2014

> hotfix

> 升级fis-kernel至v2.0.11

## 1.8.11 / Tue Dec 30 2014

> 彻底排除文件以优化性能

> 升级fis-kernel至v2.0.10

## 1.8.10 / Tue Dec 16 2014

> colors也有问题，已提交[PR](https://github.com/Marak/colors.js/issues/90)，等更新升级

> 升级fis-deploy-default至v0.0.2

## 1.8.9 / Tue Dec 16 2014

> commander恢复原来的版本，新版本修改了某些特性，后续再跟进升级

## 1.8.8 / Tue Dec 16 2014

> 升级fis-command-server至v1.7.1

> 升级colors至v1.0.3

> 升级commander至v2.5.1

> 升级fis-optimizer-uglify-js至v0.1.6，升级uglify-js到2.4.15

## 1.8.7 / Tue Nov 18 2014

回滚 fis-command-server, 待进一步测试。

## 1.8.6 / Tue Nov 18 2014

升级 fis-command-server 至 0.7.0

    merge 此次修改 https://github.com/fex-team/fis-command-server/pull/5

## 1.8.5 / Tue Oct 29 2014

升级 fis-command-release 至 0.11.3

    处理 GBK 编码BUG

## 1.8.4 / Tue Oct 28 2014

升级 fis-command-release 至 0.11.2

    添加fis-deploy-default默认配置

## 1.8.2 / Mon Oct 20 2014

HOTFIX

    修复fis-command-release堆栈溢出问题

## 1.8.0 / Fri Oct 17 2014

升级 fis-command-release 至 0.11.0

    deploy阶段支持插件扩展

    修复若干BUG

修复watch失效BUG

添加project.watch.usePolling配置

## 1.7.22 / Mon Oct 13 2014

升级 fis-optimizer-uglify-js 至 0.1.5

    添加开关 sourcemap

## 1.7.21 / Sat Oct 11 2014

升级 fis-optimizer-uglify-js 至 0.1.4
直接内嵌源码到 sourcemap

## 1.7.18 - 1.7.20 / Fri Oct 10 2014

升级 fis-optimizer-uglify-js 至 0.1.3

## 1.7.17 / Mon Sep 15 2014

修复`project.exclude`的文件，在扫描文件的时候依然被处理的问题


> 升级fis-command-release至v0.9.10

> 升级fis-kernel至v2.0.9

## 1.7.16 / Fri Aug 29 2014

hotfix

## 1.7.15 / Thu Aug 21 2014

修复若干bug

> 升级fis-command-server至v0.6.12

> 升级fis-optimizer-png-compressor至v0.0.6

> 升级fis-spriter-csssprites至v0.2.5

> 升级fis-kernel至v2.0.7

## 1.7.14 / Tue Jul 02 2014

hotfix 缓存依赖更新失效问题

bugfix 由于node更改normalize接口导致路径匹配错误bug

## 1.7.13 / Tue Jul 01 2014

> 升级fis-command-server至v0.6.10

> 升级fis-kernel至v2.0.4

bugfix #94

## 1.7.12 / Thu Jun 05 2014

> clean-css 有bug，降级到1.x版本

## 1.7.11 / Wed Jun 04 2014

> 升级fis-optimizer-clean-css至v0.0.10

> 升级fis-optimizer-uglify-js至v0.1.2

+ uglifyjs升级至v2.4.13
+ clean-css升级至v2.1.8

## 1.7.10 / Wed Jun 04 2014

> 升级fis-optimizer-png-compressor至v0.0.5

## 1.7.9 / Mon May 12 2014

> 升级fis-spriter-csssprites至v0.2.3

> 升级fis-optimizer-png-compressor至v0.0.4

* [feature] csssprites支持background-size

    background-size 只支持图片同倍率缩小或者放大；scale < 1缩小, scale > 1放大；其配置如下，当设置scale时，不需要给每一个规则都写上background-size，csssprites会根据scale产出正确的结果。

    ```javascript
    fis.config.set('settings.spriter.csssprites', {
        scale: 0.5
    });
    ```

## 1.7.8 / Tue Apr 22 2014

> 升级fis-kernel至v2.0.3

[feature] 将jsx、styl纳入默认识别的文件中

* jsx
        isText: true
        isJsLike: true
        mime: text/javascript
* style
         isText: true
         isCssLike: true
         mime: text/css

## 1.7.7 / Wed Apr 16 2014

> 升级fis-kernel至v2.0.2

> 升级fis-spriter-csssprites至v0.2.0

* [bugfix] 单机多用户编译缓存冲突bug
* [bugfix] csssprites 合并后css一个规则有太多selector导致在ie6下失效的bug

## 1.7.4 / Mon Mar 24 2014

> 升级fis-spriter-csssprites至v0.1.9

> 升级fis-command-release至v0.9.7

> 升级fis-command-server至v0.6.9

* 启动node服务器时，在document_root执行`npm install`安装依赖
* 添加<!--livereload-->注释语法，当`release -L`时替换为livereload.js的链接，这样就不需要安装浏览器插件了。

    **注意：如果页面有`</body>`标签，就不需要再在页面使用`<!--livereload-->`了。因为它跟`</body>`起到相同的作用。这个功能主要提供给那些包装了`body`标签的解决方案使用。**

## 1.7.3 / Sat Mar 01 2014

> 升级fis-spriter-csssprites至v0.1.8

* 添加对内联css的支持

    ```javascript
    fis.config.set('settings.spriter.csssprites', {
        //开启模板内联css处理,默认关闭
        htmlUseSprite: true,
        //默认针对html原生<style></style>标签内的内容处理。
        //用户可以通过配置styleTag来扩展要识别的css片段
        //以下是默认<style></style>标签的匹配正则
        styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig

        //**styleReg规则**
        //1. 默认不配置styleReg，仅支持html中默认style标签中的css内容
        //2. 配置styleReg时候，仅支持styleReg匹配到的内容。
        //3. styleReg正则必须捕获三个分组，
        //     $1为：开始标签（start tag），
        //     $2为：内容(content) ,
        //     $3为：结束标签(end tag)
    });
    ```

## 1.7.2 / Wed Feb 26 2014

> 升级fis-command-release至v0.9.6

* 修复fis-conf.js中配置了livereload监听端口和hostname，但是发布的文件添加livereload.js脚本的url地址引用错误的bug。 感谢来自 [@qdsang](https://github.com/qdsang) 的贡献 [pull#2](https://github.com/fis-dev/fis-command-release/pull/2)

## 1.7.1 / Tue Feb 18 2014

> 升级fis-kernel至2.0.0

* 内核支持事件监听和派发（仅增加接口，尚未派发任何事件）：

    ```javascript
    fis.emitter.on('compile.optimier', function(file){
        //TODO
    });
    fis.emitter.emit('release', file);
    ```

* 支持多种前缀的插件调用

    ```javascript
    fis.require.prefixes = [ 'your_package_name', 'fis' ];
    ```

    配置后，fis会优先尝试加载 ``your_package_name-xxx`` 插件，后尝试加载 ``fis-xxx`` 插件，此功能用于fis的包装产品中。

* 包装器负责指定 ``--help`` 需要显示帮助的命令，例如：

    ```javascript
    fis.cli.help.commands = [ 'release', 'server', 'install' ];
    ```

## 1.6.8 / Wed Feb 12 2014

> 升级fis-command-release至0.9.5

* 修复mac系统下livereload报错的bug

## 1.6.7 / Wed Feb 12 2014

> 升级fis-kernel至v1.9.9

* 修复html的script标签中js嵌入其他非js的文本文件时结果不是字符串的bug

## 1.6.6 / Sun Jan 26 2014

> 升级fis-kernel至v1.9.8

* 支持html中的source标签相关资源定位和嵌入功能

## 1.6.5 / Wed Jan 22 2014

> 升级fis-kernel至v1.9.7

* 在html中支持使用&lt;link rel="import" href="xxx?__inline"&gt;来嵌入资源，参考w3c [html imports](http://www.w3.org/TR/2013/WD-html-imports-20130514/)

## 1.6.4 / Sun Jan 19 2014

> 升级fis-kernel至v1.9.6

* 只允许rel属性为 ``stylesheet`` 的link标签，在inline的时候内嵌为style标签，例如：

    * v1.6.3或之前

        - 源码：

        ```html
        <link rel="stylesheet" href="xxx?__inline"/>
        <link rel="abc" href="xxx?__inline"/>
        <link href="xxx?__inline"/>
        ```

        - 编译后（未考虑rel属性） ：

        ```html
        <link rel="stylesheet" href="xxx?__inline"/>
        <link rel="abc" href="xxx?__inline"/>
        <link href="xxx?__inline"/>
        ```

    * v1.6.4之后

        - 源码：

        ```html
        <link rel="stylesheet" href="xxx?__inline"/>
        <link rel="abc" href="xxx?__inline"/>
        <link href="xxx?__inline"/>
        ```

        - 编译后（仅对rel属性为stylesheet的link标签有效）：

        ```html
        <style>xxx的内容</style>
        <link rel="abc" href="/url/of/xxx?__inline"/>
        <link href="/url/of/xxx?__inline"/>
        ```

    * 之所以这样修改，是因为link标签不仅仅是css外联标签，还包括很多其他资源，延伸阅读请参考 [link类别](http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#linkTypes)

## 1.6.3 / Thu Jan 01 2014

> 升级fis-kernel至v1.9.5

* 文件useCompile为false的文本文件依旧支持编码转换和deploy的字符串替换

## 1.6.2 / Thu Jan 01 2014

> 升级fis-command-server至v.0.6.8

* 新增nodejs版本server支持
* 合并--no-rewrite和--script参数，为--rewrite [script]参数
* 支持fis的包装版本在配置中指定server的各项参数


## 1.6.1 / Thu Dec 12 2013

> 升级fis-kernel至v1.9.3

* roadmap.path支持useParser，usePreprocessor，useStandard，usePostprocessor，useLint，useTest，useOptimizer属性，用以细粒度控制编译过程

## 1.6.0 / Tue Dec 03 2013

> 升级fis-spriter-csssprites至v0.1.7

* 修复图片使用query时不能合并csssprite的bug
* 新增矩阵布局算法，配置方法：

    ```javascript
    //此配置的默认值是'linear'，线性布局
    fis.config.set('settings.spriter.csssprites.layout', 'matrix');
    ```

> 升级fis-optimizer-clean-css至v0.0.9

* 升级依赖的clean-css包至v1.1.7

> 升级fis-optimizer-uglify-js至v0.1.1

* 升级依赖的uglify-js包至v2.4.6

> 升级fis-command-release至v0.9.4
>
> 升级fis-command-server至v0.6.7

* 不同的解决方案使用不同的缓存目录，彼此不会干扰
* 支持从环境变量中读取 ``FIS_SERVER_DOCUMENT_ROOT`` 变量作为server的文档根目录

> 升级fis-kernel至v1.9.2

* 支持从环境变量中读取 ``FIS_TEMP_DIR`` 变量作为fis的缓存目录
* 不同的解决方案使用不同的缓存目录，彼此不会干扰

> 升级fis-packager-map至v0.0.9

* 修复资源不入表时打包引用会访问的bug

## 1.5.6 / Wed Nov 06 2013

> 升级fis-kernel至v1.9.0

    注意，这可能是一个需要注意的升级，有一定的兼容性问题。

* 在js中使用__inline()语法来嵌入资源时，如果被嵌入的文件是一个 ``文本文件``，并且文件的 ``isJsLike`` 不为true的话，则会把文件以字符串的形式嵌入到js中。比如：

    ```javascript
    __inline('a.js');                //embed another js file
    var html = __inline('a.html');   //embed html content
    var css = __inline('a.css');     //embed css content
    var txt = __inline('a.txt');     //embed text content
    var img = __inline('a.png');     //embed image
    ```

    编译后得到：

    ```javascript
    alert('this is content of a.js');                //embed another js file
    var html = "<h1>the content of a.html</h1>";   //embed html content
    var css = "body{\n    color: red;\n}";     //embed css content
    var txt = "hello world\nthis is the content of a.txt";     //embed text content
    var img = 'data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7';     //embed image
    ```

    这种修改会 **影响到前端模板的个别使用情况**，你当前使用前端模板时，如果把模板文件的属性标记为 ``isHtmlLike`` 为 ``true`` 的话，会导致编译得到的模板函数变成了字符串插入到js中，请根据情况适当修改这样的配置，有问题可以在issues中留言。

* 添加 ``.vm`` 后缀为文本文件，并且 ``isHtmlLike`` 为true，vm文件是velocity模板引擎文件的常用后缀。

## 1.5.5 / Tue Nov 05 2013

> 升级fis-command-release至v0.9.3

* 修复fis release命令的 ``-r`` 参数指定了项目根目录之后读取配置文件路径错误的bug

## 1.5.4 / Tue Nov 05 2013

> 升级fis-command-release至v0.9.2

* 支持在deploy阶段给isHtmlLike文件的&lt;/body&gt;前自动插入livereload.js脚本，从而告别插件

## 1.5.3 / Thu Oct 31 2013

> 升级fis-kernel至v1.8.19
>
> 升级fis-postpreprocessor-jswrapper至v0.0.8

* 修复preprocessor插件中不能插入内置require语法的bug，内置编译语法被修改为&lt;&lt;&lt;require:path&gt;&gt;&gt;
* jswrapper插件支持template参数

## settings

    $ vi path/to/project/fis-conf.js

```javascript
fis.config.merge({
    settings : {
        postprocessor : {
            jswrapper : {
                template : 'define("${id}", function(require, exports, module){ ${content} });',
            }
        }
    }
});
```

## 1.5.2 / Thu Oct 24 2013

> 升级fis-kernel至v1.8.17

* 修复css中url(xxx )代码xx之后有空格的bug

## 1.5.1 / Thu Oct 24 2013

> 升级fis-command-release至v0.9.1

* 使用fork版的livereload-server

## 1.5.0 / Fri Oct 18 2013

> 升级fis-command-release至v0.9.0

* 支持发布前替换文本内容，例如：

```javascript
fis.config.set('deploy', {
    d1 : {
        to : '../output-1',
        replace : {
            from : 'http://www.online.com',
            to : 'http://www.offline.com'
        }
    },
    d2 : {
        to : '../output-2',
        replace : {
            from : /(http:\/\/www)\.online\.(com)/g,
            to : '$1.offline.$2'
        }
    }
});
```

## 1.4.19 / Thu Oct 10 2013

> 升级fis-command-release至v0.8.12

* 修复deploy的include、exclude匹配的是file.subpath的bug，应该是匹配file.release

## 1.4.18 / Thu Oct 10 2013

> 升级fis-packager-map至v0.0.8

* 打包css时删除多余的@charset标记。

## 1.4.17 / Sun Oct 06 2013

> 升级fis-kernel至v1.8.16

* 不强制map.json的useHash属性为false，交由roadmap.path配置决定。

## 1.4.16 / Mon Sep 30 2013

> 升级fis-kernel至v1.8.15

* 修复url中有hash路径时识别不到文件的bug

## 1.4.15 / Fri Sep 27 2013

> 升级fis-command-release至v0.8.11
>
> 升级fis-optimizer-png-compressor至v0.0.3
>
> 升级fis-spriter-csssprites至v0.1.4

* 修改 fis release ``-C`` &lt;path&gt; 参数为 fis release ``-f`` &lt;path&gt;
* 升级压缩器插件，减少文件体积，提升安装速度

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

* fis release 支持使用 ``-f`` 或者 ``--file`` 参数制定配置文件名称，默认是 ``fis-conf.js``，配置文件请尽量使用 ``fis-`` 作为文件名前缀，并放置到项目根目录下。例如：

    ```bash
    fis release --file fis-conf-dev.js
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
