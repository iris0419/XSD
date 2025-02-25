// 内部存储关于请求的二次封装代码
import axios from "axios";
import { ElMessage } from "element-plus";//引入反馈组件中的'消息提示'

// 官网提供的实例,封装一个 自己的 axios 后续我们的请求利用 instance 发送
const instance = axios.create({
    // 请求的基准地址
    baseURL: "https:/v3pz.itndedu.com/v3pz",
    // 请求最大超时时间, 单位是毫秒
    timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token=localStorage.getItem('pz_token')//在发送请求前,添加token
    //不需要添加token的api
    const whiteUrl=['/get/code','/user/authentication','/login']
    //如果url里有token且不在whiteUrl里,添加token
    if (token && !whiteUrl.includes(config.url)){
        config.headers['x-token']=token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //对接口异常的数据,需要给用户提示
    if(response.data.code===-1){
        ElMessage.warning(response.data.message)
    }
    //如果token有问题,清除掉页面的token和用户信息,跳转到首页
    if(response.data.code===-2){
      localStorage.removeItem('pz_token')
      localStorage.removeItem('pz_userInfo')
      window.location.href=window.location.origin
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance