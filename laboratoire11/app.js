var express = require('express'),
    bodyParser = require('body-parser'),
    users = require('./routes/users'),
    cors = require('cors'),
    morgan = require('morgan'),
    mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/laboratoire11';
mongoose.connect(mongoUri);
var app = express();
var corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: false
};

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUser);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);


var port = 5000;
var server = app.listen(port, function() {
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
