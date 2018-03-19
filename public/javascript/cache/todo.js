/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 18:41
 * Description: todo列表缓存和服务端通信相关功能
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
  _p._$$CacheTodo = NEJ.C();
  _pro = _p._$$CacheTodo._$extend(_t._$$Cache);
  /**
   * 从服务器载入数据
   */
  _pro.__doLoadList = function(_options){
    var _key = _options.key,
      _callback = _options.onload,
      _that = this;
    _j._$request('/api/todos',{
      method:'GET',
      type:'json',
      data:_u._$object2query(_options.data),
      onload: function(_data) {
        if (_data.length) {
          _that.__cbListLoad._$bind(_that,_key,_callback)(_data);
        } else {
          _callback(_data);
        }
      },
      onerror: function(_error) {
        alert('列表加载失败');
        console.warn(_error.message);
      }
    });
  };
  /*
  * 删除某个todo元素
  *
  * */
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
        },
        onerror: function(_error) {
          alert('清空Completed元素失败');
          console.warn(_error.message);
        }
      })
    } else {
      console.log(_data);
      _j._$request('/api/delete', {
        method: 'POST',
        data: {
          _id: _data
        },
        onload: _options.onload,
        onerror: function(_error) {
          alert('删除元素失败');
          console.warn(_error.message);
        }
      });
    }

  };
  /*
  * 更新某个todo元素的状态或者内容
  *
  * */
  _pro.__doUpdateItem = function(_options) {
    var _data = _options.data || {};
    switch(_data._action) {
      case 'updateType':
        _j._$request('/api/updateItem', {
          method: 'POST',
          data: _data,
          onload: function(_json) {
            var _jsonData = _e._$text2type(_json, 'json');
            _options.data._onload(_jsonData);
            _options.onload(_jsonData);
          },
          onerror: function(_error) {
            alert('更新todo元素失败');
            console.warn(_error.message);
          }
        });
        break;
      case 'updateContent':
        _j._$request('/api/updateItemContent', {
          method: 'POST',
          data: {
            _id: _data._id,
            _content: _data._updateValue
          },
          onload: function(_json) {
            var _jsonData = _e._$text2type(_json, 'json');
            _options.data._onload();
            _options.onload(_jsonData);
          },
          onerror: function(_error) {
            alert('更新todo元素失败');
            console.warn(_error.message);
          }
        });
        break;
      default:

    }
  };

  /*
  * 添加一个新的todo元素
  *
  * */
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
      },
      onerror: function(_error) {
        alert('添加todo元素失败');
        console.warn(_error.message);
      }
    });
  };


  return _p;
});

