
const localData=localStorage.getItem('pz_v3pz')

const state=localData?localData.menu : {
    isCollapse:false,
    selectMenu:[],
    routerList:[]
}
//定义方法
const mutations={
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    //参数1:state,参数2:传入的数组,需要加到selectMenu:[]里
    addMenu(state,playload){
        //对数据进行去重
        if(state.selectMenu.findIndex(item=>item.path===playload.path)===-1){
            state.selectMenu.push(playload)
        }
    },
    //参数1:state,参数2:传入的数组
    closeMenu(state,playload){
        //将传入的数组数据和selectMenu里的数组数据进行对比,拿到index
        const index=state.selectMenu.findIndex(val=>val.name===playload.name)
        //通过索引删除指定元素 splice(参数1:index,参数2:个数)
        state.selectMenu.splice(index,1)
    },
    dynamicMenu(state,playload){
        //通过glob导入文件 **二级目录,*一级目录
        const modules= import.meta.glob('../../views/**/*.vue')
        console.log(modules);
        function routerSet(router){
            router.forEach(route => {
                //判断没有子菜单,拼接路由数据
                if(!route.children){
                    const url=`../../views${route.meta.path}/index.vue`
                    route.component=modules[url]
                }else{
                    routerSet(route.children)
                }
            });
        }
        routerSet(playload)
        //拿到完整的路由数据
        state.routerList=playload
    }
}
//ES6简写,当变量名=变量值,可以写简写
export default{
    state,
    mutations
}
