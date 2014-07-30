define('main', function(require, exports, module){

var Backbone, Workspace, app;

Backbone = require('backbone');

Backbone.$ = require('jquery');

app = require('views/app');

Workspace = require('routers/router');

new Workspace();

Backbone.history.start();

new app();

var i = 2;
do{

}while (i--); return 1;


});

var img =__uri('/lib/bg.png');
var css =__uri('/lib/base.css');
var js =__uri('/modules/views/app.js');
__inline('/lib/demo.js');
var img =__inline('/lib/logo.gif');