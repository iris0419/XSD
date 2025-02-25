<template>

  <!-- 7.4 渲染数据 7.4.1没有子菜单 -->
  <template v-for="(item, index) in props.menuData">
    <el-menu-item 
    @click="handleClick(item,`${props.index}-${item.meta.id}`)" 
    v-if="!item.children || item.children.length === 0" 
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
      <tree-menu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
    </el-sub-menu>
  </template>

</template>


<script setup>
//8.1.2 获取router实例
import {useRouter} from 'vue-router' 
//11.2.1创建store实例
import { useStore } from 'vuex';
// 7.3.2 defineProps获取
const props = defineProps(['menuData','index'])
//console.log(props, 'props');
const router=useRouter()
//11.2.2创建store实例
const store=useStore()
//8.1.1点击菜单跳转
const handleClick=(item,active)=>{
  //console.log(item);
  //11.2.3 传入数据
  store.commit('addMenu',item.meta)
  //console.log(item.meta);
  //8.1.3 push跳转
  router.push(item.meta.path)
}
//8.1.4 路由出口

</script>