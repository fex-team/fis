![fis logo](https://raw.githubusercontent.com/fouber/fis-wiki-img/master/logo.png)

[![NPM version](https://badge.fury.io/js/fis.png)](http://badge.fury.io/js/fis) [![Dependencies Status](https://david-dm.org/fex-team/fis.png)](https://david-dm.org/fex-team/fis)

[![NPM Download](https://nodei.co/npm-dl/fis.png?months=1)](https://www.npmjs.org/package/fis)

## Front-end Integrated Solution（前端集成解决方案）

[![Join the chat at https://gitter.im/fex-team/fis](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fex-team/fis?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> 解决前端工程的根本问题！

## F.I.S简介

* [什么是F.I.S](https://github.com/fis-dev/fis/wiki/什么是F.I.S)

欢迎访问[FIS官网](http://fis.baidu.com)获取最新的文档

同时我们在慕课网开通了[在线课程](http://www.imooc.com/learn/220)，欢迎大家访问

## 功能概述

* 跨平台支持win、mac、linux等系统
* 无内置规范，可配置 [开发和部署规范](https://github.com/fis-dev/fis/wiki/配置API#wiki-roadmappath)，用于满足任何前后端框架的部署需求
* 对html、js、css实现 [三种语言能力](https://github.com/fis-dev/fis/wiki/三种语言能力) 扩展，解决绝大多数前端构建问题
* 支持二次包装，比如 [spmx](https://github.com/fouber/spmx)、 [phiz](https://github.com/fouber/phiz/)、 [chassis](https://github.com/xspider/fis-chassis)，对fis进行包装后可内置新的插件、配置，从而打造属于你们团队的自己的开发工具
* 自动生成静态资源表关系表（map.json），可用于 [连接前后端开发框架](https://github.com/fis-dev/fis/wiki/基于map.json的前后端架构设计指导)
* 所有静态资源自动加 ``md5版本戳``，服务端可放心开启永久强缓存
* 支持给所有静态资源添加域名前缀
* 可灵活扩展的插件系统，支持对构建过程和命令功能进行扩展，现已发布N多 [插件](https://npmjs.org/search?q=fis)
* 通过插件配置可以在一个项目中无缝使用 [less](https://github.com/fouber/fis-parser-less)、[coffee](https://github.com/fouber/fis-parser-coffee-script)、[markdown](https://github.com/fouber/fis-parser-marked)、[jade](https://npmjs.org/package/fis-parser-jade)等语言开发
* 内置 [css sprites插件](https://github.com/fex-team/fis-spriter-csssprites)，简单易用
* 内置 [png图片压缩插件](https://github.com/fis-dev/fis-optimizer-png-compressor)，采用c++编写的node扩展，具有极高的性能，支持 [将png24压缩为png8](https://github.com/fis-dev/fis-optimizer-png-compressor)
* 内置本地开发调试服务器，支持完美运行 ``java``、``jsp``、``php`` 等服务端语言
* 支持文件监听，保存即发布
* 支持浏览器自动刷新，可同时刷新多个终端中的页面，配合文件监听功能可实现保存即刷新
* 支持上传到远端服务器，配合文件监听，浏览器自动刷新功能，可实现保存即增量编译上传，上传后即刷新的开发体验
* 超低学习成本，只须记忆 ``3`` 条命令即可完成开发
* 抹平编码差异，开发中无论是gbk、gb2312、utf8、utf8-bom等编码的文件，输出时都能统一指定为utf8无bom（默认）或者gbk文件

## 快速入门

* [基本使用](https://github.com/fex-team/fis/wiki/快速入门)
* [资源压缩](https://github.com/fex-team/fis/wiki/快速入门#资源压缩)
* [资源合并](https://github.com/fex-team/fis/wiki/快速入门#资源合并)
* [辅助开发](https://github.com/fex-team/fis/wiki/辅助开发)

## 语言能力

* [关于三种语言能力](https://github.com/fis-dev/fis/wiki/三种语言能力)
* [定位资源](https://github.com/fis-dev/fis/wiki/定位资源)
* [嵌入资源](https://github.com/fis-dev/fis/wiki/嵌入资源)
* [声明依赖](https://github.com/fis-dev/fis/wiki/声明依赖)

## 插件系统

* [编译过程运行原理](https://github.com/fis-dev/fis/wiki/运行原理)
* [插件调用机制](https://github.com/fis-dev/fis/wiki/插件调用机制)
* [插件扩展点](https://github.com/fis-dev/fis/wiki/插件扩展点列表)
* [插件列表](https://github.com/fis-dev/fis/wiki/插件列表)

## 配置文档

* [零配置](https://github.com/fis-dev/fis/wiki/配置API)
* [使用配置文件](https://github.com/fis-dev/fis/wiki/配置API)
* 系统配置
    * [project.charset](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectcharset)
    * [project.md5Length](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectmd5length)
    * [project.md5Connector](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectmd5connector)
    * [project.include](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectinclude)
    * [project.exclude](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectexclude)
    * [project.fileType.text](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectfiletypetext)
    * [project.fileType.image](https://github.com/fis-dev/fis/wiki/配置API#wiki-projectfiletypeimage)
* 插件配置
    * [modules.parser](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulesparser)
    * [modules.preprocessor](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulespreprocessor)
    * [modules.postprocessor](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulespostprocessor)
    * [modules.lint](https://github.com/fis-dev/fis/wiki/配置API#wiki-moduleslint)
    * [modules.test](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulestest)
    * [modules.optimizer](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulesoptimizer)
    * [modules.prepackager](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulesprepackager)
    * [modules.packager](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulespackager)
    * [modules.spriter](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulesspriter)
    * [modules.postpackager](https://github.com/fis-dev/fis/wiki/配置API#wiki-modulespostpackager)
    * [settings](https://github.com/fis-dev/fis/wiki/配置API#wiki-settings)
* 内置插件运行配置
    * [settings.postprocessor.jswrapper](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#settingspostprocessorjswrapper)
    * [settings.optimizer.uglify-js](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#settingsoptimizeruglify-js)
    * [settings.optimizer.clean-css](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#settingsoptimizerclean-css)
    * [settings.optimizer.png-compressor](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#settingsoptimizerpng-compressor)
    * [settings.spriter.csssprites](https://github.com/fis-dev/fis/wiki/%E9%85%8D%E7%BD%AEAPI#settingsspritercsssprites)
* 目录规范与域名配置
    * [roadmap.path](https://github.com/fis-dev/fis/wiki/配置API#wiki-roadmappath)
    * [roadmap.ext](https://github.com/fis-dev/fis/wiki/配置API#wiki-roadmapext)
    * [roadmap.domain](https://github.com/fis-dev/fis/wiki/配置API#wiki-roadmapdomain)
    * [roadmap.domain.image](https://github.com/fis-dev/fis/wiki/配置API#wiki-roadmapdomainimage)
* 部署配置
    * [deploy](https://github.com/fis-dev/fis/wiki/配置API#wiki-deploy)
* 打包配置
    * [pack](https://github.com/fis-dev/fis/wiki/配置API#wiki-pack)

## 高级使用

* [基于map.json的前后端架构设计指导](https://github.com/fis-dev/fis/wiki/基于map.json的前后端架构设计指导)

## 更多资料

* [fistool](https://github.com/kaven85/fistool) 可视化界面工具
* [gois](https://github.com/xiangshouding/gois) go语言组件化解决方案
* [phiz](https://github.com/fouber/phiz/) PHP组件化解决方案
* [spmx](https://github.com/fouber/spmx) 通过包装fis得到适应seajs架构的集成解决方案
* [sublime plugin](https://github.com/yuanfang829/fis-sublime-command) 支持FIS编译的sublime插件，可以替代watch功能
