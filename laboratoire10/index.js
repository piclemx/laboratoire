var express = require('express');
var http = require('http').Server(express);
var io = require('socket.io')(http);
var _ = require('underscore');

var peoples = [];

var labo8 = io.of('/labo8');


labo8.on("connection", function(socket) {
  socket.on('join', function(name) {
    peoples[socket.id] = name;
    socket.broadcast.emit('update', 'New user connected ' + name)
  });

  socket.on('new message', function(message) {
    socket.broadcast.emit('new message', {
      name: peoples[socket.id],
      message: message
    });
  });

  socket.on('typing', function() {
    socket.broadcast.emit('typing', {
      name: peoples[socket.id]
    });
  });

  socket.on('stop typing', function() {
    socket.broadcast.emit('stop typing', {
      name: peoples[socket.id]
    });
  });
  socket.on('disconnect', function() {
    var name = peoples[socket.id];
    peoples = _.without(peoples, name);

    socket.broadcast.emit('user left', {
      name: name,
      numUsers: peoples.length
    });
  });

});


var port = 5000;
var server = http.listen(port, function() {
  console.log("Running on port " + port + " localhost");
  console.log('Hit CTRL-C to stop the server');
});

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function() {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function() {
  console.log('\nServer stopped.');
  process.exit();
});

process.on('SIGTERM', function() {
  console.log('\nServer stopped.');
  process.exit();
});
