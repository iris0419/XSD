<!-- 1.1 aside组件封装  -->
 <template>
    <el-menu 
    :style="{width:!isCollapse ? '230px':'64px'}"
    active-text-color="#ffd04b" 
    background-color="#545c64" 
    class="el-menu-vertical-demo" 
    default-active="2"
    text-color="#fff" 
    :collapse="isCollapse"
    > <p class="logo-lg">{{!isCollapse ? '安心陪诊':'安心'}}</p>
     <!-- 1.1抽离子菜单组件 -->
     <TreeMenu :index='1':menuData="menuData"/> 
    </el-menu>
 </template>


<script setup>
import TreeMenu from './treeMenu.vue'; //1.2
// 7.1获取router的实例
import {useRouter} from 'vue-router' 
//7.2 创建响应式数据 拿到menu数据
import { reactive,computed } from 'vue';
const router=useRouter()
//console.log(router);//options下有routes的数据
//const menuData=reactive(router.options.routes[0].children)
//侧边栏由数据动态拼接而成
const menuData=computed(()=>store.state.menu.routerList)
//console.log(menuData);

//10.3.1拿到store的数据
//10.3.2拿到store的实例
import { useStore } from 'vuex';
const store=useStore()
const isCollapse= computed(()=>store.state.menu.isCollapse)
//10.3.3给到页面上使用

//7.3通过父子组件通信传到子组件TreeMenu
// 7.3.1 <TreeMenu :menuData="menuData"/> bind绑定
// 7.3.2 defineProps获取

</script>

<style lang="less" scoped>
.logo-lg{
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
}
</style>