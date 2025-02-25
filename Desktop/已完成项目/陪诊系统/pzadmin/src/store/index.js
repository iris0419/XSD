//10.1 创建一个store的实例
import{createStore} from'vuex'
import createPersistedState from "vuex-persistedstate";
//引入menu
import menu from './menu'
import userInfo from './userInfo'
//对外暴露store
export default createStore({
    modules:{
        menu,
        userInfo,
    },
    plugins: [new createPersistedState({
        key:'pz_v3pz'
    })],
})
