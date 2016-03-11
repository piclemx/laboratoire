$(function () {
    var taskCollection = new TaskCollection({});
    taskCollection.url = 'http://localhost:5000/tasks';

    var taskView = new TaskView({
        collection: taskCollection
    });

    // We add `.complete` callback to render the views only after the `fetch()` is completed.
    taskCollection.fetch().complete(function () {
        taskView.render();
    });

    // Create a new model, and set POST to respect the API.
    $('#btn-add-task').click(function () {
        tryPerformActionOnTask($('#task-editor').val() !== "",
            function () {
                taskCollection.create({
                    task: $('#task-editor').val()
                })
            })
    })
});

function tryPerformActionOnTask(validation, callback) {
    $('#error-handler').slideUp('fast');
    if (validation) {
        callback();
    } else {
        $('#error-handler').slideDown('fast');
    }
}