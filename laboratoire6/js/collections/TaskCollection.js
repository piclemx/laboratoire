var TaskCollection = Backbone.Collection.extend({
    model : TaskModel,
    url: '/tasks',
    parse: function(response) {
        return response.tasks;
    }
});
