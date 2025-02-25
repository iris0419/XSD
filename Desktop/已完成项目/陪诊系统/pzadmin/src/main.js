import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router'//1.1 引入
import store from './store' ////10.2.1引入store
import 'element-plus/dist/index.css'
import panelHead from '../components/panelHead.vue'

//刷新后的动态路由添加
const localData=localStorage.getItem('pz_v3pz')
if(localData){
  store.commit('dynamicMenu',JSON.parse(localData).menu.routerList)
  store.state.menu.routerList.forEach(item=>{
    router.addRoute('main',item)
  })
}
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

//beforeEach:它是在对routes进行对比之前做的一个校验
// router.beforeEach(
//   function (to, from, next) {
//       //验证token
//       if (to.path == '/') {
//           /** 读取登陆标志，然后根据登陆标志来实现具体业务 */
//           let token = localStorage.getItem('pz_token')
//           if (token) {
//               next()
//           } else {
//               /** 重定向 */
//               next('/login');
//           }
//       } else {
//           next();
//       }
//   })

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App) //1.2创建一个App的实例
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('panelHead',panelHead)
//1.3 路由挂载
app.use(router)
//10.2.2store挂载在vue的实例上
app.use(store)
app.mount('#app')
