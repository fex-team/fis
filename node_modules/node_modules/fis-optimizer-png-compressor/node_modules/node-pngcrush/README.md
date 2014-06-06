##node-pngcrush
[![NPM version](https://badge.fury.io/js/node-pngcrush.png)](http://badge.fury.io/js/node-pngcrush)

node-pngcrush是一个node的插件，它把pngcrush内嵌到了插件中，而不是调用命令行的方式，提升处理速率，有效的省去了调用外部程序产生的时间开销。

##安装

    npm install -g node-pngcrush

##使用

```javascript

var C = require('node-pngcrush');

fs.readFile('./alphatest.png', function (err, data) {
  if (err) throw err;
  var buffer = C.compress(data);
  fs.writeFile('./alphatest_out.png', buffer, {
      flags: 'wb'
  }, function(err){});
});


```
