## node-pngquant-native
[![NPM version](https://badge.fury.io/js/node-pngquant-native.png)](http://badge.fury.io/js/node-pngquant-native)

node-pngquant-native is an addon of node, support node version v0.8.0 to latest, It compress a `buffer` of `.png` image, so can't call other processes.

## install

    npm install -g node-pngquant-native
    

## make

if install fail for you. download the source install it.

1. clone source code

    ```bash
    $ git clone https://github.com/xiangshouding/node-pngquant-native.git
    ```

2. invoke `npm install -g .`

    ```bash
    $ cd node-pngquant-native
    $ npm install -g .
    ```

### require

+ make pngqunat, your compiler must support C99
+ install `node-gyp`, you can see detail information [https://github.com/TooTallNate/node-gyp#installation](https://github.com/TooTallNate/node-gyp#installation)
+ For WINDOWS user, please clone branch `win32`, because VS not support C99.

## use

```javascript

var pngquant = require('node-pngquant-native');

fs.readFile('./alphatest.png', function (err, buffer) {
  if (err) throw err;
  var resBuffer = pngquant.compress(buffer, {
    "speed": 1 //1 ~ 11
  });

  fs.writeFile('./alphatest_out.png', resBuffer, {
      flags: 'wb'
  }, function(err){});
});

```

## Api

### pngquant.`compress(buffer, option)`

```javascript
var pngquant = require('node-pngquant-native')
var option = {
    speed: 11
    //...    
}

var resBuffer = pngquant.compress(buffer, option);

```
#### option

+ option.`speed` 

    Speed/quality trade-off from 1 (brute-force) to 11 (fastest). The default is 3. Speed 10 has 5% lower quality, but is 8 times faster than the default. Speed 11 disables dithering and lowers compression level.

    ```javascript
    var opt = {
        speed: 11
    }
    ```

+ option.`quality = [min, max]`

    min and max are numbers in range 0 (worst) to 100 (perfect), similar to JPEG. pngquant will use the least amount of colors required to meet or exceed the max quality. If conversion results in quality below the min quality the image won't be saved (if outputting to stdin, 24-bit original will be output) and pngquant will exit with status code 99.

    ```javascript
    var opt = {
        quality: [40, 60]
    }
    ```

+ option.`iebug`
    
    Workaround for IE6, which only displays fully opaque pixels. pngquant will make almost-opaque pixels fully opaque and will avoid creating new transparent colors.

    ```javascript
    var opt = {
        iebug: true
    }
    ```
