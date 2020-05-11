# api-gateway-web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# Lints and fixes files
npm run lint
```



## 开发规范

### 命名篇

1. #### 基本原则
    - 除纯小写单词“xxx”外仅允许使用Pascal，Camel，“xxx-xxx”，“_*”四种命名方式
    - vue文件、vue name和类应以名词形式命名，使用 ***Pascal*** 命名
      > ***BindingAccount*** × 不推荐 <br/>
        ***AccountBinder*** √ 推荐
    - 文件、目录、路由、html class应以名词形式命名，使用 ***“xxx-xxx”*** 命名
      > 如 ***“babel-loader”***、
      ***“element-ui.css”***、***“/develop/api-builder”***、***“class="page-header"”*** ......
    - Function、变量、成员变量、Hook（id etc.）使用 ***Camel*** 命名, Function使用 动词+名词 短语形式。
      > 如 ***“isAdmin”***、***“hasPemission”***、***“getList”***

    - 无独立完整功能、无法独立运行的[子组件/文件]和内部(私有)成员变量的命名, 除按照其他规范外，可在名称前面添加“_”
      > 如 ***“_SubMenuHelper”***、***“_data”***、***“_operator.js”***

2. #### 详细规则
    - xxxxxxxx

### 其他参考
  https://www.w3cschool.cn/webdevelopment/l4yg7ozt.html
