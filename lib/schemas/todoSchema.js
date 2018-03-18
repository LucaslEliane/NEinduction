/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 16:17
 * Description:
 */

const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

const TodoSchema = new Schema({
  'content': String,
  'type': {
    type: Number,
    enum: [0, 1],
  },
  'timestamp': String
});

TodoSchema.statics = {
  getTodos: function() {
    return this.find().exec();
  },
  getTodoById: function(_id) {
    return this.findOne({
      _id
    }).exec();
  },
  getTodoByContent: function(content, timestamp) {
    return this.findOne({
      content,
      timestamp
    }).exec();
  },
  deleteTodoById: function(_id) {
    return this.remove({
      _id
    }).exec();
  },
  updateType: function(todo, timestamp) {
    console.log(todo);
    return this.update({
      _id: todo._id
    }, {
      timestamp,
      type: (!!todo.type ? 0 : 1)
    });
  }
};

module.exports = TodoSchema;
