/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 18:41
 * Description:
 */

NEJ.define([
  'base/element',
  'base/klass',
  'base/util',
  'util/ajax/xdr',
  './cache.js'
],function(_e, _k,_u,_j,_t,_p,_o,_f,_r){
  var _pro;
  /**
   * 日志缓存对象
   * @class   {_$$CacheBlog}
   * @extends {_$$Cache}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$CacheBlog = NEJ.C();
  _pro = _p._$$CacheBlog._$extend(_t._$$Cache);
  /**
   * 从服务器载入数据
   */
  _pro.__doLoadList = function(_options){
    var _key = _options.key,
      _callback = _options.onload;
    _j._$request('/api/todos',{
      method:'GET',
      type:'json',
      data:_u._$object2query(_options.data),
      onload:this.__cbListLoad._$bind(this,_key,_callback),
      onerror:this.__cbListLoad._$bind(this,_key,_callback,_o)
    });
  };

  _pro.__doDeleteItem = function(_options) {
    var _data = _options.data['_id'] || {};
    if (_u._$isArray(_data)) {
      _j._$request('/api/clearCompleted', {
        method: 'POST',
        data: {
          '_id': _data
        },
        onload: function(_json) {
          var _jsonData = _e._$text2type(_json, 'json');
          if (_jsonData.status == 'ok') {
            _options.onload(_jsonData.status);
          }
        }
      })
    } else {
      _j._$request('/api/delete', {
        method: 'POST',
        data: _data,
        onload: _options.onload
      });
    }

  };

  _pro.__doUpdateItem = function(_options) {
    var _data = _options.data || {};
    _j._$request('/api/updateItem', {
      method: 'POST',
      data: _data,
      onload: function(_json) {
         var _jsonData = _e._$text2type(_json, 'json');
         _options.data._onload(_jsonData);
         _options.onload(_jsonData);
      }
    });
  };

  _pro.__doAddItem = function(_options) {
    var _data = _options.data;
    _j._$request('/api/addItem', {
      method: 'POST',
      data: {
        content: _data.content
      },
      onload: function(_json) {
        var _jsonData = _e._$text2type(_json, 'json');
        _data._onload(_jsonData);
      }
    });
  };

  return _p;
});

