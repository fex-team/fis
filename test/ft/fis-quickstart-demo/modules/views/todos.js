define('views/todos', function(require, exports, module){

var Backbone, common, TodoView;

Backbone = require('backbone');
common = require('common');

var $ = require('jquery');
var _ = require('underscore');

TodoView = Backbone.View.extend({
	tagName:  'li',

	template: function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="view">\n    <input class="toggle" type="checkbox" '+
((__t=( completed ? 'checked' : '' ))==null?'':__t)+
'>\n    <label class="icon_'+
((__t=( Math.ceil(Math.random() * 5)))==null?'':_.escape(__t))+
'">'+
((__t=( title ))==null?'':_.escape(__t))+
'</label>\n    <button class="destroy"></button>\n</div>\n<input class="edit" value="'+
((__t=( title ))==null?'':_.escape(__t))+
'">';
}
return __p;
},

	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
	},

	toggleVisible: function () {
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function () {
		var isCompleted = this.model.get('completed');
		return (// hidden cases only
			(!isCompleted && common.TodoFilter === 'completed') ||
				(isCompleted && common.TodoFilter === 'active')
			);
	},

	toggleCompleted: function () {
		this.model.toggle();
	},

	edit: function () {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function () {
		var value = this.$input.val().trim();

		if (value) {
			this.model.save({ title: value });
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function (e) {
		if (e.which === common.ENTER_KEY) {
			this.close();
		}
	},

	clear: function () {
		this.model.destroy();
	}
});

module.exports = TodoView;

});