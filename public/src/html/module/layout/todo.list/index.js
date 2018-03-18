/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-06 16:41
 * Description:
 */

/*
 * ------------------------------------------
 * 主界面布局模块基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
  'base/klass',
  'base/element',
  'util/template/tpl',
  'util/dispatcher/module',
  '{pro}module/module.js',
  '{pro}util/util.js'
],function(_k,_e,_t0,_t1,_m,_u,_p){
  // variable declaration
  var _pro;
  /**
   * 项目模块基类对象
   * @class   {_$$ModuleLayoutSystem}
   * @extends {_$$Module}
   * @param   {Object}  可选配置参数，已处理参数列表如下所示
   */
  _p._$$ModuleLayoutTodoList = _k._$klass();
  _pro = _p._$$ModuleLayoutTodoList._$extend(_m._$$Module);

  /**
   * 构建模块
   * @return {Void}
   */
  _pro.__doBuild = function(){
    this.__body = _e._$html2node(
      _t0._$getTextTemplate('module-id-l1')
    );
    var _list = _e._$getByClassName(this.__body,'todo-list');
    this.__export = {
      'todo-item': _list[0]
    };
  };
  // notify dispatcher
  _t1._$regist('layout-todo-list',_p._$$ModuleLayoutTodoList);
});