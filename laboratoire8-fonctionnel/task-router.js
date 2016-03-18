var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json({
        "tasks": tasks
    });
});

router.post('/', function (req, res) {
    var task = req.body;
    task.id = ++lastId;
    tasks.push(task);
    res.json(task);
});

router.put('/:id', function(req, res) {
    var taskIndex = tasks.map(function(e) {
        return e.id;
    }).indexOf(parseInt(req.params.id));

    if (taskIndex < 0) {
        res.status(400).send({'message': 'task not exist'});
    }

    for (var attr in req.body) {
        tasks[taskIndex][attr] = req.body[attr];
    }

    res.json(tasks[taskIndex]);
});

router.delete('/:id', function(req, res) {
    var taskIndex = tasks.map(function(e) {
        return e.id;
    }).indexOf(parseInt(req.params.id));

    if (taskIndex < 0) {
        res.status(400).send({'message': 'task not exist'});
    }
    res.json(tasks[taskIndex]);

    tasks.splice(taskIndex, 1);
});

module.exports = router;