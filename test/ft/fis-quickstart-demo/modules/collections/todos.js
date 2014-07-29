define('collections/todos', function(require, exports, module){

var Backbone, TodoModel, TodosCollection;

Backbone = require('backbone');
require('vendor/backbone.localStorage');

var $ = require('jquery');
var _ = require('underscore');

TodoModel = require('models/todo');

TodosCollection = Backbone.Collection.extend({
	model: TodoModel,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	completed: function () {
		return this.filter(function (todo) {
			return todo.get('completed');
		});
	},

	remaining: function () {
		return this.without.apply(this, this.completed());
	},

	nextOrder: function () {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	comparator: function (todo) {
		return todo.get('order');
	}
});

module.exports = new TodosCollection();

});