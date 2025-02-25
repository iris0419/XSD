const state={
    userInfoShow:{}
}
//定义方法
const mutations={
    // 修改state中的属性
    // 默认参数可获取state中所有数据，第二参数为页面传入数据
    showUserName(state, ele) {
      // 通过事件可对state内任意数据进行修改
      state.userInfoShow = ele;
    },
}
//ES6简写,当变量名=变量值,可以写简写
export default{
    state,
    mutations
}
  
  