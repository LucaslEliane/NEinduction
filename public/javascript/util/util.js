/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-05 17:57
 * Description:
 */

/*
 * ------------------------------------------
 * 自定义通用接口实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
/** @module pro/util */
NEJ.define([
  'base/util',
  'util/chain/chainable',
  'util/ajax/xdr',
  'util/cache/storage'
], function (_u, $, _j, _c, _p) {

  /*
   * ajax 异常
   * @return {Object}  参数
   */
  _p.__ajaxError = function (_error) {
    console.log(_error);
    alert("网络异常，请稍后重试")
  }


  return _p;
});