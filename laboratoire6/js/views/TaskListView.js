var TaskListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var tasks = new TaskCollection();
        tasks.fetch({
            success: function (tasks) {
                var template = _.template($('#task-list-template').html(), {tasks: tasks.models});
                that.$el.html(template);
            }
        })
    }
});

var taskListView = new TaskListView();
