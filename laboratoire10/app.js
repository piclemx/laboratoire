$(document).ready(function () {
    var name = 'anonymous';
    var nameForm = $('#name-form');
    var messages = $('#messages');
    var messageList = $('#message-list');
    var messageForm = $('#message-form');

    var socket;

    messages.hide();

    nameForm.submit(function (event) {
        debugger;
        name = $('#name').val();
        socket = io('localhost:5000', {'name': name});

        nameForm.hide();
        messages.show();
        event.preventDefault();

        socket.on('new message', function (data) {
            addChatMessage(data);
        });
    });

    messageForm.submit(function (event) {
        var message = $('#message').val();
        socket.emit('new message', message);
        event.preventDefault();
    });

    var addChatMessage = function (data) {
        debugger;
        messageList.append('<div></div>');
    };
});
