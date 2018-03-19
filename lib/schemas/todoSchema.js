/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 16:17
 * Description: Mongoose和todo相关的Schema以及static方法
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
  deleteTodoById: function(_id) {
    return this.remove({
      _id
    }).exec();
  },
  updateType: function(todo, timestamp) {
    return this.update({
      _id: todo._id
    }, {
      timestamp,
      type: (!!todo.type ? 0 : 1)
    }).exec();
  },
  updateContent: function(todo, timestamp) {
    return this.update({
      _id: todo._id
    }, {
      timestamp,
      content: todo._content
    });
  }
};

module.exports = TodoSchema;
