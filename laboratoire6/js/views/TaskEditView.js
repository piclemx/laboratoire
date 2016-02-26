var TaskEditView = Backbone.View.extend({
    el: '.page',
    events: {
        'submit .edit-task-form': 'saveTask',
        'click .delete': 'deleteTask'
    },
    saveTask: function (ev) {
        var taskDetails = $(ev.currentTarget).serializeObject();
        var task = new TaskModel();
        task.save(taskDetails, {
            success: function (task) {
                router.navigate('', {trigger:true});
            }
        });
        return false;
    },
    deleteTask: function (ev) {
        this.task.destroy({
            success: function () {
                console.log('destroyed');
                router.navigate('', {trigger:true});
            }
        });
        return false;
    },
    render: function (options) {
        var that = this;
        if(options.id) {
            that.task = new TaskModel({id: options.id});
            that.task.fetch({
                success: function (task) {
                    var template = _.template($('#edit-task-template').html(), {task: task});
                    that.$el.html(template);
                }
            })
        } else {
            var template = _.template($('#edit-task-template').html(), {task: null});
            that.$el.html(template);
        }
    }
});

var taskEditView = new TaskEditView();
