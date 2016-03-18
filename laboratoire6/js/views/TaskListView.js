var TaskListView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      this.template = _.template($('#task-list-template').html());
    },
    render: function () {
        var self = this;
        var tasks = new TaskCollection();
        tasks.fetch({
            success: function (tasks) {
                $(self.el).html(self.template({tasks: tasks.models}));
            }
        })
    }
});


