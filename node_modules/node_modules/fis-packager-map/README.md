# fis-packager-map

A packager plugin for fis to pack resources.


## settings

    $ vi path/to/project/fis-conf.js

```javascript
fis.config.merge({
    pack : {
        'aio.js' : ['widget/**.js', /^\/components\/.*\.js$/i],
        'aio.css' : '**.css'
    }
});
```