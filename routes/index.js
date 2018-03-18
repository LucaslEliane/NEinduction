module.exports = function(app) {
  const Router = require('koa-router');
  const router = new Router();
  router.get('/', async function(ctx, next) {
    await ctx.render('index');
  });

  require('./api/todo')(router);

  app.use(router.routes())
    .use(router.allowedMethods());
};