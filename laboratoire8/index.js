var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks');
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/labo8';
mongoose.connect(mongoUri);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/tasks', tasks.getTasks);
app.get('/tasks/:id', tasks.getTaskById);
app.post('/tasks', tasks.createTask);
app.put('/tasks/:id', tasks.updateTask);
app.delete('/tasks/:id', tasks.deleteTask);


var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log("Running on " + port + " localhost");
});
