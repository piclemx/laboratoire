var mongoose = require('mongoose');
var modelHelpers = require('./modelHelpers.js');
var Schema = mongoose.Schema;


var simpleUser = new Schema({
  _type: String,
  name: { type : String },
  password: String
});

var completUser = new Schema({
  _type: {type: String, default: 'CompleteUser'},
  name: { type : String },
  password: String,
  address: String,
  phoneNumber: String,
  email: String
});

var preferentialUser = new Schema({
  _type: {type: String, default: 'PreferentialUser'},
  name: { type : String },
  password: String,
  question: String,
  answer: String
});



simpleUser.method('toJSON', modelHelpers.toJSON);
completUser.method('toJSON', modelHelpers.toJSON);
preferentialUser.method('toJSON', modelHelpers.toJSON);

var Base = mongoose.model('SimpleUser',simpleUser, 'users');
var CompleteUser = mongoose.model('CompleteUser', completUser, 'users');
var PreferentialUser = mongoose.model('PreferentialUser', preferentialUser, 'users');

exports.Base = Base;
Base.CompleteUser = CompleteUser;
Base.PreferentialUser = PreferentialUser;

var init = Base.prototype.init;
init.CompleteUser = new Base.CompleteUser().__proto__;
init.PreferentialUser = new Base.PreferentialUser().__proto__;
Base.prototype.init = function (doc, fn) {
  var obj = init.apply(this,arguments);
  obj.__proto__ = init[doc._type];
  return obj;
};
