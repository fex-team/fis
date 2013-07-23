## 1.1.3

    升级fis-kernel至v1.7.7

* 修复无后缀文件的处理失败的bug

## 1.1.2

    升级fis-command-server至v0.6.1

* 采用spawn的detached参数技术替代实现nohup功能

## 1.1.1

    升级fis-packager-map至v0.0.7

* 修复打包配置不支持单独的正则bug

## 1.1.0

    内置fis-optimizer-pngcrush插件

* 推出png图片自动压缩功能

## 1.0.10

    升级fis-kernel至v1.7.5

* 修复文本文件缓存处理bug

## 1.0.9

    升级fis-kernel至v1.7.4
    升级fis-command-release至v0.8.4

* 支持对图片进行pipe处理和缓存控制，为图片压缩做准备
* 修复新建文件没有添加文件监听的bug

## 1.0.8

    升级fis-kernel至v1.7.3

* 修复fis.util.clone的bug

## 1.0.7

    升级fis-kernel至v1.7.2
    升级fis-command-release至v0.8.3
    升级fis-packager-map至v0.0.6

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

    升级fis-kernel至v1.7.1

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

    升级fis-kernel至v1.7.0
    升级fis-packager-map至v0.0.5

* 用户可以使用namespaceConnector配置节点来定义命名空间连接符，默认为“:”。用法：

    ```javascript
    fis.config.merge({
        namespace : 'common',
        namespaceConnector : '/'
    });
    ```