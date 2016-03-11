(function() {
    TaskModel = Backbone.Model.extend({
        defaults: {
            task: ''
        },
        parse: function(response) {
            // Make sure the id is valid.
            this.id = response.id;
            return response;
        },
        validate: function (attrs) {
            if (!attrs.task || attrs.task === "") {
                return 'Please enter a valid task.';
            }
        }
    });
})();