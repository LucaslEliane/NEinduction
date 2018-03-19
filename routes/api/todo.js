/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 18:56
 * Description:
 */

const KoaBody = require('koa-body')({
    text: true
  })
  , path = require('path')
  , libPath = path.resolve(__dirname, '../../lib/models/todoModel')
  , TodoModel = require(libPath)
  , moment = require('moment');

module.exports = function(router) {
  router.get('/api/todos', async function(ctx, next) {
    const data = await TodoModel.getTodos();
    ctx.body = data;
    next();
  });

  router.post('/api/delete', KoaBody, async function(ctx, next) {
    const field = ctx.request.body;
    console.log(field);
    const _id = field._id;
    if (_id.length) {
      const result = await TodoModel.deleteTodoById(_id);
      if (result.ok) {
        ctx.body = {
          'status': 'ok'
        };
      } else {
        ctx.status = '404';
        ctx.message = 'delete error';
      }
    } else {
      ctx.status = '400';
      ctx.message = 'todo id needed';
    }
    next();
  });

  router.post('/api/clearCompleted', KoaBody, async function(ctx, next) {
    const field = ctx.request.body;
    const _ids = field['_id'].split(',');
    const result = await TodoModel
      .remove()
      .where('_id')
      .in(_ids)
      .exec();

    if (result.ok) {
      ctx.body = {
        'status': 'ok'
      };
    } else {
      ctx.status = '400';
      ctx.message = 'delete error'
    }
    next();
  });

  router.post('/api/updateItem', KoaBody, async function(ctx, next) {
    const field = ctx.request.body;
    const _id = field._id;
    const todo = await TodoModel.getTodoById(_id);
    const updateAt = moment().format('x');
    if (todo) {
      if (_id.length) {
        const data = await TodoModel.updateType(todo, updateAt);
        if (data) {
          ctx.body = {
            _id: todo._id,
            type: (!!todo.type ? 0 : 1),
            content: data.content
          };
        } else {
          ctx.status = '404';
          ctx.message = 'type update error';
        }
      } else {
        ctx.status = '400';
        ctx.message = 'todo id needed';
      }
    } else {
      ctx.status = '400';
      ctx.message = 'wrong todo id';
    }

    next();
  });

  router.post('/api/addItem', KoaBody, async function(ctx, next) {
    const field = ctx.request.body;
    const content = field.content;
    const createAt = moment().format('x');
    const insertResult = await TodoModel.create({
      content,
      timestamp: createAt,
      type: 1
    });
    if (insertResult) {
      ctx.body = {
        content: insertResult.content,
        _id: insertResult._id,
        type: insertResult.type
      };
    } else {
      ctx.status = '500';
      ctx.message = 'insert error'
    }
  });
};