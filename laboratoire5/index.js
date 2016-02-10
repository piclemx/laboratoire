$(document).ready(function () {
    $('#results').hide();
    $('#get-tasks').unbind().click(getTasks);
    $('#task-modal').on('show.bs.modal', function (event) {
        showModal(event);
    })
    $('#task-delete-modal').on('show.bs.modal', function (event){
        showDeleteModal(event);
    })
    $('#update-task').unbind().click(updateTask);
    $('.glyphicon .glyphicon-remove-circle').unbind().click(deleteTask);
    $('#add-task').unbind().click(addTask);
});


function getTasks() {
    $.get( "http://localhost:5000/tasks", function(data) {
        builtTasksTable(data);
    });
}

function showModal(event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var task = button.data('task');
    var modal = $('#task-modal');
    modal.find('.modal-title').text('Update task #' + id);
    modal.find('#task-id').prop("disabled", true);
    modal.find('#task-id').val(id)
    modal.find('#task-text').val(task);

}

function updateTask() {
    var modal = $('#task-modal');
    var id = modal.find('#task-id').val();
    var task = modal.find('#task-text').val();
    var request = {
        "task" : task
    };
    $.ajax({
        url : "http://localhost:5000/tasks/" + id,
        type : "PUT",
        contentType : "application/json",
        data : JSON.stringify(request)
    }).done(function (data){
        var tasks  = data.tasks;
        var currentTask = searchById(tasks,id);
        $('#task-' + id).find('.task').text(currentTask.task);
        $('#task-' + id).find('button').data({
            "id" : currentTask.id,
            "task" : currentTask.task
        });
        modal.modal('hide');
    }).fail(function (error) {
        console.log(error);
    });
}


function  searchById(array , searchID) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id = searchID) {
            return array[i];
        }
    }
}

function deleteTask() {
    var modal = $('#task-delete-modal');
    var id = modal.find('#task-id-delete');
    $.ajax({
        url : "http://localhost:5000/tasks/" + id,
        type : "DELETE",
        contentType : "application/json",
    }).done(function (data){
       builtTasksTable(data);
        modal.modal('hide');
    }).fail(function (error) {
        console.log(error);
    });

}

function showDeleteModal(event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var modal = $('#task-delete-modal');
    modal.find('#task-id-delete').val(id);
    var currentValue = modal.find('.modal-title').text();
    modal.find('.modal-title').text(currentValue + id);
}


function builtTasksTable(data) {
    var tasks  = data.tasks;
    $('#rows tr').remove();

    for (var i = 0; i < tasks.length; i++) {
        var rows  =  "<tr id='task-"+ tasks[i].id +"'><th class='row id'>" + tasks[i].id + "</th><td class='task'>" + tasks[i].task +
            "</td><td>" +
            "<button type='button' class='btn btn-primary' " +
            "data-toggle='modal' data-target='#task-modal' " +
            "data-id='" + tasks[i].id +"' " +
            "data-task='" + tasks[i].task +"' " +
            "data-action='update'>Update</button>" +
            "<td><span class='glyphicon glyphicon-remove-circle' aria-hidden='true' " +
            "data-toggle='modal' data-target='#task-delete-modal' data-id='" + tasks[i].id +"'" +
            "></span></td></tr>";
        $('#rows').append(rows);
    }

    $('#results').show();
}


function addTask() {
    var modal = $('#task-modal-add');
    var id = modal.find('#task-add-id').val();
    var task = modal.find('#task-add-text').val();
    var request = {
        "task" : task
    };
    $.post({
        url : "http://localhost:5000/tasks/" + id ,
        data :  JSON.stringify(request),
        contentType : "application/json"
    }).done(function (data) {
        builtTasksTable(data);
        modal.modal('hide');
    }).fail(function (jqXHR, textStatus, errorThrown) {

    });
}