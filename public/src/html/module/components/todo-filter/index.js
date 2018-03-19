/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 15:09
 * Description:
 */


NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/template/tpl',
  'util/dispatcher/module',
  'pro/module/module'
],function(_k,_e,_v,_t0,_t1,_m,_p,_o,_f,_r){
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleAccountEdu}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleTodoFilter = _k._$klass();
  _pro = _p._$$ModuleTodoFilter._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function(){
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-c1')
    );
    this.__jFilters = _e._$getByClassName(this.__body, 'filters')[0];
    this.__jClearCompleted = _e._$getByClassName(this.__body, 'clear-completed-link')[0];
    _v._$addEvent(this.__jFilters, 'click', this.__onFilterClick._$bind(this));
    _v._$addEvent(this.__jClearCompleted, 'click', this.__onClearCompletedClick._$bind(this));
  };

  _pro.__onShow = function(_options) {
    var _umi = _options.input.location.href;
    var _layoutReg = /todo\/([a-z]+)\//;
    var _regResult;
    if (_regResult = _layoutReg.exec(_umi)) {
      this.__jPreActiveFilter = _e._$getByClassName(this.__body, _regResult[1])[0];
      this.__preActiveUMI = _regResult[1];
      _e._$attr(this.__jPreActiveFilter, 'class', _regResult[1] + ' actived');
    }
    this.__super(_options);

  };

  _pro.__onFilterClick = function(_event) {
    var _path = _event.path;
    if (_path[1].localName === 'li' && !~_path[1].className.indexOf('actived')) {
      var _target = _path[1];
      var _targetOriginClass = _target.className;
      _e._$attr(this.__jCountWrapper, 'class', _target.className);
      _target.className = _target.className + ' actived';
      _e._$attr(this.__jPreActiveFilter, 'class', this.__preActiveUMI);
      this.__preActiveUMI = _targetOriginClass;
      this.__jPreActiveFilter = _target;
    }
  };

  _pro.__onClearCompletedClick = function(_event) {
    this.__doPublishMessage(
      'clearCompleted',
      {
        value: true
      }
    );
  };

  // notify dispatcher
  _t1._$regist('component-todo-filter',_p._$$ModuleTodoFilter);
});