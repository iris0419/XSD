// import './assets/main.css'
import "normalize.css/normalize.css";
import { Icon } from '@iconify/vue';
import 'element-plus/dist/index.css';
import store from "./stores/index";
import ElementPlus from 'element-plus';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import locale from 'element-plus/es/locale/lang/zh-cn';

import 'dayjs/locale/zh-cn';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('Icon', Icon)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale
  })

app.mount('#app')
