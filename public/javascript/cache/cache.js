/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 18:41
 * Description: cache基类
 */

NEJ.define([
  'base/klass',
  'util/cache/abstract'
],function(_k,_t,_p,_o,_f,_r){
  var _pro;
  /**
   * 项目缓存基类
   * @class   {_$$Cache}
   * @extends {_$$CacheListAbstract}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$Cache = _k._$klass();
  _pro = _p._$$Cache._$extend(_t._$$CacheListAbstract);
  /**
   *
   * @param {Object} _callback
   * @param {Object} _json
   */
  _pro.__cbListLoad = function(_key,_callback,_json){
    var _list = null;
    if (_json.length !== 0){
      var _result = _json;
      if (_result.total>_result.length)
        this._$setTotal(_key,_result.total);
      _list = _result;
    }
    _callback(_list);
  };

  return _p;
});
