import {createStore} from "vuex";

import createPersistedState from "vuex-persistedstate"

export default createStore({
    state(){
        return {
            userInfo:{},
        }
    },

    mutations:{
        setUserInfo(state:any,data:any){
            state.userInfo=data
        }
    },

    plugins:[createPersistedState()]
})