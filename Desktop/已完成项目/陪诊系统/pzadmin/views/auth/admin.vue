<template>
    <panel-head/>

    <el-table :data="adminList.list" style="width: 100%" class="tableShow">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />

        <el-table-column 
        prop='permissions_id' 
        label="所属组别">
            <template #default="scope">
                {{permissionName(scope.row.permissions_id)}}
            </template>
        </el-table-column>

        <el-table-column prop="mobile" label="手机号" />

        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag 
                :type="scope.row.active ? 'success':'danger'"
                >{{scope.row.active?'正常':'失效'}}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column 
        label="创建时间"
        >
            <template #default="scope">
                <div class="flex_box">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left:10px">{{scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>

        <el-table-column label="操作" >
            <template #default="scope">
                <el-button 
                    type="primary" 
                    v-model="centerDialogVisible" 
                    @click="open(scope.row)"
                >编辑</el-button>
            </template>
        </el-table-column>

    </el-table>

    <!-- 对话框 -->
    <!-- :model="form"  -->
    <el-dialog 
    v-model="centerDialogVisible" 
    :before-close="beforeClose"
    title="编辑用户" 
    width="500px">
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item 
            label="手机号" 
            prop="mobile">
                <el-input 
                v-model="form.mobile"
                disabled
                 />
            </el-form-item>

            <el-form-item 
            label="昵称" 
            prop="name" 
            required
            >
                <el-input 
                v-model="form.name"
                />
            </el-form-item>

            <el-form-item
            label="菜单权限"  
            prop="permissions_id"
            >
                <el-select
                v-model="form.permissions_id"
                placeholder="请选择菜单权限"
                style="width:240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :value="item.name"
                        :label="item.name"
                    />
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" 
                @click="submitForm(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination 
    class="pagination" 
    layout="total, prev, pager, next" 
    :total="adminList.total"
    :page-sizes="[5, 10, 15, 20]"
    v-model:current-page="paginationData.pageNum"
    v-model:page-size="paginationData.pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script setup>
import { onMounted, reactive,ref } from 'vue';
import { authAdmin,selectList,editUserInfo} from '../../src/api/menu';
import dayjs from 'dayjs'
import { Clock } from '@element-plus/icons-vue'
//对话框开启关闭
const centerDialogVisible = ref(false)
const formRef = ref()//拿到表单实例
//关闭弹窗的回调
const beforeClose=()=>{
    centerDialogVisible.value=false
}
//权限下拉
const options=ref([])

//分页
const paginationData=reactive({
    pageNum:1,
    pageSize:10,
})

onMounted(()=>{
    getAdminList()
    selectList().then(({data})=>{
        //console.log(data.data);
        options.value=data.data
    })
})

//根据权限id匹配权限名称
const permissionName=(id)=>{
    const data=options.value.find(el=>el.id===id)
    //如果数据存在,读取name属性,不存在(首次创建的时候),读取超级管理员
    return data ? data.name:'超级管理员'
}
//账号管理列表(封装)
const adminList=reactive({
    list:[],
    total:0
})

const getAdminList=()=>{
    authAdmin(paginationData).then(({data})=>{
        adminList.list=data.data.list
        adminList.total=data.data.total
        //切换状态和组别的显示
        adminList.list.forEach((item)=>{
            //第一种moment时间戳转换
            //时间戳转换
            // if(item.create_time!==0){
            //     dateShow.value=timeFilter(item.create_time)
            // }
            //第二种dayjs时间戳转换
            item.create_time=dayjs(item.create_time).format('YYYY-MM-DD')
        })


    })
}

const rules = reactive({
    name: [
        { required:true, trigger: 'blur' ,message:'请输入昵称'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
    permissions_id: [
        { required:true, trigger: 'blur' ,message:'请选择菜单权限'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
})
//编辑表单
const form=reactive({
    name:'',
    permissions_id:''
})

//确认后提交修改信息 表单提交
const submitForm=async(ElForm)=>{
    if (!ElForm) return//判断是否接收到表单实例
    await ElForm.validate((valid, fields) => {
        if (valid){
            const {name,permissions_id}=form
            editUserInfo({name,permissions_id}).then(({data})=>{
                if(data.code===10000){
                    centerDialogVisible.value=false
                    getAdminList()
                }
            })
        }else{
            console.log('error submit!',fields);
        }
    })
}
//编辑打开表单
const open=(rowData)=>{
    centerDialogVisible.value=true
    //form是响应式数据，拼接的数据不能直接给form，会有数据都是问题，所以用浅拷贝，将传入的数据拼给form
    Object.assign(form,{mobile:rowData.mobile,name:rowData.name,permissions_id:rowData.permissions_id})
}

//分页
const handleSizeChange=(val)=>{
    val=paginationData.pageSize
    getAdminList()
}
const handleCurrentChange=(val)=>{
    val=paginationData.pageNum
    getAdminList()
}

</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}
.flex_box{
    display: flex;
    align-items: center;
}
.pagination{
    position: absolute;
    right: 20px;
    // background-color: aqua;
}
</style>
