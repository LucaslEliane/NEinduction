/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 16:45
 * Description: todo-item 模块脚本
 */

NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'base/util',
  'util/dispatcher/module',
  'util/list/page',
  'util/template/tpl',
  'pro/module/module',
  'pro/cache/todo',
  'pro/cache/cache'
],function(_k,_e,_v,_u,_t,_t0,_t1,_m,_d,_p,_o){
  var _pro;
  /**
   * todo 列表模块对象
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
    // 由于该组件会被多次refresh，所以如果每次refresh的时候都执行消息监听
    // 则会导致出现一次添加操作被多次执行，这个标志位用来保证消息监听只被添加一次
    this.__showCount = 0;

    var _list = _e._$getByClassName(this.__body,'js-flag');
    var _jTodoList = _list[0];
    _v._$addEvent(_jTodoList, 'click', this.__onUpdateItem._$bind(this));
    _v._$addEvent(_jTodoList, 'dblclick', this.__onChangeItemContentClick._$bind(this));


    this.__mopt = {
      parent:_list[0],
      item:'jst-todo-list',
      cache:{
        klass:_d._$$CacheTodo,
        key: '_id'
      },
      pager:{clazz:'w-pager',parent:_list[1]},
      onbeforelistload:this.__onLoadingShow._$bind(this),
      onemptylist:this.__onMessageShow._$bind(this,'Todo列表为空！'),
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
      if (!this.__showCount) {
        this.__doSubscribeMessage(
          '/?/input-box/',
          'addItem',
          this.__onAddItemMessageReceived._$bind(this)
        );
        this.__doSubscribeMessage(
          '/?/todo-filter/',
          'clearCompleted',
          this.__onClearCompletedMessageReceived._$bind(this)
        );
        this.__showCount++;
      }
    };
  })();

  /*
  * 删除一个todo元素触发事件
  * */
  _pro.__onDelete = function(_event) {
    var _id = _event.data._id;
    var _data = {
      _id: _id
    };
    this.__lmdl._$delete(_data);
  };
  /*
  * 更新一个todo元素状态的事件处理
  * */
  _pro.__onUpdateItem = function(_event) {
    var _classList = _event.target.className.split(' ');
    var _checkName = 'check-button';
    if (_classList.length !== 0 && ~_classList.indexOf(_checkName)) {
      _v._$stop(_event);
      var _input = _e._$getSibling(_event.target, {
        backward: true
      });
      var _id = _e._$attr(_input, 'data-id');
      var _onload = (function($this) {
        var _jListNode = _e._$getParent(_input, 't:li');
        var _jLabel = _e._$getChildren(_jListNode, 'todo-content')[0];
        return function(_json) {
          _json.type
            ? _e._$attr(_jLabel, 'class', 'todo-content')
            : _e._$attr(_jLabel, 'class', 'todo-content completed');
          $this.__lmdl._$reload();
        };
      })(this);
      var _data = {
        _action: 'updateType',
        _id: _id,
        _onload: _onload
      };
      this.__lmdl._$update(_data);
    }
  };
  /*
  * 修改一个active元素内容的点击事件
  * */
  _pro.__onChangeItemContentClick = function(_event) {
    var _target = _event.target;
    var _updateInput = document.createElement('input');
    _updateInput.type = 'text';
    if (_target.nodeName == 'LABEL' && _target.className == 'todo-content') {
      _v._$stop(_event);
      _target.innerText = '';
      _target.appendChild(_updateInput);
      _v._$addEvent(_updateInput, 'blur', this.__onChangeItemContentBlur._$bind(this));
    }
  };
  /*
  * 修改完成active元素内容，input取消焦点之后的更新事件处理函数
  * */
  _pro.__onChangeItemContentBlur = function(_event) {
    var _jLabel = _e._$getParent(_event.target, 't:label');
    var _jListNode = _e._$getParent(_jLabel, 't:li');
    var _id = _e._$attr(_jListNode, 'data-id');
    var _updateValue = _event.target.value;

    var _onload = function() {
      _jLabel.innerText = _updateValue;
    };
    var _data = {
      _action: 'updateContent',
      _id: _id,
      _updateValue: _updateValue,
      _onload: _onload
    };
    this.__lmdl._$update(_data);
  };
  /*
  * 添加一个todo元素的消息接收器，并且进行列表更新
  * */
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
  /*
  * 删除所有的completed todo元素的消息接收器，并且进行服务端的移除和列表更新
  * */
  _pro.__onClearCompletedMessageReceived = function(message) {
    if (message.data.value) {
      var _list = this.__lmdl._$cache()['__cache']['box-1-list'];
      if (_list && _list.length) {
        var _i = 0;
        var _deleteList = [];
        while(_i < _list.length) {
            if (!_list[_i].type) {
            _deleteList.push(_list[_i]['_id']);
          }
          ++_i;
        }
        if (_deleteList.length) {
          var _data = _deleteList;
          this.__lmdl._$delete({
            _id: _data
          });
          this.__lmdl._$reload();
        }
      }
    }
  };

  // notify dispatcher
  _t._$regist('component-todo-item',_p._$$ModuleTodoItem);
});



