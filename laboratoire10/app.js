var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');

var peoples = [];

io.on("connection", function (socket) {
    socket.on('join', function (name) {
        peoples[socket.id] = name;
        console.log('New user connected ' + name);
        io.emit('update', name);
    });

    socket.on('new message', function (message) {
        console.log('message: ' + peoples[socket.id] + ' - ' + message);
        io.emit('new message', {
            name: peoples[socket.id],
            message: message
        });
    });

    socket.on('disconnect', function () {
        var name = peoples[socket.id];
        console.log(name + ' left');
        peoples = _.without(peoples, name);

        io.emit('user left', {
            name: name,
            numUsers: peoples.length
        });
    });
});

var port = 5000;
var server = http.listen(port, function () {
    console.log("Running on port " + port + " localhost");
    console.log('Hit CTRL-C to stop the server');
});

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function () {
    console.log('\nServer stopped.');
    process.exit();
});

process.on('SIGTERM', function () {
    console.log('\nServer stopped.');
    process.exit();
});
