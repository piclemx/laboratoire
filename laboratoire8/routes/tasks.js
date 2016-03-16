var Task = require('../models/Task').model;
var _ = require('underscore');

exports.getTasks = function (req, res) {
    Task.find({}, function(err, data) {
				  if(!err) {
            res.send({'tasks':data});
          } else {
            console.log(err);
          }
		});
};


exports.getTaskById = function (req, res) {
     Task.findById(req.params.id, function (err, task) {
       if(err) {
         console.log(err);
         notFound(req,res);
       }
       res.send({'task' : task});
     });

};

exports.createTask = function (req,res) {
    if(typeof(req.body) === 'undefined' ) {
      badRequest(req,res);
    }
    var task = new Task({task: req.body.task});
    task.save(function(err) {
      if(!err) {
        res.status(201).send(task);
      } else {
        console.log(err);
      }
    });
};


exports.updateTask = function (req, res) {
  if(typeof(req.body.task) === "undefined") {
    badRequest(req,res);
  }

   Task.findById(req.params.id , function (err, task) {
      if(err) {
        console.log(err);
        notFound(req, res);
      }

      task.task = req.body.task;
      task.save();

      getTasks(req,res);
   });
};

exports.deleteTask = function (req, res) {
  Task.findById(req.params.id, function (err, task) {
     if(err) {
       notFound(req,res);
     }

     task.remove();
     getTasks(req,res);
  });
};

function badRequest(req, res) {
    res.status(400).send({ 'error': 'Bad Request' });
}

function notFound(req, res) {
    res.status(404).send({ 'error': 'Not Found' });
}

 function toJSON(obj) {
    var objet = obj;

    objet.id = objet._id;
    delete objet._id;
    delete objet.__v;
    delete objet.password;

    return objet;
}
