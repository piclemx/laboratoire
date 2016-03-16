var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, 'labo8');
var _ = require('underscore');
db.collection('tasks');

exports.getTasks = function (req, res) {
    db.tasks.find({}).toArray(function(err, data) {
				  if(err) {
            console.log(err);
          }
          var list = _.map(data,toJSON);
          res.send({'tasks':list});
		});
};


exports.getTaskById = function (req, res) {
     db.tasks.find({_id:req.params.id}, function (err, task) {
       if(err) {
         console.log(err);
         notFound(req,res);
       }

       console.log(task);
       res.send({'task' : task});
     });

};

exports.createTask = function (req,res) {
    if(typeof(req.body) === 'undefined' ) {
      badRequest(req,res);
    }
    db.tasks.save(req.body, function(err, task) {
      if(err) {
        console.log(err);
      }
      console.log(task);

      res.status(201).send(toJSON(task))  ;
   });
};


exports.updateTask = function (req, res) {
    console.log('updateTask');
    res.send();
};

exports.deleteTask = function (req, res) {
    console.log('deleteTask');
    res.send();
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
