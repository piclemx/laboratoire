$(function () {
    TaskView = Backbone.View.extend({
        template: _.template($('#tasks-tpl').html()),
        el: "#tasks-list",
        events: {
            "click .btn-save": "buttonSaveHandler",
            "click .btn-delete": "buttonDeleteHandler",
            "click #btn-add-task": "buttonAddHandler"
        },
        initialize: function () {
            // You'll see the `_.bindAll()` function in almost every `initialize`.
            // See this StackOverflow [answer](http://stackoverflow.com/a/6396224/884338 "JSONP") to why `_.bindAll()` is necessary.
            _.bindAll(this, 'render');

            // Keep `this` in a variable to use in a different scope (as in `this.collection.bind()` ).
            var self = this;

            // We want the view to render itself each time the model is changed.
            // We can bind to any events like this.
            this.collection.bind('sync add remove', function () {
                self.render();
            });
        },
        render: function () {
            // Pass the collection (as a JSON) to the template to be rendered.
            this.$el.html(this.template({
                tasks: this.collection.toJSON()
            }));
        },
        buttonAddHandler: function (event) {
            this.collection.create({
                task: $('#task-editor').val()
            }, {
                validate: true,
                wait: true
            });
        },
        buttonSaveHandler: function (event) {
            var taskId = $(event.target).data('id');
            var model = this.collection.get(taskId);

            // Validate the model before completing the save.
            var isValid = model.save({ "task": $(event.target).parent().find('.task-content').val() });
            tryPerformActionOnTask(isValid, function () { isValid.complete(function () { }); });
        },
        buttonDeleteHandler: function (event) {
            var taskId = $(event.target).data('id');
            var model = this.collection.get(taskId);
            model.destroy();
            this.collection.remove(taskId);
        }
    });

});