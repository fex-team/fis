define('models/todo', function(require, exports, module){

var Backbone = require('backbone');
var TodoModel = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	},

	toggle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}
});

module.exports = TodoModel;

});