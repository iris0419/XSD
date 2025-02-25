//发送验证码api
// 1. 导入刚才封装的 myAxios 函数
import request from "../utiles/request";

// 2. 导出一些封装好的 请求函数(登录请求的封装)

export const getValidCode=(data) =>{
    return request.post("/get/code",data)
}

//注册api

export const testValidCode=(data) =>{
    return request.post("/user/authentication",data)
}

//登录api

export const loginIn=(data) =>{
    return request.post("/login",data)
}

//用户菜单权限
export const getUserPermissions=() =>{
    return request.get("/menu/permissions")
}