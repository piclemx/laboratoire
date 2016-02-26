var TaskListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var tasks = new TaskCollection();
        tasks.fetch({
            success: function (tasks) {
                console.log(tasks);
                //var template = _.template($('#task-list-template').html(), {tasks: createdList});
                //that.$el.html(template);
                var template = _.template($('#task-list-template').html());
                $('.page').html(template({tasks: tasks.models}));
            }
        })
    }
});

var taskListView = new TaskListView();
