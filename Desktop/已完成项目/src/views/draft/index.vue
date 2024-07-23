<template>
  <!-- 侧边导航 -->
  <el-col :span="4">
    <el-input  style="width: 250px" placeholder="请输入" />
      <el-menu
        class="myMenu"
      >  
      <el-menu-item ><el-icon><MessageBox /></el-icon>全部</el-menu-item>
         <el-sub-menu index="1">
            <template #title><el-icon><Message /></el-icon>劳动用工合同</template>
            <el-menu-item >劳动合同001</el-menu-item>
            <el-menu-item >劳动合同002</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title><el-icon><User /></el-icon>买卖合同</template>
            <el-menu-item >买卖合同001</el-menu-item>
            <el-menu-item >买卖合同002</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title><el-icon><User /></el-icon>知识产权合同</template>
            <el-menu-item >知识产权合同001</el-menu-item>
            <el-menu-item >知识产权合同002</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title><el-icon><User /></el-icon>委托合同</template>
            <el-menu-item >委托合同001</el-menu-item>
            <el-menu-item >委托合同002</el-menu-item>
          </el-sub-menu>
          
      </el-menu>
    </el-col>
  
    <el-col class="operation">
      <div class="search">
        <div>
        合同编号:<el-input  style="width: 250px" placeholder="请输入合同编号查询" v-model="fileNum"/>
        </div>
        <div>
        合同名称:<el-input  style="width: 250px" placeholder="请输入合同名称查询" v-model="fileName"/>
        <el-button type="primary" @click="searchInfo">查询</el-button>
        <el-button @click="update">重置</el-button>
        </div>
      </div>

      <div class="button">
        <el-button type="primary">批量删除</el-button>
        <el-button>批量操作</el-button>
      </div>

      <RouterView></RouterView>
    </el-col>

</template>

<script>
import {MessageBox,Message,User} from '@element-plus/icons-vue'


export default{
  
  components:{
    MessageBox,
    Message,
    User
  },
}
</script>

<style scoped lang="scss">
// .operation{
//   background-color: blue;
//   // flex-wrap: nowrap;
// }
.search{
  display: flex;
  // background-color: aqua;
  // flex-wrap: nowrap;
  // align-content: space-between
}
// .button{
//   // background-color: blanchedalmond;
// }
</style>