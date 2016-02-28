var TaskModel = Backbone.Model.extend({
    urlRoot: '/tasks',

    defaults: {
        task: ''
    },

    parse: function(response) {
        if(_.isObject(response.task)) {
            return response.task;
        } else {
            return response;
        }
    }
});
