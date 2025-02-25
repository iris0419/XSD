<template>
  <div class="common-layout">
    <el-container>
      <!-- 1.3 合适位置使用组件 -->
       <Aside/>  
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '../components/aside.vue'; //1.2 组件引入
import Header from '../components/navHeader.vue'
</script>

<style lang="less" scoped>
.common-layout{
  height: 100%;
  .el-container{
    height: 100%;
  }
}
</style>