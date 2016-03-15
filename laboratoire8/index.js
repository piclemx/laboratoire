var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, 'labo8');
var app = express();

db.collection('tasks');

app.use(bodyParser.urlencoded({ extended: true }));
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
