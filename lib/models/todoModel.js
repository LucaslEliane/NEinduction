/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-15 12:58
 * Description:
 */

const mongoose = require('mongoose');

const TodoSchema = require('../schemas/todoSchema');
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;