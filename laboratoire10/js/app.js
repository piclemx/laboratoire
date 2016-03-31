$(document).ready(function () {
    var name = 'anonymous';
    var nameForm = $('#name-form');
    var message = $('#message');
    var messages = $('#messages');
    var messageList = $('#message-list');
    var messageForm = $('#message-form');

    var socket = io('localhost:5000');

    messages.hide();

    nameForm.submit(function (event) {
        name = $('#name').val();
        socket.emit('join', name);

        nameForm.hide();
        messages.show();
        event.preventDefault();
    });

    messageForm.submit(function (event) {
        var message = $('#message').val();
        socket.emit('new message', message);
        event.preventDefault();
    });

    socket.on('update', function (data) {
        messageList.append('<div>' + data + ' joined!</div><hr/>');
    });

    socket.on('new message', function (data) {
        message.val('');
        messageList.append('<div>' + data.name + ' - ' + data.message + '</div><hr/>');
    });

    socket.on('user left', function (data) {
        messageList.append('<div>' + data.name + ' left!</div><hr/>');
    });
});
