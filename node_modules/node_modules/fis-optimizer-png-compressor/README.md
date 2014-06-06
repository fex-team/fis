# fis-optimizer-png-compressor

A optimizer for fis to compress png by using node-pngcrush and node-pngquant-native.

## settings

```javascript
//file : path/to/project/fis-conf.js
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

    $ fis release --optimizer --dest ../output