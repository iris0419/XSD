陪诊系统后台+手机C端

## 01 环境配置

1.node.js版本 20.16.0

- node -v 查看node版本
- nvm install 20.16.0--下载
- nvm list--查看可用列表
- nvm use 20.16.0--使用node版本

2.nvm--node版本管理

3.编辑器 vsCode

## 02 创建项目

[开始 | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/)

```
终端输入指令: 
# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

Done. Now run:

  cd my-vue-app
  npm install
  npm run dev
```

## 03 Router路由配置引入

### 1.下载

[入门 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/)

npm install vue-router@4

### 2.创建路由和对应页面

创建 views文件夹--Main.vue

```vue
//Main.vue
<template>
    <div>
        Layout
    </div>
</template>

<script setup></script>
```

创建 views文件夹--login文件夹--index.vue

```vue
<template>
    <div>
        Login
    </div>
</template>

<script setup></script>
```

创建 router文件夹--index.js

```vue
import {createRouter,createWebHashHistory}from 'vue-router'//1.1引入vue-router里的createRouter方法,路由器实例是通过调用 createRouter() 函数创建的:

import Layout from '../views/Main.vue'  //引入Main里的Layout
import Login from '../views/login/index.vue'//引入index里的Login

const routes=[
    {
        path:'/',
        component:Layout
    },
    {
        path:'/login',
        component:Login
    }
]

//1.2 引入routes
//router的实例,通过router接收
const router=createRouter({
    //路由数据
    routes,
    //路由匹配模式
    history:createWebHashHistory()//调用hash模式,会返回一个router的实例
})

export default router //对外导出,导出后在入口文件main.js引入router
```

main.js

```vue
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router'//1.1 引入

const app=createApp(App) //1.2创建一个App的实例

//1.3 路由挂载
app.use(router)
app.mount('#app')
```

### 3.路由模式

#### Hash 模式

进行路由切换的时候,不用刷新直接更新当前页面内容,不会访问后台----开发情况下经常使用

#### Memory 模式

一般使用在服务端上

#### HTML5 模式(history模式)

页面进行切换的时候,会访问服务器对应的资源

### 4.路由出口

```vue
<script setup>
</script>

<template>
<RouterView/>  //路由出口
</template>

<style scoped>
</style>
```

## 04 Element-Plus按需引入

### 1.下载

npm i element-plus

### 2.按需引入

2.1 首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

npm install -D unplugin-vue-components unplugin-auto-import

2.2 然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中(已有的不要动,没有的加上)

```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

修改了配置后,都需要重启项目

## 05 layout布局和菜单aside组件封装

### 1. layout布局

#### 1.1 引入布局组件

#### 1.2 删除默认样式

#### 1.3 引入样式

```vue
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  /* font-size:100%; */
  vertical-align: baseline;
  background: transparent;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

body {
  height: 100vh;
  background-color: #f1f4f6;
}

#app {
  height: 100%;
}

.el-header {
  height: 50px !important;
  padding: 0 !important;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.05);
  border-bottom: 1px solid transparent;
}

.pagination-info {
  padding: 10px 0;
  background-color: #fff;
  .el-pagination {
    justify-content: end;
  }
}
```

### 2. 菜单aside组件封装

#### 2.1 创建components--aside.vue

```vue
<!-- 1.1 aside组件封装  -->
 <template>
    <el-menu 
    active-text-color="#ffd04b" 
    background-color="#545c64" 
    class="el-menu-vertical-demo" 
    default-active="2"
    text-color="#fff" 
    @open="handleOpen" 
    @close="handleClose"
    >
      <el-sub-menu index="1">
        ...
    </el-menu>
 </template>

<script setup>
const handleOpen = () => {}
const handleClose = () => {}
</script>
```

#### 2.2 引入并使用

```vue
<template>
  <div class="common-layout">
    <el-container>
      <!-- 1.3 合适位置使用组件 -->
       <Aside/>  
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '../components/aside.vue'; //1.2 组件引入
</script>
```

## 06 aside样式问题和treeMenu组件拆分

### 1. aside样式

npm i less@4.2.0  

```vue
<style lang="less" scoped>
.common-layout{
  height: 100%;
  .el-container{
    height: 100%;
  }
}
</style>
```

### 2. 封装treeMenu组件

#### 2.1 创建treeMenu.vue

#### 2.2 引入并使用

```
 <!-- 1.1抽离子菜单组件 -->
     <TreeMenu/> 
    </el-menu>
 </template>


<script setup>
import TreeMenu from './treeMenu.vue'; //1.2
```

## 07 treeMenu组件递归实现

效果图

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20240817175200422.png" alt="image-20240817175200422" style="zoom:67%;" />

```vue
//router.js数据
const routes = [
  { 
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'dashboard',
        meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据' },
        component: Dashboard
      },
      {
        path: 'auth',
        meta: { id: '2' ,name: '权限管理', icon: 'Grid' },
        children: [
          {
            path: '',
            alias: ['admin'],
            meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' },
            component: Admin
          },
          {
            path: 'group',
            meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' },
            component: Group
          }
        ]
      },
      {
        path: 'vppz',
        meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
        children: [
          {
            path: '',
            alias: ['staff'],
            meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择' },
            component: Staff
          },
          {
            path: 'order',
            meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改' },
            component: Order
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
]
```

创建对应页面并引入

```
import Layout from '../views/Main.vue'  //引入Main里的Layout
import Login from '../views/login/index.vue'//引入index里的Login
import Dashboard from '../views/dashboard/index.vue'  //首字母必须是大写字母Dashboard
import Admin from '../views/auth/admin.vue'
import Group from '../views/auth/group.vue'
import Staff from '../views/vppz/staff.vue'
import Order from '../views/vppz/order.vue'
```

### 1. 父子组件通信+递归实现渲染

#### 父组件aside.vue

```vue
// 7.1获取router的实例
import {useRouter} from 'vue-router' 
const router=useRouter()
//console.log(router);//options下有routes的数据
//7.2 创建响应式数据 拿到menu数据
import { reactive } from 'vue';
const menuData=reactive(router.options.routes[0].children)
//console.log(menuData);
//7.3通过父子组件通信传到子组件TreeMenu
// 7.3.1 <TreeMenu :menuData="menuData"/> bind绑定
// 7.3.2 defineProps获取
```

#### 子组件treeMenu.vue

```vue
// 7.3.2 defineProps获取
const props = defineProps(['menuData','index'])
//console.log(props, 'props');
```

```vue
<template>

  <!-- 7.4 渲染数据 7.4.1没有子菜单 -->
  <template v-for="(item, index) in props.menuData">
    <el-menu-item v-if="!item.children || item.children.length === 0" 
    :index="`${props.index}-${item.meta.id}`"
    :key="`${props.index}-${item.meta.id}`">
      <el-icon size="20">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <!-- 7.4.2有子菜单 -->
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template> 
//封装的组件复用
      <tree-menu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
    </el-sub-menu>
  </template>

</template>
```

总结:

router数据--useRouter拿到实例--reactive创建响应式数据,拿到数据menuData

父子组件(aside--treeMenu)通信将数据传输到子组件--父组件:<TreeMenu :menuData="menuData"/> bind绑定--子组件:defineProps获取

渲染数据:

通过有没有children判断有没有子菜单

没有子菜单:直接渲染

index唯一值,id,通过父组件传递进子组件

## 08 菜单点击跳转和样式问题

### 1.点击跳转

```vue
<el-menu-item 
    @click="handleClick(item,`${props.index}-${item.meta.id}`)" 

//8.1.2 获取router实例
import {useRouter} from 'vue-router' 
const router=useRouter()

//8.1.1点击菜单跳转
const handleClick=(item,active)=>{
  //console.log(item);
  //8.1.3 push跳转
  router.push(item.meta.path)
}
//8.1.4 路由出口
 <RouterView/>
```

### 2.图标样式

#### 1.下载包管理器

npm install @element-plus/icons-vue

#### 2.注册所有图标

您需要从 `@element-plus/icons-vue` 中导入所有图标并进行全局注册。

```
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

```
<el-menu 
    :style="{width:'230px'}">
```

## 09 header组件创建和样式编写

### 1.将header封装成一个组件

1.创建navHeader.vue

2.import Header from '../components/navHeader.vue'

3.

```
<el-header>
    <Header/>
</el-header>
```

### 2.样式

```vue
<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon size="20" class="icon">
                <Fold />
            </el-icon>
        </div>
        <div class="header-right">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <div class="el-dropdown-link flex-box">
                    <div>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </div>
                    <p class="userName">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup></script>
<style lang="less" scoped>
//小技巧:公用的,使用的时候class='flex-box'直接添加
.flex-box {
    display: flex;
    align-items: center;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        //移入变灰效果
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
    }
    .header-right{
        .userName{
            margin-left: 10px;
        }
    }
}
</style>
```

## 10 Vuex引入和菜单展开收起功能

mutations--如果需要修改数据必须使用

action--处理异步请求

module--将想要存储的内容用模块进行划分,每个模块拥有自己的state,mutation,action,getter...

### 1.创建store

[State | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/guide/state.html)

```
npm install vuex@next --save
```

创建store--index.js

```vue
//10.1 创建一个store的实例
import{createStore} from'vuex'
createStore({
    modules:{
        menu //创建一个menu的模块
    }
})
```

创建store--menu.js

```vue
const state={
    isCollapse:false,
    selectMenu:[]
}

const mutations={

}
//ES6简写,当变量名=变量值,可以写简写
export default{
    state,
    mutations
}
```

index.js 对外暴露store

```vue
//10.1 创建一个store的实例
import{createStore} from'vuex'
//引入menu
import menu from './menu'
//对外暴露store
export default createStore({
    modules:{
        menu
    }
})
```

main.js

```vue
import store from './store' ////10.2.1引入store
//10.2.2store挂载在vue的实例上
app.use(store)
```

**步骤总结:创建了store--定义了模块menu--menu里定义了state,mutaitions--对外暴露store的实例--挂载**

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20240820171131141.png" alt="image-20240820171131141" style="zoom:50%;" />

```vue
const state={
    isCollapse:false,
    selectMenu:[]
}
//定义方法
const mutations={
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    }
}

export default{
    state,
    mutations
}
```

### 2.使用

navHeader.vue

```
//拿到store的实例
import { useStore } from 'vuex';
const store=useStore()
```

```
<el-icon size="20" class="icon" @click="store.commit('collapseMenu')">
                <Fold />
            </el-icon>
```

获取store里的值

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20240820173316873.png" alt="image-20240820173316873" style="zoom:67%;" />

```vue
//10.3.1拿到store的数据
import { computed } from 'vue'
//10.3.2拿到store的实例
import { useStore } from 'vuex';
const store=useStore()
const isCollapse= computed(()=>store.state.menu.isCollapse)
//10.3.3给到页面上使用
:collapse="isCollapse"
```

### 3.样式(菜单收起)

```
:style="{width:!isCollapse ? '230px':'64px'}"
```

```
<p class="logo-lg">{{!isCollapse ? '安心陪诊':'安心'}}</p>
```

## 11 tag样式编写和高亮效果实现

### 1.点击的数据加入store

```vue
//menu.js
const state={
    isCollapse:false,
    selectMenu:[]
}
//定义方法
const mutations={
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    //参数1:state,参数2:传入的数组,需要加到selectMenu:[]里
    addMenu(state,playload){
        //对数据进行去重
        if(state.selectMenu.findIndex(item=>item.path===playload.path)===-1){
            state.selectMenu.push(playload)
        }
    }
}
```

### 2.调用

```
//11.2.1创建store实例
import { useStore } from 'vuex';
//11.2.2创建store实例
const store=useStore()
//11.2.3 传入数据
store.commit('addMenu',item.meta)
//11.2.4 拿到数据
import{computed} from 'vue'
const selectMenu=computed(()=>store.state.menu.selectMenu)//顺序:store.state.模块.数据
```

```vue
			<ul class="flex-box">
                <li 
                v-for="(item,index) in selectMenu" 
                :key="item.path"
                class="tab flex-box"
                >
                <el-icon size="20" class="icon"><component :is="item.icon"/></el-icon>
                {{ item.name }}
                <el-icon size="20" class="icon"><Close/></el-icon>
                </li>
            </ul>
```

总结:

上传:定义方法--判断是否唯一--是的话将数据push进state

调用:创建store实例--传入数据--通过计算属性拿到数据--渲染

### 3.样式

#### 3.1 点击跳转页面

```vue
<router-link :to="{path:item.path}">
   {{ item.name }}
</router-link>
```

```
.tab{
            padding: 0 10px;
            height: 100%;
            .text{
                margin: 0 5px;
            }
        }
a{
        height: 100%;
        color: #333;
        font-size: 15px;
    }
```

#### 3.2 移入close显示,移出消失效果

```vue
.tab{
            padding: 0 10px;
            height: 100%;
            .text{
                margin: 0 5px;
            }
            .close{
                visibility: hidden;
            }
        }
        .tab:hover{
            background-color:#f5f5f5;
            .close{
                visibility:inherit;
                cursor: pointer;
                color: #000;
            }
        }
```

#### 3.3 高亮效果

```
//引入路由
import { useRoute } from 'vue-router';
const route=useRoute()
```

```
 :class="{selected:route.path===item.path}"
```

```
//&同级
            &.selected{
                a{
                    color: #409eff;
                }
                i{
                    color: #409eff;
                }
                background-color: #f5f5f5;
            }
```

## 12 关闭tag功能实现

```vue
//绑定动作,传入item和index
<el-icon size="12" class="close" @click="closeTab(item,index)"><Close/></el-icon>
```

```
//定义事件,点击关闭tag
const closeTab=()=>{
    
}
```

```
//store--menu
closeMenu(state,playload){
        //将传入的数组数据和selectMenu里的数组数据进行对比,拿到index
        const index=state.selectMenu.findIndex(val=>val.name===playload.name)
        //通过索引删除指定元素 splice(参数1:index,参数2:个数)
        state.selectMenu.splice(index,1)
    }
```

```vue
//点击关闭tag
const closeTab=()=>{
    store.commit('closeMenu')
}
```

```vue
//判断
const closeTab=(item,index)=>{
    store.commit('closeMenu',item)
    //删除的是非选中项,直接删除
    if(route.path!==item.path){
        return
    }
    const selectMenuData=selectMenu.value
    //删除的最后一项
    if(index===selectMenuData.length){
        //如果tag只有一个元素,跳转到根路径
        if(!selectMenuData.length){
            router.push('/')
        }else{//如果tag有多个元素,index往前进一位
            router.push({
                path:selectMenuData[index-1].path
            })
        }
    }else{//如果删除的中间项,index往后退一位
        router.push({
            path:selectMenuData[index].path
        })
    }
}
```

总结:绑定动作,传入item和index--定义事件--点击删除的时候,删除store里的数据closeMenu--调用closeMenu,传入数据--判断,如果 删除的是非选中项,直接删除--如果删除掉是选中项,且为最后一项,高亮的index往前进一位,删到tag只有一个元素,就跳转到根路径(跳转需要拿到router的实例)--如果删除的中间项,index往后退一位

## ----项目搭建完成----

## 13 接口文档介绍和登录页面

接口文档 https://apifox.com/apidoc/shared-205c93aa-6b50-4a1a-85be-b93dc5304443

总结:写静态页面

### 知识点补充:相对路径-->静态资源 URL

### new URL(url, import.meta.url)

[静态资源处理 {#static-asset-handling} | Vite中文网 (vitejs.cn)](https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url)

[import.meta.url](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 [URL 构造器](https://developer.mozilla.org/en-US/docs/Web/API/URL) 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：

```
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```

### 1.图片上传

```vue
//Row Attributes justify:flex 布局下的水平排列方式 align:flex 布局下的垂直排列方式
<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card>
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
        </el-card>
    </el-row>
</template>

<script setup>
const imgUrl = new URL('../../public/login-head.png', import.meta.url).href
</script>
```

### 2.图片样式调整

```vue
<style lang="less" scoped>
:deep(.el-card__hearder){
    padding: 0;
}
.login-container{
    height: 100%;
    .card-header{
        background-color: #899fe1;
        img{
            width: 430px;
        }
    }
}

</style>
```

### 3.el-link切换注册和登录

```vue
<!-- 超链接切换 -->
             <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType?'返回登录' :'注册账号'}}</el-link>
             </div>
<script setup>
import {ref} from'vue'

//切换表单(0登录 1注册)
const formType=ref(0)

//切换登录和注册
const handleChange=()=>{
    //vue3修改ref响应式数据,用.value,如果存在就赋值为0,不存在就1
    formType.value=formType.value?0:1
}
</script>
```

### 4.表单

总结:将本地图片转成src上传--调整图片样式--el-link切换注册和登录--加上表单

## 14 验证码倒计时和手机号验证

### 14.1 验证码倒计时

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241016113304893.png" alt="image-20241016113304893" style="zoom:50%;" />

要求:1.点击按钮后,按钮内容变为'剩余xx秒',到0秒后变为'发送验证码'

#### 第1种实现方法

```
<span @click="getMsgCodeBtn">{{ msgText }}</span>
```

```vue
//切换验证码和倒计时
const msgText = ref("发送验证码");
const msgValue = ref(60);
// 2.点击发送验证码按钮, 开始倒计时
async function getMsgCodeBtn() {
    msgText.value = "剩余60s ";
    msgValue.value--;

    const timerId = setInterval(() => {
        msgText.value = `剩余${msgValue.value}s`;
        msgValue.value--;

        if (msgValue.value === -1) {
            msgText.value = "发送验证码";
            msgValue.value = 60;
            clearInterval(timerId);
        }
    }, 1000);
}
```

#### 第2种实现方法

思路:定义响应式数据(validText,time)--绑定countdownChange事件--利用倒计时

```
//发送短信
const countdown=reactive({
    validText:'获取验证码',
    time:60,
})
```

```
<span @click="countdownChange">{{ countdown.validText }}</span>
```

```vue
//第二种:切换验证码和倒计时
const countDown=reactive({
    validText:'获取验证码',
    time:60
})
//不让创建多个定时器
let flag=false
const countDownChange=()=>{
    //如果已发送就不处理
    if(flag) return
    //判断手机号是否正确 //正则,数字1开头,11位数字
    const pattern = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/; 
    if(!loginForm.userName ||!pattern.test(loginForm.userName)){
        return ElMessage({
            type: "warning",
            message: '请输入正确手机号码'
        }); 
    }
    //定时器
    let timer=setInterval(()=>{
        if(countDown.time<=0){
            clearInterval(timer)
            countDown.time=60
            countDown.validText='获取验证码'
            flag=false
        }else{
            countDown.time-=1
            countDown.validText=`剩余${countDown.time}秒`
        }
    },1000)
    flag=true
}
```

### 14.2 手机号验证

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241016191245821.png" alt="image-20241016191245821" style="zoom:50%;" />

要求:点击验证码按钮后,手机号栏 不能空白,不能格式不正确,不满足则警告提示

```vue
<el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled" :rules="rules">
</el-input>
```

```
import { ElMessage } from "element-plus";//引入反馈组件中的'消息提示'
```

```vue
const countDown=reactive({
    validText:'获取验证码',
    time:60
})
//不让创建多个定时器
let flag=false
const countDownChange=()=>{
    //如果已发送就不处理
    if(flag) return
    //判断手机号是否正确 //正则,数字1开头,11位数字
    const pattern = /^(?:(?:\+|00)86)?1\d{10}$/; 
    if(!loginForm.userName ||!pattern.test(loginForm.userName)){
        return ElMessage({
            type: "warning",
            message: '请输入正确手机号码'
        }); 
    }
    //定时器
    setInterval(()=>{
        if(countDown.time<=0){
            countDown.time=60
            countDown.validText='获取验证码'
            flag=false
        }else{
            countDown.time-=1
            countDown.validText=`剩余${countDown.time}秒`
        }
    },1000)
    flag=true
}
```

总结:定义pattern---pattern.test(value),结果是true/false---如果为空/不满足正则,报错

## 15.登录form表单校验

### 15.1 表单正则校验

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241016193043808.png" alt="image-20241016193043808" style="zoom:50%;" />

```
<el-form :model="loginForm" :rules="rules">
```

```vue
//表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: '',
})
//切换表单(0登录 1注册)
const formType = ref(0)
//切换登录和注册
const handleChange = () => {
    //vue3修改ref响应式数据,用.value,如果存在就赋值为0,不存在就1
    formType.value = formType.value ? 0 : 1
}

//表单验证
//手机号校验
const validateUser = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
        phoneReg.test(value) ? callback() : callback(new Error('请输入正确手机号'))
    }
}
//密码校验
const validatePass = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        const pass = /^[a-zA-Z0-9_-]{4,16}$/; // 密码正则,4-16位字符
        pass.test(value) ? callback() : callback(new Error('密码格式不对,需要4-16位字符'))
    }
}

const rules = reactive({
    userName: [{ validator: validateUser, trigger: 'blur' } //validateUser是一个函数 trigger:'blur'失去焦点触发],
    passWord: [{ validator: validatePass, trigger: 'blur' }],
})
//表单提交
const submitForm=()=>{}
```

总结:利用表格组件自带:rules="rules"---定义rules为响应式数据---需要进行校验的userName/passWord---validator: validateUser,定义validateUser校验的方法,是一个函数;trigger: 'blur' 失去焦点时触发

### 15.2 切换登录和注册

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241016203809210.png" alt="image-20241016203809210" style="zoom:50%;" />

```vue
<!-- 按钮 -->
            <el-form>
                <el-button type="primary" @click="submitForm">{{ formType ? '注册账号' : '登录' }}
                </el-button>
            </el-form>
```

```vue
<el-form-item prop="validCode" v-if="formType">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <template #append>
                            <span @click="countDownChange">{{ countDown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
```

总结:定义const formType = ref(0),通过切换formType(vue3修改ref响应式数据,用.value,如果存在就赋值为0,不存在就1)---v-if="formType"

## 16.axios引入和二次封装

- 安装指令: `npm i axios`

- 官方文档: `https://www.axios-http.cn/docs/intro`

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241017144314101.png" alt="image-20241017144314101" style="zoom:50%;" />

### 16.1 二次封装请求代码

```vue
// 内部存储关于请求的二次封装代码
import axios from "axios";
import { ElMessage } from "element-plus";//引入反馈组件中的'消息提示'

// 官网提供的实例,封装一个 自己的 axios 后续我们的请求利用 instance 发送
const instance = axios.create({
    // 请求的基准地址
    baseURL: "https:/v3pz.itndedu.com/v3pz",
    // 请求最大超时时间, 单位是毫秒
    timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token=localStorage.getItem('pz_token')//在发送请求前,添加token
    //不需要添加token的api
    const whiteUrl=['/get/code','/user/authentication','/login']
    //如果url里有token且不在whiteUrl里,添加token
    if (token && !whiteUrl.includes(config.url)){
        config.headers['x-token']=token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //对接口异常的数据,需要给用户提示
    if(response.data.code===-1){
        ElMessage.warning(response.data.message)
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance
```

总结:

下载axios---引入axios---axios.create创建一个实例,用instance接收---实例里传入配置(只有 `url` 是必需的。其他可选),配置baseURL/timeou

添加请求拦截器---在发送请求前,判断哪些页面需要添加token,哪些不需要

添加响应拦截器---对接口异常的数据,需要给用户提示,引入ElMessage组件

instance的实例进行暴露

### 16.2 封装获取验证码api

```
// 1. 导入刚才封装的 myAxios 函数
import request from "../utiles/request";

// 2. 导出一些封装好的 请求函数(登录请求的封装)

export const getValidCode=(data) =>{
    return request.post("/get/code",data)
}
```

### 16.3 使用验证码api

```
import { getValidCode } from '../../src/api/getValidCode';
```

```
//接收验证码api
    getValidCode({tel:loginForm.userName}).then(({data})=>{
        //console.log(data,'data')
        if(data.code===10000){
            ElMessage.success('发送成功')
        }
    })
```

总结:

导入封装好的axios请求---定义getValidCode,传入配置--暴露出去

import getValidCode---使用getValidCode(),传入需要的参数---.then拿到后端数据

## 17.注册接口和登录接口连调

### 17.1 注册接口和登录接口

```vue
//发送验证码api
// 1. 导入刚才封装的 myAxios 函数
import request from "../utiles/request";

// 2. 导出一些封装好的 请求函数(登录请求的封装)

export const getValidCode=(data) =>{
    return request.post("/get/code",data)
}

//注册api

export const testValidCode=(data) =>{
    return request.post("/user/authentication",data)
}

//登录api

export const loginIn=(data) =>{
    return request.post("/login",data)
}
```

```
import { loginIn,testValidCode,getValidCode } from '../../src/api/login';
```

### 17.2 进行form表单的校验

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241017214415470.png" alt="image-20241017214415470" style="zoom:50%;" />

要求:点击按钮后,手动触发所有form表单的校验

```
			<el-form 
            ref="loginInFormRef"
            >  
```

```
const loginInFormRef = ref()//拿到表单实例
```

```
<el-button type="primary" @click="submitForm(loginInFormRef)">{{ formType ? '注册账号' : '登录' }}
                </el-button>
```

```vue
const submitForm = async (loginInFormRef) => {
    if (!loginInFormRef) return//判断是否接收到表单实例
    //如有,手动触发表单校验validate规则
    await loginInFormRef.validate((valid, fields) => {
        if (valid) {
            console.log(loginForm, 'submit!')
            //注册页面
            if (formType.value) {
                testValidCode(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功,请登录!')
                        formType.value = 0
                    }
                })
            } else {
                //登录页面
                loginIn(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功')
                    }
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
```

总结:表单组件自带ref="ruleFormRef",命名为ruleFormRef----const ruleFormRef = ref(),拿到form的实例---button点击时传入form的实例ruleFormRef---传入form的实例,触发组件对应的校验

### 17.3 登录成功后,缓存token和用户信息

![image-20241018094134792](C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241018094134792.png)

```
//登录页面
                loginIn(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功')
                        console.log(data);
                        //将token信息/用户 缓存到浏览器
                        localStorage.setItem('pz_token',data.data.token)
                        //userInfo是对象,是引用数据类型,localStorage没办法传引用数据类型,所以用JSON.stringify转成字符串
                        localStorage.setItem('pz_userInfo',JSON.stringify(data.data.userInfo))
                    }
                })
```

## 18.用户鉴权和路由守卫添加

### 18.1 路由守卫

场景:如果用户token不存在,不让跳转到首页

```
//登录页面
                loginIn(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功')
                        //console.log(data);
                        //将token信息/用户 缓存到浏览器
                        localStorage.setItem('pz_token',data.data.token)
                        //userInfo是对象,是引用数据类型,localStorage没办法传引用数据类型,所以用JSON.stringify转成字符串
                        localStorage.setItem('pz_userInfo',JSON.stringify(data.data.userInfo))
                        //登录成功后跳转首页
                        router.push("/")
                    }
                })
```

```vue
//路由守卫
//beforeEach:它是在对routes进行对比之前做的一个校验
router.beforeEach((to, from) => {
    const token = localStorage.getItem('pz_token')
    //非登录页面token不存在,返回登录页面
    if (!token && to.path !== '/login') {
      return '/login'
    } else if (token && to.path === '/login') {
      return '/'
    } else {
      return true
    }
})
```

总结:登录成功后,将token存入localStorage---在main.js里配置beforeEach

### 18.2 用户鉴权(管理员管理)

![image-20241023162830655](C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241023162830655.png)

场景:1.静态页面搭建 2.发送请求,拿到数据,渲染在页面

```vue
//账号管理api get请求的参数需要携带在url上面
export const authAdmin=(params) =>{
    return request.get("/auth/admin",{params})
}
```

```vue
const paginationData=reactive({
    pageNum:1,
    pageSize:10,
})
```

```
import { authAdmin } from '../../src/api/login';
onMounted(()=>{
    authAdmin(paginationData).then(({data})=>{
        console.log(data,'authAdmin');
    })
})
```

渲染数据

```
const adminList=reactive({
    list:[],
    total:0
})
```

```
onMounted(()=>{
    authAdmin(paginationData).then(({data})=>{
        console.log(data,'authAdmin');
        adminList.list=data.data.list
        adminList.total=data.data.total
    })
})
```

```
<el-table 
    :data="adminList.list"
    >
```

总结:封装接口请求api---因为调用接口需要传入数据,定义数据---导入api+把数据onMounted出来--渲染在页面

## --------登录页面完成---------

## 19.菜单管理添加弹窗显示(自写成功)

场景:点击新增,打开弹窗

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241022150230852.png" alt="image-20241022150230852" style="zoom:50%;" />!

### 自写

开启关闭弹窗

```
v-model="dialogFormVisible" @click="dialogFormVisible = true"
const dialogFormVisible = ref(false)
```

拿到菜单数据和渲染

```
//菜单权限数据
export const getMenuList=(params) =>{
    return request.get("/user/getmenu",{params})
}
```

```
//权限列表
const permissionMenu = reactive({
    list: [],
    total: 0
})

onMounted(() => {
    getMenuList().then(({ data }) => {
        //console.log(data,'getMenu');
        permissionMenu.list = data.data
        permissionMenu.total = data.data.length
        console.log(permissionMenu.list);
    })
})
```

```
:data="permissionMenu.list" 
```

总结:api调用接口---拿到数据--:data渲染在页面上

### 教程

#### 19.1 静态搭建

| before-close | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | `Function` |
| ------------ | ------------------------------------------------------------ | ---------- |
|              |                                                              |            |

```vue
<el-dialog 
    v-model="dialogFormVisible" 
    :before-close="beforeClose"  //关闭弹窗
    title="添加权限" 
    width="500" 
    @click="dialogFormVisible = true">
        <el-form 
        label-width="100px"
        label-position="left"
        :model="form"  //和data差不多,搭配prop
        >
            <el-form-item 
            class="inputName" 
            label="名称" 
            prop="name" 
            :label-width="60" 
            required>
                <el-input 
                placeholder="请填写权限名称" 
                v-model="form.name"/>
            </el-form-item>

            <el-form-item 
            label="权限" 
            prop="permissions">
                <el-tree 
                show-checkbox 
                :data="permissionData" //拿到权限菜单后渲染
                style="max-width: 600px"
                 />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click.stop="dialogFormVisible=false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
```

```vue
//弹窗显示隐藏
const dialogFormVisible = ref(false)

//关闭弹窗的回调
const beforeClose=()=>{
    dialogFormVisible.value=false
}

//权限列表
const permissionData = ref([])

onMounted(() => {
    getMenuList().then(({ data }) => {
        permissionData.value = data.data
    })
})

//添加权限
//提交的form表单数据
const form=reactive(({
    name:'',
    permissions:'',
}))
```

#### 19.2 拿到数据渲染

**场景:默认选中**

```
:default-checked-keys="defaultKeys"	默认勾选的节点的 key 的数组	传入array

//默认选中权限
const defaultKeys=[4,5]
```

```
node-key="id"//每个树节点用来作为唯一标识的属性，整棵树应该是唯的,string
```

总结:通过组件自带功能:default-checked-keys,传入数组key id是4,5的数组,实现默认勾选

**场景:默认展开**

```
default-expanded-keys	默认展开的节点的 key 的数组	array
```

```
:default-expanded-keys="[2]"
```

## 20 菜单管理添加接口连调

场景:添加菜单管理

### 20.1 表单校验

```vue
<el-form 
        ref="formRef" //表单组件自带
        :rules="rules" //规定rules校验方法,需定义rules
        >
```

```vue
const formRef = ref()//拿到表单实例
```

```
<el-button type="primary" @click.stop="dialogFormVisible=false;submitForm(formRef)">
                    确认
                </el-button>//点击的时候传入表单实例
```

开始校验,对name进行校验,空白给提示

```
<el-input placeholder="请填写权限名称" v-model="form.name"/>
```

```vue
const rules = reactive({
    name: [
        { required:true, trigger: 'blur' ,message:'请输入权限名称'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
})
```

### 20.2 提交表单,调取接口

```
//表单提交
const submitForm=async(ElForm)=>{
    if (!ElForm) return//判断是否接收到表单实例
    await ElForm.validate((valid, fields) => {
        if (valid){
			//成功后,
        }else{
            console.log('error submit!');
        }
    })
}
```

拿到permissions,即当前选中节点 key 的数组

```vue
 ref="treeRef" //拿到tree的实例
const treeRef=ref() //拿到tree组件实例	
 if (valid){
            //校验成功后,提交表单
            //获取到选择的checkbox数据,返回是数组,转成string
            const permissions=JSON.stringify(treeRef.value.getCheckedKeys())
            setMenuPost({name:form.name,permissions,})
        }
```

| getCheckedKeys | 若节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前选中节点 key 的数组 | (leafOnly) 接收一个布尔类型参数，默认为 `false`. 如果参数是 `true`, 它只返回当前选择的子节点数组。 |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                |                                                              |                                                              |

拿到id:通过一个隐藏的表单域,提交的时候拿到id

```
<el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
```

调接口,post数据

```js
const submitForm=async(ElForm)=>{
    if (!ElForm) return//判断是否接收到表单实例
    await ElForm.validate((valid, fields) => {
        if (valid){
            //校验成功后,提交表单
            //获取到选择的checkbox数据,返回是数组,转成string
            const permissions=JSON.stringify(treeRef.value.getCheckedKeys())
            setMenuPost({name:form.name,permissions,id:form.id}).then(({data})=>{
                console.log(data,'setMenuPost');
            })
        }else{
            console.log('error submit!',fields);
        }
    })
}
```

总结:

按钮绑定click事件,触发表单校验,校验成功后提交表单(三个参数:name,id,permissions)---拿到三个参数;1.name,用户输入拿到 2.permissions:getCheckedKeys可以拿到选中当前选中节点 key 的数组,因为需要传入的是string,对拿到的id数组进行stringify;3.id:写一个隐藏的表单域,v-model=form.id,表单提交的时候会获取到id---调用接口,传数据

测试是否提交成功:提交成功后,调用请求列表数据api,在onMounted里刷新菜单列表,log里拿到两条新增的数据,即为成功

```js
//请求列表数据,需要传递分页的参数,因为是一个复用的逻辑,需要封装
const menuPermissionData=reactive({
    pageNum:1,
    pageSize:10,
})

const getListData=()=>{
    menuPermission(menuPermissionData).then(({data})=>{
        console.log(data,'menuPermission');
    })
}
```

```js
onMounted(() => {
    getListData()
})
```

## 21 菜单管理列表和编辑逻辑

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241022145942714.png" alt="image-20241022145942714" />

### 21.1 菜单管理

#### 自写

```js
const PermissionDataShow=reactive({
    showList:[],
    total:''
})
```

```js
const getListData=()=>{
    menuPermission(menuPermissionData).then(({data})=>{
        //console.log(data,'menuPermission');
        PermissionDataShow.list=data.data.list
        PermissionDataShow.total=data.data.total
        //console.log(PermissionDataShow);
    })
}
```

```js
setMenuPost({name:form.name,permissions,id:form.id}).then(({data})=>{
                //console.log(data,'setMenuPost');
                getListData()
                form.name=''
                form.permissions=''
            })
```

总结:将申请菜单管理列表封装成可复用的getListData函数---拿到菜单管理列表---:data渲染在table里---每次上传数据后刷新getListData函数+清空form表单

#### 教程

搭建静态页面

```js
<el-table :data="PermissionDataShow.list">
        <el-table-column label="id" prop="id"/>
        <el-table-column label="昵称" prop="name"/>
        <el-table-column label="菜单权限" prop='permissionName'/>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary">
            编辑
        </el-button>
            </template>
        </el-table-column>
    </el-table>
```

拿到数据

```js
//列表数据
const tableData=reactive({
    list:[],
    total:10
})
//请求列表数据,需要传递分页的参数,因为是一个复用的逻辑,需要封装
const menuPermissionData=reactive({
    pageNum:1,
    pageSize:10,
})

const getListData=()=>{
    menuPermission(menuPermissionData).then(({data})=>{
        const {list,total}=data.data
        tableData.list=list
        tableData.total=total
    })
}
```

封装一个关闭弹窗的方法

```js
el-dialog 
    v-model="dialogFormVisible" 
    :before-close="beforeClose"//组件自带
    >
```

```js
//关闭弹窗的回调
const beforeClose=()=>{
    dialogFormVisible.value=false
    //重置表单
    formRef.value.resetFields()
    //tree选择重置
    treeRef.value.setCheckedKeys(defaultKeys) 
}
```

封装一个打开弹窗的方法

```js
//封装编辑的弹窗的打开和关闭
const open=(rowData={})=>{
    dialogFormVisible.value=true
        //弹窗打开和form生成是异步的
        nextTick(()=>{
            if(rowData){
            //form是响应式数据，拼接的数据不能直接给form，会有数据都是问题，所以用浅拷贝，将传入的数据拼给form
            Object.assign(form,{id:rowData.id,name:rowData.name})
            //给tree组件设置permission
            treeRef.value.setCheckedKeys(rowData.permissions)
        }
    })
}
```

```js
<el-button type="primary" @click="open(null)">添加权限</el-button>
<el-button type="primary" @click="open(scope.row)">
                    编辑
                </el-button>
```

场景：打开编辑按钮，表单显示已选中的内容

报错：Uncaught ReferenceError: nextTick is not defined
    at Proxy.open (group.vue:116:5)

原因：导入错了nextTick，应该导入vue里的，不是process里的

## 22 表单剩余问题处理

### 22.1 提交表单后刷新最新页面+关闭弹窗(自写成功）

```js
if (valid){
            //校验成功后,提交表单
            //获取到选择的checkbox数据,返回是数组,转成string
            const permissions=JSON.stringify(treeRef.value.getCheckedKeys())
            setMenuPost({name:form.name,permissions,id:form.id}).then(({data})=>{
                //console.log(data,'setMenuPost');
                getListData()
                beforeClose()
            })
```

### 22.2分页

#### 自写

```vue
<el-pagination 
    class="pagination" 
    layout="total,sizes, prev, pager, next" 
    :page-sizes="[5, 10, 15, 20]"
    :total="tableData.total"
    v-model:current-page="menuPermissionData.pageNum"
    v-model:page-size="menuPermissionData.pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>
```

```vue
//分页数据
const menuPermissionData=reactive({
    pageNum:1,
    pageSize:10,
})
```

```vue
//分页
const handleSizeChange=(val)=>{
    val=menuPermissionData.pageSize
    getListData()
}
const handleCurrentChange=(val)=>{
    val=menuPermissionData.pageNum
    getListData()
}
```

总结：设定分页初始数据---v-model双向绑定分页数据---定义方法，传递val---让val等于分页数据，调用数据请求函数

### 22.3 通用面板抽成一个组件

```vue
import panelHead from '../components/panelHead.vue'
app.component('panelHead',panelHead)
```

```
<panel-head/>
```

写好panelHead组件---在main.js引入,变成全局的组件---在页面中直接使用

### 22.4 在button图标里引入图标

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241025214040669.png" alt="image-20241025214040669" style="zoom:50%;" />

```
import{Plus} from '@element-plus/icons-vue'
```

```
<el-button 
        :icon="Plus" 
```

```
.btns{
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
```

总结：引入总体图标库---：引入图标---修改样式

## -------菜单管理--------

## 23 账号管理列表

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241026092942946.png" alt="image-20241026092942946" style="zoom:50%;" />

<img src="C:\Users\iris\AppData\Roaming\Typora\typora-user-images\image-20241026092912648.png" alt="image-20241026092912648" style="zoom:50%;" />

### 23.1切换所属组别显示

```
//权限下拉
const options=ref([])
```

```js
onMounted(()=>{
    getAdminList()
    //权限下拉
    selectList().then(({data})=>{
        //console.log(data.data);
        options.value=data.data
    })
})
```

```js
//根据权限id匹配权限名称
const permissionName=(id)=>{
    const data=options.value.find(el=>el.id===id)
    //如果数据存在,读取name属性,不存在(首次创建的时候),读取超级管理员
    return data ? data.name:'超级管理员'
}
```

```js
<el-table-column 
        prop='permissions_id' 
        label="所属组别">
            <template #default="scope">
                {{permissionName(scope.row.permissions_id)}}
            </template>
        </el-table-column>
```

总结:拿到权限下拉列表后---定义一个函数,根据id匹配权限名称---在插槽里,传入每列的id,调用函数

### 23.2 切换状态显示

```js
<el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag 
                :type="scope.row.active ? 'success':'danger'"
                >{{scope.row.active?'正常':'失效'}}
                </el-tag>
            </template>
        </el-table-column>
```

总结:正常是1,失效是0,根据结果动态显示type

### 23.3 时间戳转换

##### 第一种 moment组件

```js
//时间转换函数封装
const dateShow=ref(0)
const timeFilter=(val)=>{
    if (val != null || val != "") { 
        let momentObj = moment(val).format("YYYY-MM-DD");
        return momentObj;
    }else{ 
        return '';
    }
}
```

```js
adminList.list.forEach((item)=>{
            //第一种时间戳转换
            //时间戳转换
            if(item.create_time!==0){
                dateShow.value=timeFilter(item.create_time)
            }
        })
```

总结:pnpm i momment下载,引入---定义一个时间转换函数---申请名单时候遍历,调用函数

##### 第二种 day.js组件

pnpm i dayjs

```js
adminList.list.forEach((item)=>{
            //第二种dayjs时间戳转换
            item.create_time=dayjs(item.create_time).format('YYYY-MM-DD')
        })
```

```js
<template #default="scope">
                <el-icon><Clock /></el-icon>
                <span>{{scope.row.create_time }}</span>
            </template>
```

总结:pnpm i momment下载,引入---申请名单时候遍历,调用dayjs方法---利用插槽,显示在页面上

## 24.账号管理编辑+分页功能

### 24.1分页

```js
 <!-- 分页 -->
    <el-pagination 
    class="pagination" 
    layout="total, prev, pager, next" 
    :total="adminList.total"
    :page-sizes="[5, 10, 15, 20]"
    v-model:current-page="paginationData.pageNum"
    v-model:page-size="paginationData.pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>
```

```js
//分页
const paginationData=reactive({
    pageNum:1,
    pageSize:10,
})
```

```js
//分页
const handleSizeChange=(val)=>{
    val=paginationData.pageSize
    getAdminList()
}
const handleCurrentChange=(val)=>{
    val=paginationData.pageNum
    getAdminList()
}
```

### 24.2编辑

静态页面搭建

```js
<el-dialog 
    v-model="centerDialogVisible" 
    :before-close="beforeClose"
    title="编辑用户" 
    width="500px">
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item 
            label="手机号" 
            prop="mobile">
                <el-input 
                v-model="form.mobile"
                disabled
                 />
            </el-form-item>

            <el-form-item 
            label="昵称" 
            prop="name" 
            required
            >
                <el-input 
                v-model="form.name"
                />
            </el-form-item>

            <el-form-item
            label="菜单权限"  
            prop="permissions_id"
            >
                <el-select
                v-model="form.permissions_id"
                placeholder="请选择菜单权限"
                style="width:240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :value="item.name"
                        :label="item.name"
                    />
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" 
                @click="submitForm(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
```

控制表单的开启关闭

```
//对话框开启关闭
const centerDialogVisible = ref(false)
```

```
//关闭弹窗的回调
const beforeClose=()=>{
    centerDialogVisible.value=false
}
```

表单验证

```js
const rules = reactive({
    name: [
        { required:true, trigger: 'blur' ,message:'请输入昵称'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
    permissions_id: [
        { required:true, trigger: 'blur' ,message:'请选择菜单权限'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
})
```

提交编辑表单

```
const formRef = ref()//拿到表单实例
```

```js
//确认后提交修改信息 表单提交
const submitForm=async(ElForm)=>{
    if (!ElForm) return//判断是否接收到表单实例
    await ElForm.validate((valid, fields) => {
        if (valid){
            const {name,permissions_id}=form
            editUserInfo({name,permissions_id}).then(({data})=>{
                if(data.code===10000){
                    centerDialogVisible.value=false
                    getAdminList()
                }
            })
        }else{
            console.log('error submit!',fields);
        }
    })
}
```

## --------账号管理---------

## 25 用户权限接口连调和动态路由数据组装

### 25.1账号登出

```vue
<!-- 下拉菜单 -->
            <el-dropdown @command="handleCommand">
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item >登录</el-dropdown-item>
                        <el-dropdown-item command="cancel">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
```

```js
//登出
const handleCommand=(command)=>{
    if(command==='cancel'){
        localStorage.removeItem('pz_token')
        localStorage.removeItem('pz_userInfo')
        router.push('/login')
        //window.location.href=window.location.origin
    }
}
```

总结:根据Dropdown组件自带的指令事件@command进行判断点击的是否是退出项---如果是,清除localstorage存的数据---路由守卫检测到没有token,自动跳转到登录页

### 25.2 用户权限接口连调

总结:登录的时候调用用户菜单权限api,根据账户先前设置的权限,动态拿到返回的数据(不同的用户的权限)---vite中自带的功能Glob 导入

[功能 | Vite 官方中文文档](https://vitejs.cn/vite5-cn/guide/features.html#glob-import)

## 26 动态路由添加和vuex持久化实现