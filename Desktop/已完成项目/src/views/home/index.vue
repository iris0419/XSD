<template>
    <!-- 二级路由出口 -->
          <!-- <RouterView />  -->
           <!-- 先分左右，再在左的那边分上下 -->

           <div class="left">

<div class="top">
  <div class="daiban">
      <span class="daiban1">我的待办</span>
  </div>

  <div class="four">

      <div class="one">
          <div class="left3">
              <el-avatar :size="70" style="background-color:#f6f7fb;"> <Icon icon="la:file-invoice" style="color: #789bf9;font-size: 26px;" /></el-avatar>

          </div>


          <div class="right3">
           
              <div class="top3">待审批</div>
              <div class="bottom3">
                  <div class="left4" style="font-weight: bold;">13</div>
                  <div class="right4">个</div>

          </div>

          </div>

      </div>


      <div class="two">

          <div class="left3">
              <el-avatar :size="70" style="background-color:#f6f7fb;"> <Icon icon="subway:file-10"  style="color: #df79fe;font-size: 26px;"/> </el-avatar>

          </div>


          <div class="right3">
              <div class="top3">待签署</div>
              <div class="bottom3">
                  <div class="left4" style="font-weight: bold;">10</div>
                  <div class="right4">个</div>


              </div>


          </div>

      </div>

      <div class="three">
          <div class="left3">
              <el-avatar :size="70" style="background-color:#f6f7fb;"> <Icon icon="fa-regular:comment-dots" style="color: #fda979;font-size: 26px;"/>  </el-avatar>

          </div>


          <div class="right3">
              <div class="top3">待结算</div>
              <div class="bottom3">
                  <div class="left4" style="font-weight: bold;">20</div>
                  <div class="right4">个</div>


              </div>


          </div>

      </div>


      <div class="four1">

          <div class="left3">
              <el-avatar :size="70" style="background-color:#f6f7fb;"><Icon icon="la:file-medical-alt" style="color: #3ab4f3;font-size: 26px;"/>  </el-avatar>

          </div>
          <div class="right3">
              <div class="top3">待归还</div>
              <div class="bottom3">
                  <div class="left4" style="font-weight: bold;">4</div>
                  <div class="right4">个</div>


              </div>


          </div>



      </div>

  </div>

</div>
<div class="middle"></div>
<div class="bottom">

  <div class="xiaoxi">
      <Icon icon="fluent-mdl2:calendar-agenda" style="margin: 0px 10px 0px 0px;font-size: 20px; color: #5ab6e6;"/>
      <h3>消息提醒</h3>
  </div>

  <div class="daohang">
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo1" 
      mode="horizontal" 
      @select="handleSelect">
          <el-menu-item index="1">待办（50）</el-menu-item>
         
          <el-menu-item index="3" >已处理（10）</el-menu-item>
         
          </el-menu>

  </div>

  <div class="table">
  <el-table :data="tableData"
   style="width: 100%" 
   :border="true"
   :header-cell-style = "{color: '#000',background:'#f5f5f5',textAlign: 'center'}"
   >
  <el-table-column prop="date" label="单据编号" width="248" />
  <el-table-column prop="name" label="消息主题" width="292" />
  <el-table-column prop="name" label="状态" width="150" />
  <el-table-column prop="name" label="创建时间" width="282" />
  <el-table-column prop="address" label="操作" />
</el-table>



  </div>
</div>
</div>

<div class="right">

    <div class="top3">
    <div class="top4">
        <Icon icon="fluent-emoji-flat:clapping-hands" style="font-size: 42px; margin-right: 10px;margin-left: 16px;" />
        <h2>欢迎回来，Sunshine</h2>

    </div>

    <div class="Calendar">

        <el-calendar v-model="selectedDate" />
    </div>

 </div>


 <div class="middle3">

    <div class="top6">
    <h3>快捷入口</h3>
</div>


<div class="bottom6">

    <div class="top8">
        <div class="th1">
            <Icon icon="mdi:calendar-text-outline" style="font-size: 26px;margin-right: 10px;"/>
            <span style="font-size: 22px;">合同起草</span>

        </div>
        <div class="th2">
            
            <Icon icon="cil:color-border" style="font-size: 26px;margin-right: 10px;"/>
            <span style="font-size: 22px;">合同签署</span>
        </div>
    </div>


    <div class="middle8">

        <div class="th3">
            <Icon icon="flowbite:file-copy-outline"  style="font-size: 26px;margin-right: 10px;"/>
            <span style="font-size: 22px;">合同结算</span>


        </div>


        <div class="th4">

            <Icon icon="carbon:document-multiple-02" style="font-size: 26px;margin-right: 10px;"/>
            <span style="font-size: 22px;">我的合同</span>
        </div>             

    </div>


    <div class="bottom8">
        <div class="th5">
            <Icon icon="carbon:stamp" style="font-size: 26px;margin-right: 10px;"/>
            <span style="font-size: 22px;">印章管理</span>
        </div>
        <div class="th6">
            
        </div>
    </div>

</div>


 </div>

 <div class="bottom3">
    <div class="top5">

        <div class="left5">
            <h3>帮助文档</h3>
        </div>
        

        <div class="right5">
            <span style="font-size: 12px;color: #6191ff;font-weight: bold;">查看更多</span>
        </div>

    </div>

    <div class="bottom5">
        <div class="top7">

            <div class="five">产品概括</div>
            <div class="six">使用指南</div>

        </div>

        <div class="bottom7">

            <div class="seven">接入流程</div>
             <div class="eight">接口文档</div>

        </div>
 
    </div>


 </div>


</div>
 </template>
 
 <script lang="ts" >
 import { RouterView } from 'vue-router';
 import { defineComponent,ref } from 'vue'; 
 interface TableRow {  
  id: string;  
  title: string;  
  state: string;  
  time:string;
  work:string
} 
 export default defineComponent({
    // name: 'MyMenu',
    // name: 'CalendarDemo',  
    setup() {  
    // 定义响应式变量来存储当前激活的菜单项索引  
    const activeIndex = ref('1'); // 假设默认激活首页  
  
    // 定义handleSelect方法，用于处理菜单项的选中事件  
    const handleSelect = (index: string | number, indexPath: string[]) => {  
      console.log(index, indexPath);  
      // 根据需要更新activeIndex或其他逻辑  
    };  

    const selectedDate = ref<Date | null>(null);

    const tableData = ref<TableRow[]>([  
      { id: '1', title: '2', state: '3', time:'4', work:'5'},  
      
      // ...更多数据  
    ]);  
  
    // 返回给模板的响应式数据和函数  
    return {  
      activeIndex,  
      handleSelect,  
      selectedDate,
      tableData,
    };  
  },  
     data() {
       return {
        //  activeIndex: '1',
        //  activeIndex2: '1',
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
         .hr{
             margin: 0;
             padding: 0;
         }
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
         // .title-large{
             
         // }
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
         .el-main{
             background-color: #fff;
         }
 
         .a-aside {
             background-color: #fff;
             margin-right: 10px;
             // border-bottom:none
         .el-menu {
             border-right:none
         }
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
             // padding-left: 26px;
             // border-bottom:2px solid #f4f5f8; 
            
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
             display: flex;
             flex-direction: column;

         .top3{
             height: 508px;
             background-color: #fff;
             margin-bottom: 10px;
        .top4{
            height: 80px;
            // background-color: red;
            border-bottom:2px solid #f4f5f8; 
            display: flex;
            align-items: center;
            
        }
        .Calendar{
        // 去除.el-calendar-table表格中所有tr td的边框
        :deep(.el-calendar-table tr td) {
                border: none;
            }
        
        :deep(.el-calendar-table .el-calendar-day){
            height: 54px;
            text-align: center;
            line-height: 36px;
        } 
        
        
        }
         }


         .middle3{
             height: 330px;
             background-color: #fff;
             margin-bottom: 10px;
             display: flex;
             flex-direction: column;
        .top6{
            width: 100%;
            height: 72px;
            // background-color: red;
            padding-left: 20px;

        }

        .bottom6{
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 16px;
        
        .top8{
            height: 67px;
            width: 100%;
            // background-color: black;
            padding-bottom: 15px;
            display: flex;
        .th1{

            width: 50%;
            height: 100%;
            display: flex;
            // background-color: red;
            // border: 1px solid #adabab;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 18px;
            border: 1px solid #adabab;
            margin-right: 18px;
        }
        .th2{
            width: 50%;
            height: 100%;
            display: flex;
            // background-color: black;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 18px;
            border: 1px solid #adabab;
        }
        
            
        }
        .middle8{
            
            height: 67px;
            width: 100%;
            // background-color: red;
            padding-bottom: 15px;
            padding-top: 15px;
            display: flex;
            .th3{
                width: 50%;
                height: 100%;
                display: flex;
                // background-color: red;
                // border: 1px solid #adabab;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 18px;
                border: 1px solid #adabab;
                margin-right: 18px;
             }
            .th4{
                width: 50%;
                height: 100%;
                display: flex;
                // background-color: black;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 18px;
                border: 1px solid #adabab;
            }

        }
        .bottom8{
            height: 67px;
            display: flex;
            width: 100%;
            padding-top: 15px;
            // margin-right: 9px;
            
            // flex: 1;
            .th5{
                width: 50%;
                height: 100%;
                display: flex;
                // background-color: red;
                // border: 1px solid #adabab;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 18px;
                // padding-top: 18px;
                // padding-left: 18px;
                // padding-bottom: 18px;
                // padding-right: 27px;
                border: 1px solid #adabab;
                margin-right: 18px;
                
             }
             .th6{
                width: 50%;
                height: 100%;
                display: flex;
                // background-color: black;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 18px;
                // border: 1px solid #adabab;
            }
            
        
        }

        }

         }


         .bottom3{
            flex: 1;
            background-color: #fff;
            display: flex;
            flex-direction: column;
        .top5{
            height: 56px;
            width: 100%;
         
            display: flex;
            padding-left: 20px;
            padding-right: 20px;
            box-sizing: border-box;
            
        .left5{
               width: 50%;
            //    background-color: blue;
            }   
       
        .right5{
            flex: 1;
            width: 50%;
            // background-color: green;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            

        }

        }
        
        .bottom5{
            display: flex;
            flex-direction: column;
            flex: 1;
            padding-left: 44px;
            padding-right: 44px;

        .top7{
            height: 62px;
            display: flex;
        .five{
            width: 50%;
            display: flex;
            align-items: center;
        }
        .six{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        }
        .bottom7{
            flex: 1;
            display: flex;
        


        .seven{
            width: 50%;
            display: flex;
           
          
        }
        .eight{
            width: 50%;
            display: flex;
            justify-content: flex-end;
       
        }
        }
        }

         }
        
     }
 
 }
}
 </style>
 