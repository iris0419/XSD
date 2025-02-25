<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon size="20" class="icon" @click="store.commit('collapseMenu')">
                <Fold />
            </el-icon>
    
            <ul class="flex-box">
                <li 
                v-for="(item,index) in selectMenu" 
                :key="item.path"
                class="tab flex-box"
                :class="{selected:route.path===item.path}"
                >
                <el-icon size="12" ><component :is="item.icon"/></el-icon>
                <router-link class="text flex-box" :to="{path:item.path}">
                    {{ item.name }}
                </router-link>
                <el-icon size="12" class="close" @click="closeTab(item,index)"><Close/></el-icon>
                </li>
            </ul>

        </div>
        <div class="header-right">
            <!-- 下拉菜单 -->
            <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link flex-box">
                    <div>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </div>
                    <p class="userName">{{ userInfo.name }}</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item >登录</el-dropdown-item>
                        <el-dropdown-item command="cancel">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
//拿到store的实例
import { useStore } from 'vuex';
//引入路由
import { useRoute,useRouter } from 'vue-router';
import { computed, reactive} from 'vue';
const store=useStore()
const route=useRoute()
const router=useRouter()

const selectMenu=computed(()=>store.state.menu.selectMenu)//顺序:store.state.模块.数据
//登出
const handleCommand=(command)=>{
    if(command==='cancel'){
        localStorage.removeItem('pz_token')
        localStorage.removeItem('pz_userInfo')
        window.location.href=window.location.origin
    }
}
//登录拿到store里的userInfo
const userInfo=reactive({
    avatar:'',
    name:''
})
const userInfomation=store.state.userInfo.userInfoShow
userInfo.avatar=userInfomation.userInfo
userInfo.name=userInfomation.name
//console.log(userInfo);

//点击关闭tag
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
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
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
            height: 100%;
        }
        .tab{
            padding: 0 10px;
            height: 100%;
            .text{
                margin: 0 5px;
            }
            .close{
                visibility: hidden;
            }
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
        }
        .tab:hover{
            background-color:#f5f5f5;
            .close{
                visibility:inherit;
                cursor: pointer;
                color: #000;
            }
        }
    }
    .header-right{
        .userName{
            margin-left: 10px;
        }
    }
    a{
        height: 100%;
        color: #333;
        font-size: 15px;
    }
}
</style>