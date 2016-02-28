var TaskEditView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
        this.template = _.template($('#edit-task-template').html());
    },
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
        var self = this;
        if(options.id) {
            self.task = new TaskModel({id: options.id});
            self.task.fetch({
                success: function (task) {
                    $(self.el).html(self.template({task: task}));
                }
            });
        } else {
            $(self.el).html(self.template({task: null}));
        }
    }
});

