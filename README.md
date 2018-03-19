# NEInduction

## Summary

入职前练习培训项目，主要使用[NEJ框架](https://github.com/NEYouFan/nej-framework)进行开发。

### 技术栈

1. NEJ
2. NEI
3. Koa2
4. Pug
5. MongoDB

## Run

首先需要安装Mongodb，Mongodb连接配置文件为[config](/config/default.js)，运行脚本在[package.json](/package.json)文件中。

```
# 启动mongoDB
npm run mongo
# 启动Node.js服务器
npm run dev
```

在浏览器中访问`localhost:9999`就可以看到效果

## 基本功能

1. 显示服务端的所有todos列表
2. 添加新的todo元素
3. 删除一个todo元素
4. 清空所有的completed状态todo元素
5. 修改一个active状态的todo元素内容
6. 修改一个todo元素的状态
7. 通过路由进行todo状态过滤

