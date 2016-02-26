var TaskCollection = Backbone.Collection.extend({
    model : TaskModel,
    url: '/tasks'
});
