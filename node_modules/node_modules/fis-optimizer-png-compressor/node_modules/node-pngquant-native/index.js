var _handle = require('./binding.js');

function Pngquant() {
    this.params = '';
}

Pngquant.prototype = {
    option: function (opt) {
        opt = opt || {};
        opt.filename = opt.filename || 'stdin.png';
        if (opt.params) {
            this.params = opt.params + ' ' + opt.filename;
        } else {
            var toString = Object.prototype.toString;
            var params = [];
            for (var p in opt) {
                if (opt.hasOwnProperty(p)) {
                    switch(p) {
                        case 'quality':
                            var quality = opt[p];

                            if (toString.call(quality) == '[object Array]') {
                                var l = parseInt(quality[0]), h = parseInt(quality[1]);
                                if (l < 0) {
                                    l = 0;
                                }
                                
                                if (h > 100) {
                                    h = 100;
                                }
                                params.push('--quality=' + l + '-' + h)
                            }
                            break;
                        case 'speed':
                            var speed = parseInt(opt[p]);
                            if (!speed) speed = 1;
                            params.push('--speed='+speed);

                            break;
                        case 'iebug':
                            if (opt[p]) {
                                params.push('--iebug');
                            }
                            break;
                    }
                }
            }
            this.params = params.join(' ') + ' ' + opt.filename;
        }
        return this;
    },

    compress: function(buffer, opt, cb) {
        cb = cb || function() {};
        if (Object.prototype.toString.call(opt) == '[object Function]') {
            cb = opt;
        } else {
            this.option(opt);
        }
        var handle = new _handle.Pngquant();
        out = handle.compress(buffer, this.params, cb);
        return out;
    }
};

module.exports = new Pngquant;
