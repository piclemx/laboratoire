var mongoose = require('mongoose');
var modelHelpers = require('./modelHelpers.js');
var Schema = mongoose.Schema;


var simpleUser = new Schema({
  name: { type : String , unique : true},
  password: String
});

var completUser = new Schema({
  name: { type : String , unique : true},
  password: String,
  adress: String,
  phoneNumber: Number,
  email: String
});

var preferentialUser = new Schema({
  name: { type : String , unique : true},
  password: String,
  question: String,
  answer: String
});



simpleUser.method('toJSON', modelHelpers.toJSON);
completUser.method('toJSON', modelHelpers.toJSON);
preferentialUser.method('toJSON', modelHelpers.toJSON);

var SimpleUser = mongoose.model('SimpleUser',simpleUser, 'users');
var CompleteUser = mongoose.model('CompleteUser', completUser, 'users');
var PreferentialUser = mongoose.model('PreferentialUser', preferentialUser, 'users');

exports.schema = taskSchema;
exports.SimpleUser = SimpleUser;
exports.CompleteUser = CompleteUser;
exports.PreferentialUser = PreferentialUser;
