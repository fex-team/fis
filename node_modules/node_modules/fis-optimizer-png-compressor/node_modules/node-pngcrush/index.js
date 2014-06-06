var _handle = require('./binding.js');

function PngCompress(buffer) {
    this._option = '';
    this._callback = function() {};
    this._handle = new _handle.PngCompress();
}

PngCompress.prototype = {
    option: function (opt) {
        if (opt.params) {
            opt = opt.filename ? opt.params + ' ' + opt.filename : opt.params;
        } else {
            opt = opt.filename || '';
        }
        this._option = opt;
        return this;
    },
    compress: function(buffer, cb) {
        if (cb) this._callback = cb;
        out = this._handle.compress(buffer, this._option, this._callback);
        return out;
    }
};

module.exports = new PngCompress;