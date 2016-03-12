$(function () {
    DayView = Backbone.View.extend({
        template: _.template($('#days-tpl').html()),
        el: "#days-list",
        initialize: function () {
            _.bindAll(this, 'render');
        },
        render: function () {
            this.$el.html(this.template({
                days: this.collection.toJSON()
            }));
        }
    });
});
