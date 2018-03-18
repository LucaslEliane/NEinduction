/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 16:45
 * Description:
 */


/*
 * ------------------------------------------
 * 首页列表模块实现文件
 * @version  1.0
 * @author   chenluyan_bupt@163.com
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/list/page',
  'util/template/tpl',
  'pro/module/module',
  'pro/cache/blog'
],function(_k,_e,_v,_t,_t0,_t1,_m,_d,_p,_o){
  var _pro;
  /**
   * 日志列表模块对象
   *
   * @class   {_$$ModuleTodoItem}
   * @extends {_$$Module}
   *
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   *
   */
  _p._$$ModuleTodoItem = _k._$klass();
  _pro = _p._$$ModuleTodoItem._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function(){
    this.__super();
    this.__body = _e._$html2node(
      _t1._$getTextTemplate('module-id-c2')
    );
    // 0 - list box
    // 1 - pager box
    var _list = _e._$getByClassName(this.__body,'js-flag');
    var _jTodoList = _list[0];
    _v._$addEvent(_jTodoList, 'click', this.__onUpdateItem._$bind(this));

    this.__mopt = {
      limit:15,
      parent:_list[0],
      item:'jst-todo-list',
      cache:{
        klass:_d._$$CacheBlog,
        key: '_id'
      },
      pager:{clazz:'w-pager',parent:_list[1]},
      onbeforelistload:this.__onLoadingShow._$bind(this),
      onemptylist:this.__onMessageShow._$bind(this,'没有日志列表！'),
      ondelete: this.__onDelete._$bind(this),
      onupdate: this.__onUpdateItem._$bind(this)
    };
  };
  /**
   * 刷新模块
   * @param  {Object} 配置信息
   * @return {Void}
   */
  _pro.__onRefresh = (function(){
    var _doParseCKey = function(_param){
      if (!!_param.cid)
        return 'class-'+_param.cid;
      if (!!_param.tid)
        return 'tag-'+_param.tid;
      return 'box-'+(_param.box||1);
    };
    return function(_options){
      this.__super(_options);
      if (this.__lmdl) this.__lmdl._$recycle();
      this.__mopt.cache.lkey = _doParseCKey(_options.param||_o);
      this.__lmdl = _t0._$$ListModulePG._$allocate(this.__mopt);
      this.__doSubscribeMessage(
        '/?/input-box/',
        'addItem',
        this.__onAddItemMessageReceived._$bind(this)
      );
    };
  })();

  _pro.__onDelete = function(_event) {
    var _id = _event.data._id;
    var _data = {
      _id: _id
    };
    this.__lmdl._$delete(_data);
  };

  _pro.__onUpdateItem = function(_event) {
    var _classList = _event.target.className.split(' ');
    var _checkName = 'check-button';
    if (_classList.length !== 0 && ~_classList.indexOf(_checkName)) {
      _v._$stop(_event);
      var _input = _e._$getSibling(_event.target, {
        backward: true
      });
      _input.checked = !_input.checked;
      var _id = _e._$attr(_input, 'data-id');
      var _onload = (function() {
        var _jListNode = _e._$getParent(_input, 't:li');
        var _jLabel = _e._$getChildren(_jListNode, 'todo-content')[0];
        return function(type) {
          type
            ? _e._$attr(_jLabel, 'class', 'todo-content')
            : _e._$attr(_jLabel, 'class', 'todo-content completed')
        };
      })();
      var _data = {
        _id: _id,
        _onload: _onload
      };
      this.__lmdl._$update(_data);
    }
  }

  _pro.__onAddItemMessageReceived = function(message) {
    var _itemValue = message.data.value;
    var _onload = function() {
      this.__lmdl._$reload();
    }
    var _data = {
      content: _itemValue,
      _onload: _onload._$bind(this)
    };
    this.__lmdl._$add(_data);
  };
  /**
   * 订阅推送消息
   * @param {Object} _event
   */
  _pro.__onSubscribe = function(_event){
    console.log('hi,i\'m '+this.__umi+', subscribe message from '+_event.from+' and say: '+JSON.stringify(_event.data));
  };
  // notify dispatcher
  _t._$regist('component-todo-item',_p._$$ModuleTodoItem);
});



