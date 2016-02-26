function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = 'http://127.0.0.1:5000' + options.url;
});

var Router = Backbone.Router.extend({
    routes: {
        "": "home",
        "edit/:id": "edit",
        "new": "edit",
    }
});
var router = new Router;
router.on('route:home', function() {
    // render task list
    taskListView.render();
})
router.on('route:edit', function(id) {
    taskEditView.render({id: id});
})
Backbone.history.start();