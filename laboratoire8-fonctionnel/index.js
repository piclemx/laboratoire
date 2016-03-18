var express = require('express');
var bodyParser = require('body-parser');
var tasksRouter = require('./task-router');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});

tasks = [];
lastId = 1;

app.use('/tasks', tasksRouter);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});