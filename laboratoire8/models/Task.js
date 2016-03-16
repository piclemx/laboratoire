var mongoose = require('mongoose');
var modelHelpers = require('./modelHelpers.js');
var Schema = mongoose.Schema;


var taskSchema = new Schema({
  task:String
});

taskSchema.method('toJSON', modelHelpers.toJSON);

var Task = mongoose.model('Task', taskSchema);

exports.schema = taskSchema;
exports.model = Task;
