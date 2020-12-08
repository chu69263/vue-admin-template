#运行项目
配置`.env.development`的域名和接口
> npm run dev

#发布项目
配置`.env.production`或者`.env.staging`的域名和接口
> 测试环境：npm run build:stage
>
> 正式环境：npm run build:prod
#项目结构
```
project 
 - app              #业务代码
   - router         #路由
   - store          #store
   - views          #页面 
   - components     #组件
 - assets           #静态资源
 - framework        #框架代码
   - components     #组件
   - directive      #指令
   - layout         #母版页
   - router         #全局路由
   - store          #全局store
   - styles         #全局样式
   - utils          #工具类
   - views          #页面
   - permission.js  #全局权限验证
 - icons            #SVG图标
 - App.vue          #入口页面
 - main.js          #入口文件
 - setting.js       #项目配置
 - .env.development #开发环境配置
 - .env.staging     #测试环境配置（看心情）
 - .envproduction   #生产环境配置
```

# 框架定制
### 如何修改登录页面？
登录页路径：`framework/views/login/index.vue`
### 如何修改母版页面?
母版页：`framework/layout/index.vue`

侧边栏：`framework/layout/components/Sidebar/index.vue`

导航栏：`framekwork/layout/components/Navbar.vue`

内容页：`framework/layout/components/AppMain.vue`

### 如何修改权限配置页面？
页面权限：`framework/views/SetupMenu.vue`

接口权限：`framework/views/SetupAction.vue`

### 如何修改接口权限指令?
> 控制元素显示/隐藏 \<button v-action="'PDController/getSelectType'"\>权限按钮\</button>

指令路径：`framework/directive/permission-action.js`

### 如何修改路由逻辑？
> 文档参照 [https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html)

路由入口：`framework/router/index.js`

--

路由页面配置：`framework/router.routes.js`

```
// 通用页面，不需要权限
export const constantRoutes = []

// 权限配置页面（只有超级管理可以看到）
export const permissionRoutes = []

// 通配符路由，必须放最后，所以分开
export const lastRoutes = []
```

### 如何修改vuex状态管理？
> 文档参照 [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

store入口：`framwork/store/index.js`

store模块：`framwork/store/modules`
### 如何修改页面标题逻辑？
`framwork/utils/common.js中的getPageTitle()`

### 如何修改登录用户cookie管理？
> 参照文档 [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)

`framwork/utils/auth.js`

### 如何修改统一http请求逻辑？
> 参照文档 [https://github.com/axios/axios](https://github.com/axios/axios)

`framework/utils/request.js`


#业务开发
### 替换网页图标和标题后缀
图标路径：`/public/favicon.ico`

标题后缀：`settings.js 设置title属性`

### 页面定义
`app/views`

### 路由定义
> 配置项参照 [https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html)

路径：`app/router/index.js`

```
// 通用页面，不需要权限
export const constantRoutes = []

// 需要权限验证的路由
export const asyncRoutes = []

```

### store模块定义
模块定义入口：`app/store/index.js`

模块列表：`app/store/modules`



