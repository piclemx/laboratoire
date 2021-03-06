var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/labo8';
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

app.get('/tasks', tasks.getTasks);
app.get('/tasks/:id', tasks.getTaskById);
app.post('/tasks', tasks.createTask);
app.put('/tasks/:id', tasks.updateTask);
app.delete('/tasks/:id', tasks.deleteTask);


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
