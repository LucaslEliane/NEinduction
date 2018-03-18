/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-05 17:07
 * Description:
 */

const Config = require('config-lite')
  , mongoose = require('mongoose')
  , path = require('path')
  , basePath = path.resolve(__dirname, '../')
  , config = Config(basePath);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);

