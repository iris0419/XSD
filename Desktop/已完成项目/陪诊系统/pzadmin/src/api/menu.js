//发送验证码api
// 1. 导入刚才封装的 myAxios 函数
import request from "../utiles/request";

//菜单权限数据(tree组件)
export const getMenuList=(params) =>{
    return request.get("/user/getmenu",{params})
}

//权限修改
export const setMenuPost=(data) =>{
    return request.post("/user/setmenu",data)
}

//菜单权限列表 get请求的参数需要携带在url上面
export const menuPermission=(params) =>{
    return request.get("/menu/list",{params})
}
/* 用户管理 */
//账号管理api get请求的参数需要携带在url上面
export const authAdmin=(params) =>{
    return request.get("/auth/admin",{params})
}

//权限下拉
export const selectList=(params) =>{
    return request.get("/menu/selectlist",{params})
}

//用户信息修改
export const editUserInfo=(data) =>{
    return request.post("/update/user",data)
}
