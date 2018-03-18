/**
 * Project: NEinduction
 * Author: Lucas Twilight
 * Create Time: 2018-03-05 17:04
 * Description:
 */

NEJ.define([
  'util/dispatcher/dispatcher'
], function (_t) {
  /* start up dispatcher */
  _t._$startup({
    rules: {
      rewrite: {
        '404': '/m/todo/all/',
      },
      title: {
        '/m/todo/all/': 'all todo list',
        '/m/todo/active/': 'active todo list',
        '/m/todo/completed/': 'completed todo list'
      },
      alias: {
        'layout-system-app': '/m',
        'layout-todo-list': '/m/todo/all/',
        'layout-todo-list-active': '/m/todo/active/',
        'layout-todo-list-completed': '/m/todo/completed/',

        'component-todo-filter': '/?/todo-filter/',
        'component-input-box': '/?/input-box/',
        'component-todo-item': '/?/todo/todo-item/',
      }
    },
    modules: {
      '/?/input-box/': 'components/input-box/index.html',
      '/?/todo-filter/': 'components/todo-filter/index.html',
      '/?/todo/todo-item/': 'components/todo-item/index.html',

      /*
       * ------------------------------------------
       * 对外注册模块
       * ------------------------------------------
       */
      '/m': {
        module: 'layout/system/app/index.html',
        composite: {
          'input-box': '/?/input-box/',
          'todo-filter': '/?/todo-filter/',
        },
      },
      //首页列表
      '/m/todo/all/': {
        module: 'layout/todo.list/index.html',
        composite: {
          'todo-item': '/?/todo/todo-item/',
        }
      },
      '/m/todo/active/': {
        module: 'layout/todo.list.active/index.html',
        composite: {
          'todo-item': '/?/todo/todo-item/',
        }
      },
      '/m/todo/completed/': {
        module: 'layout/todo.list.completed/index.html',
        composite: {
          'todo-item': '/?/todo/todo-item/',
        }
      },
    },

    onbeforechange: function (_options) {
      var _umi = _options.path || '';
      if (!!_umi &&
        _umi.indexOf('/?') < 0 &&
        _umi.indexOf('/m') < 0) {
        _options.path = '/m' + _umi;
      }
    }
  });
});