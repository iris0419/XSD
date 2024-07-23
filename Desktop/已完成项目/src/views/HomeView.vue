<template>
  <el-container>
     <el-header class="a-header">
      <el-container>

            <el-aside width="296px">
              <div class="title">
                <Icon icon="la:file-alt" className="icon-large" style="margin: 0px 16px 0px 16px;font-size: 36px;color: #8dc2ff;"/>
                <span className="title-large">
                    <h3>CMIS合同管理系统</h3>
                </span>
            </div>
            </el-aside>
             <el-main class="icon1">
              <span class="icon2">
                    <Icon icon="basil:menu-solid" style="margin: 0px 50px 0px 16px;font-size: 36px;"/>
                    <Icon icon="basil:search-solid" style="font-size: 36px;"/>
                    <input v-model="input"  placeholder="输入要查询的关键词">
                    </input>
                </span>
                <span class="icon3">
                    <Icon icon="fluent:search-32-regular" style="font-size: 36px;"/>
                    <Icon icon="hugeicons:translate" style="font-size: 36px;"/>
                    <Icon icon="pepicons-pop:bell-circle" style="font-size: 36px;"/>
                    <Icon icon="pepicons-pencil:sun-circle-filled" style="font-size: 36px;"/>
                    <Icon icon="mynaui:letter-a-circle" style="font-size: 36px;color: #4080ff;"/>
                </span>
            </el-main>

         </el-container>
     </el-header>
     <el-container>
       <el-aside width="296px" class="a-aside">
        <el-menu
         default-active="this.$route.path" router
         @open="handleOpen"
        
        >
        <el-menu-item index="/home/work">
          <template #title>
            <Icon icon="flowbite:list-outline" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">工作台</span>
          </template>  
        </el-menu-item>
        <el-sub-menu index="/home/draft">
          <template #title>
            <Icon icon="mdi:calendar-text-outline" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同起草</span>
          </template>
            <el-menu-item index="/home/draft/mydraft">我的草稿</el-menu-item>   
            <el-menu-item index="/home/draft/write">起草合同</el-menu-item>   
        </el-sub-menu>
        <el-sub-menu index="/home/manager">
          <template #title>
            <Icon icon="pajamas:status-alert" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同管理</span>
          </template>
            <el-menu-item index="/home/manager/mycon">我的合同</el-menu-item>  
            <el-menu-item index="/home/manager/conapp">合同审批</el-menu-item>    
        </el-sub-menu>
        <el-menu-item index="/home/sign">
          <template #title>
            <Icon icon="cil:color-border" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同签署</span>
          </template>   
        </el-menu-item>
        <el-sub-menu index="/home/lx">
          <template #title>
            <Icon icon="mdi:calendar-check-outline" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同履行</span>
          </template>
            <el-menu-item index="5-1">所有合同</el-menu-item>     
        </el-sub-menu>
        <el-menu-item index="/home/risk">
          <template #title>
            <Icon icon="carbon:user" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同风险</span>
          </template>  
        </el-menu-item>
        <el-sub-menu index="/home/files">
          <template #title>
            <Icon icon="carbon:document-multiple-02" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">合同档案</span>
          </template>
            <el-menu-item index="7-1">合同归档</el-menu-item>  
            <el-menu-item index="7-2">合同借阅</el-menu-item>    
        </el-sub-menu>
        <el-sub-menu index="/home/seal">
          <template #title>
            <Icon icon="carbon:stamp" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;">印章管理</span>
          </template>
            <el-menu-item index="8-1">印章管理</el-menu-item>  
            <el-menu-item index="8-2">印章分类</el-menu-item>   
            <el-menu-item index="8-3">用章日志</el-menu-item>  
        </el-sub-menu>
        <el-sub-menu index="/home/config">
          <template #title>
            <Icon icon="mingcute:settings-4-line" style="font-size: 26px;" />
            <span style="font-size: 22px;width: 290px;">基础配置</span>
          </template>
            <el-menu-item index="9-1">模板库</el-menu-item>  
        </el-sub-menu>
        <el-menu-item index="/home/sysm">
          <template #title>
            <Icon icon="mingcute:android-2-line" style="font-size: 26px;"/>
            <span style="font-size: 22px;width: 290px;border-right: 4px solid var(--el-menu-active-color)">系统管理</span>
          </template>  
        </el-menu-item>
      </el-menu>

       </el-aside>

       <el-main class="my">
            <!-- 二级路由出口 -->
            <RouterView /> 
      
            

        </el-main>

     </el-container>
   </el-container>
</template>

<script lang="ts" >
import { RouterView } from 'vue-router';
import { defineComponent } from 'vue'; 
export default defineComponent({
    data() {  
    return {  
      // 为input属性指定一个字符串类型  
      input: '',  
    };  
  },  
    methods: {
      handleOpen(key:any, keyPath:any[]) {
        // console.log(key, keyPath);
      },
    }
  });
</script>

<style scoped lang="scss">
section{
    background: #f4f5f8;
    //整个的上面
        .a-header{
            // background-color: red;
            margin:0;
            padding: 0;
            margin-bottom: 10px;
            
        //图标+标题
        .title{
            background-color: #fff;
            display: flex;
            align-items: center;
            margin-right: 2px;
        
        }
        //main
        .icon1{
            display: flex;
            justify-content: space-between;
        }
        //main里面两个图标+输入框
        .icon2{
            display: flex;
            align-items: center;
            width: 500px;
        //输入框去除边框
        input{
            border: 0;
            outline: 0;
            height: 100%;
        }
        }
        //五个图标
        .icon3{
            display: flex;
            width: 330px;
            justify-content: space-between;
        }
        }
        .a-aside {
            background-color: #fff;
            margin-right: 10px;
             // border-bottom:none
        .el-menu {
            border-right:none
        }
        }
        .el-main {
            background-color: #fff;

        }
        .my {
            background-color: #fff;
            height: 100%;
            padding: 0;
            //父级display
            display: flex;
            margin-top: 10px;
           
           
        .left{
            flex: 1;
            display: flex;
            //水平布局变垂直
            flex-direction: column;
            padding-top: 38px;

            .top{
            height: 225px;
            padding-left: 32px;
            padding-right: 32px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        .daiban{
            height: 70px;
           
            border-bottom:2px solid #f4f5f8; 
            margin-bottom: 10px;
       
        .daiban1{
            font-size: 20px;
            font-weight: bold; 
           
           
        }
        
        }
         .four{
           display: flex;
            flex: 1;
            width: 100%;
            height: 100%;
            display: flex;
            // background-color: black;
        .one{
            display: flex;
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            // background-color: red;
        .left3{
           display: flex;
           width: 50%;
           justify-content: flex-end;
           align-items: center;
           padding-right: 14px;
        }
        .right3{
            width: 50%;
            margin-top: 38px;
            margin-bottom: 38px;
            border-right:2px solid #f4f5f8; 
            

        .top3{
            height: 50%;
            display: flex;
            flex-direction: column-reverse;
            
        }
        .bottom3{
            height: 50%;
            display: flex;
            .left4{
                display: flex;
                width: 50%;
            }
            .right4{
                width: 50%;
            }
        
    }





        }
        }


        .two{
            display: flex;
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            // background-color: red;
        .left3{
           display: flex;
           width: 50%;
           justify-content: flex-end;
           align-items: center;
           padding-right: 14px;
        }
        .right3{
            width: 50%;
            margin-top: 38px;
            margin-bottom: 38px;
            border-right:2px solid #f4f5f8; 
          
        .top3{
            height: 50%;
            display: flex;
            flex-direction: column-reverse;
            
        }
        .bottom3{
            height: 50%;
            display: flex;
            .left4{
                display: flex;
                width: 50%;
            }
            .right4{
                width: 50%;
            }
        }
        }
        }


        .three{
            display: flex;
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            // background-color: red;
        .left3{
           display: flex;
           width: 50%;
           justify-content: flex-end;
           align-items: center;
           padding-right: 14px;
        }
        .right3{
            width: 50%;
            margin-top: 38px;
            margin-bottom: 38px;
            border-right:2px solid #f4f5f8; 
          
        .top3{
            height: 50%;
            display: flex;
            flex-direction: column-reverse;
            
        }
        .bottom3{
            height: 50%;
            display: flex;
            .left4{
                display: flex;
                width: 50%;
            }
            .right4{
                width: 50%;
            }
        }
        }
        }
       

        .four1{
            display: flex;
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            // background-color: red;
        .left3{
           display: flex;
           width: 50%;
           justify-content: flex-end;
           align-items: center;
           padding-right: 14px;
        }
        .right3{
            width: 50%;
          
        .top3{
            height: 50%;
            display: flex;
            flex-direction: column-reverse;
            
        }
        .bottom3{
            height: 50%;
            display: flex;
            .left4{
                display: flex;
                width: 50%;
            }
            .right4{
                width: 50%;
            }
        }
        }
        }

        

   

    




 
        }

        }
        .middle{
            height: 20px;
            background-color: #f4f5f8;
        }
        .bottom{
            padding-left: 32px;
            padding-right: 32px;
            flex: 1;
            display: flex;
            flex-direction: column;
        
        .xiaoxi{
            height: 66px;
            display: flex;
            align-items: center;
            border-bottom:2px solid #f4f5f8; 
            margin-bottom: 10px;
        }
        .daohang{
            height: 86px;
            // background-color: red;
        .el-menu-demo1{
            border-bottom: none;
        }
        }
  

        }
        }
        .right{
            width: 376px;
            background: #f4f5f8;
            padding-left: 20px;
        .top3{
            height: 508px;
            background-color: black;
        }
        .middle3{
            height: 330px;
            background-color: red;
        }
        .bottom3{
            background-color: pink;
        }
        }
       
    }

}

</style>
