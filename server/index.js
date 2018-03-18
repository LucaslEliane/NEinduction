const path = require('path')
  , Config = require('config-lite')
  , Koa = require('koa2')
  , Router = require('koa-router')
  , views = require('koa-views')
  , favicon = require('koa-favicon')
  , convert = require('koa-convert')
  , serve = require('koa-static2')
  // , mongoose = require('./lib/mongo')
  , app = new Koa()
  , router = new Router()
  , basePath = path.resolve(__dirname, '../')
  , config = Config(basePath);

app.use(views(path.join(basePath, 'views'), {
  extension: 'pug'
}));

app.use(convert(serve("static", path.join(basePath, 'public'))));
app.use(convert(favicon(path.join(basePath, 'public/favicon.ico'))));

app.use(async function(ctx, next) {
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

require('../routes/index')(app);

app.listen(config.port, function(){
  console.log(config.message);
});