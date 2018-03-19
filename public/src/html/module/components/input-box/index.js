/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-05 18:52
 * Description: 输入框模块脚本文件
 */

NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/template/tpl',
  'util/dispatcher/module',
  'pro/module/module'
],function(_k,_e,_v,_t0,_t1,_m,_p){
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleInputBox}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleInputBox = _k._$klass();
  _pro = _p._$$ModuleInputBox._$extend(_m._$$Module);
  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function(){
    this.__super();
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-c0')
    );
    this.__jInputBox = _e._$getByClassName(this.__body, 'input-box')[0];
    _v._$addEvent(this.__jInputBox, 'keyup', this.__onAddItem._$bind(this));
  };

  /*
  * 添加一个新的todo元素，触发键盘事件，与todo-item模块进行通信
  *
  * */
  _pro.__onAddItem = function(_event) {
    var keyCode = _event.keyCode;
    if (keyCode === 13 && !!this.__jInputBox.value) {
      var inputBoxValue = this.__jInputBox.value;
      this.__jInputBox.value = "";
      this.__doPublishMessage(
        'addItem',
        {
          value: inputBoxValue
        }
      );
    }
  }
  // notify dispatcher
  _t1._$regist('component-input-box',_p._$$ModuleInputBox);
});