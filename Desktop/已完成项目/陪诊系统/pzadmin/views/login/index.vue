<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <!-- 图片 -->
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <!-- 超链接切换 -->
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
            </div>
            <!-- 表单 -->
            <!-- input属性 prefix-icon	自定义前缀图标 -->
            <el-form 
            :model="loginForm" 
            :rules="rules" 
            ref="loginInFormRef"
            >
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" placeholder="密码" type="password"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item prop="validCode" v-if="formType">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <template #append>
                            <span @click="countDownChange">{{ countDown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 按钮 -->
            <el-form>
                <el-button type="primary" @click="submitForm(loginInFormRef)">{{ formType ? '注册账号' : '登录' }}
                </el-button>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
/* 导入封装的校验手机号请求 */
import { loginIn,testValidCode,getValidCode,getUserPermissions } from '../../src/api/login';
import { ref, reactive,computed,toRaw } from 'vue' //基础数据用ref,对象用reactive
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";//引入反馈组件中的'消息提示'
/* 引入路由 */
import { useRouter } from "vue-router";
//创建路由方法集合
const router = useRouter();

//拿到store的实例
import { useStore } from 'vuex';
const store=useStore()
//控制台匹配路由
const routerList=computed(()=>store.state.menu.routerList)
const imgUrl = new URL('../../public/login-head.png', import.meta.url).href

//表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
})
//切换表单(0登录 1注册)
const formType = ref(0)
//切换登录和注册
const handleChange = () => {
    //vue3修改ref响应式数据,用.value,如果存在就赋值为0,不存在就1
    formType.value = formType.value ? 0 : 1
}

//表单验证
//手机号校验
const validateUser = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
        phoneReg.test(value) ? callback() : callback(new Error('请输入正确手机号'))
    }
}
//密码校验
const validatePass = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        const pass = /^[a-zA-Z0-9_-]{4,16}$/; // 密码正则,4-16位字符
        pass.test(value) ? callback() : callback(new Error('密码格式不对,需要4-16位字符'))
    }
}

const rules = reactive({
    userName: [
        { validator: validateUser, trigger: 'blur' } //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
    passWord: [
        { validator: validatePass, trigger: 'blur' }
    ],
})

//第一种:切换验证码和倒计时
/* const msgText = ref("发送验证码");
const msgValue = ref(60);
// 2.点击发送验证码按钮, 开始倒计时
async function getMsgCodeBtn() {
    msgText.value = "剩余60s ";
    msgValue.value--;

    const timerId = setInterval(() => {
        msgText.value = `剩余${msgValue.value}s`;
        msgValue.value--;

        if (msgValue.value === -1) {
            msgText.value = "发送验证码";
            msgValue.value = 60;
            clearInterval(timerId);
        }
    }, 1000);
} */
//第二种:切换验证码和倒计时
const countDown=reactive({
    validText:'获取验证码',
    time:60
})
//不让创建多个定时器
let flag=false
const countDownChange=()=>{
    //如果已发送就不处理
    if(flag) return
    //判断手机号是否正确 //正则,数字1开头,11位数字
    const pattern = /^(?:(?:\+|00)86)?1\d{10}$/; 
    if(!loginForm.userName ||!pattern.test(loginForm.userName)){
        return ElMessage({
            type: "warning",
            message: '请输入正确手机号码'
        }); 
    }
    //定时器
    let timer=setInterval(()=>{
        if(countDown.time<=0){
            clearInterval(timer)
            countDown.time=60
            countDown.validText='获取验证码'
            flag=false
        }else{
            countDown.time-=1
            countDown.validText=`剩余${countDown.time}秒`
        }
    },1000)
    flag=true

    //接收验证码api
    getValidCode({tel:loginForm.userName}).then(({data})=>{
        //console.log(data,'data')
        if(data.code===10000){
            ElMessage.success('发送成功')
        }
    })
}

//表单提交
/* 自写(成功) */
// const submitForm=()=>{
//     if (formType.value === 1) {
//         //注册api,验证验证码api
//         testValidCode({
//             userName: loginForm.userName,
//             passWord: loginForm.passWord,
//             validCode: '1234'
//         }).then(({ data }) => {
//             if (data.code !== 10000) {
//                 ElMessage.warning(data.message)
//             }
//             //console.log(data,'data')//注册成功
//             if (data.code === 10000) {
//                 ElMessage.success('注册成功')
//             }
//         })
//     }
    
//     if (formType.value === 0) {
//         //登录api
//         loginIn({
//             userName: loginForm.userName,
//             passWord: loginForm.passWord,
//         }).then(({ data }) => {
//             //console.log(data,'data')
//             //根据请求结果做出不同反馈
//             // 错误前置
//             if (data.code !== 10000) {
//                 ElMessage.warning(data.message)
//             }
//             if (data.code === 10000) {
//                 ElMessage.success('登录成功')
//                 //登录成功后跳转首页
//                 router.push("/")
//             }
//         })
//     }

// }
/* 教程 */
const loginInFormRef = ref()//拿到表单实例
const submitForm = async (loginInFormRef) => {
    if (!loginInFormRef) return//判断是否接收到表单实例
    //如有,手动触发表单校验validate规则
    await loginInFormRef.validate((valid, fields) => {
        if (valid) {
            //console.log(loginForm, 'submit!')
            //注册页面
            if (formType.value) {
                testValidCode(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功,请登录!')
                        formType.value = 0
                    }
                })
            } else {
                //登录页面
                loginIn(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功')
                        //将token信息/用户 缓存到浏览器
                        localStorage.setItem('pz_token',data.data.token)
                        //userInfo是对象,是引用数据类型,localStorage没办法传引用数据类型,所以用JSON.stringify转成字符串
                        localStorage.setItem('pz_userInfo',JSON.stringify(data.data.userInfo))
                        //向vuex存入数据
                        //store.commit('showUserName', data.data.userInfo)
                        //调用获取用户权限的接口
                        getUserPermissions().then(({data})=>{
                            //console.log(data.data,'getUserPermissions');
                            store.commit('dynamicMenu',data.data)
                            console.log(routerList,'routerList');
                            //toRaw将响应式数据转为普通数据
                            toRaw(routerList.value).forEach(item => {
                                router.addRoute('main',item)
                            });
                            
                            //登录成功后跳转首页
                            router.push("/")
                        })
                    }
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="less" scoped>
:deep(.el-card__hearder) {
    padding: 0;
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;
        }
    }

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }

    .el-button {
        width: 430px;
        //background-color: aqua;
    }
}
</style>
