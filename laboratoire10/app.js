$(document).ready(function () {
    var name = 'anonymous';
    var webSocket = new WebSocket('ws://myWebSocketUrl');

    $('#name-form').submit(function (event) {
        name = $('#name').val();
        event.preventDefault();
    });

    $('#message-form').submit(function (event) {
        var message = {
            'name': name,
            'message': $('#text').val()
        };
        webSocket.send(message);
        event.preventDefault();
    });

    webSocket.onopen = function () {
        debugger;
        updateStatus('wsStatus', 'Connected to WebSocket server!');
    };
    webSocket.onmessage = function (event) {
        debugger;
        displayMessage(event.data);
    };
    webSocket.onclose = function () {
        debugger;
        updateStatus('wsStatus', 'WebSocket closed!');
    };
    webSocket.onerror = function (event) {
        debugger;
        updateStatus('wsStatus', 'WebSocket error : ' + event.data);
    };
});
