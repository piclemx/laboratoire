var User = require('../models/User').Base;
var _ = require('underscore');


exports.getUsers = function(req, res) {
  User.find({}, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });

};

exports.getUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
      notFound(req, res);
    }
    res.send({
      'user': user
    });
  });
};

exports.addUser = function(req, res) {
  if (_.isUndefined(req.body) || !_.has(req.body, 'name') || !_.has(req.body, 'password')) {
    badRequest(req, res);
  }

  var userToCreate;
  if (isCompleteUser(req.body)) {
    userToCreate = new User.CompleteUser({
      name: req.body.name,
      password: req.body.password,
      adress: req.body.adress,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email
    });
  } else if (isPreferentialUser(req.body)) {
    userToCreate = new User.PreferentialUser({
      name: req.body.name,
      password: req.body.password,
      question: req.body.question,
      answer: req.body.question
    });
  } else {
    userToCreate = new User({
      name: req.body.name,
      password: req.body.password
    });
  }

  userToCreate.save(function(err) {
    if (!err) {
      res.status(201).send(userToCreate);
    } else {
      console.log(err);
    }
  });
};

exports.updateUser = function(req, res) {

  if (_.isUndefined(req.params.id)) {
    badRequest(req, res);
  }

  var fieldToUpdate;


  User.findById(req.params.id, function(err, user) {
    if (err) {
      notFound(req, res);
    }

    if (isPreferentialUser(req.body)) {
      user.question = req.body.question;
      user.answer = req.body.answer;
    } else if (isCompleteUser(req.body)) {
      user.email = req.body.email;
      user.adress = req.body.adress;
      user.phoneNumber = req.body.phoneNumber;
    }

    if (_.has(req.body, 'password')) {
      user.password = req.body.password;
    }

    user.save();

    exports.getUser(req, res);
  });
};

exports.deleteUser = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      notFound(req, res);
    }

    user.remove();
    exports.getUsers(req, res);
  });
};


function badRequest(req, res) {
  res.status(400).send({
    'error': 'Bad Request'
  });
}

function notFound(req, res) {
  res.status(404).send({
    'error': 'Not Found'
  });
}

function isCompleteUser(object) {
  return _.has(object, 'email') && _.has(object, 'adress') && _.has(object, 'phoneNumber');
}


function isPreferentialUser(object) {
  return _.has(object, 'question') && _.has(object, 'answer');
}
