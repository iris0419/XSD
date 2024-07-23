<template>
  <!--
    路由出口
      路由表中的匹配渲染规则指定的 component 会按照路由的层级 决定那一个渲染到这个标签中

    当前的 RouterView 为 一级路由出口, 所有的一级路由对应页面都在这个标签中展示
  -->
  <RouterView />
</template>

<style >
  html,
  body,
  #app,
  .el-container {
      height: 100%;
  }
</style>
