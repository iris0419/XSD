<template>
    <panel-head/>

    <span>
        <el-button 
        :icon="Plus" 
        type="primary" 
        @click="open(null)"
        size="small">添加权限</el-button>
    </span>

    <el-table :data="tableData.list">
        <el-table-column label="id" prop="id"/>
        <el-table-column label="昵称" prop="name"/>
        <el-table-column label="菜单权限" prop='permissionName'/>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" @click="open(scope.row)">
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog 
    v-model="dialogFormVisible" 
    :before-close="beforeClose"
    title="添加权限" 
    width="500" 
    >
        <el-form
        ref="formRef"
        label-width="100px"
        label-position="left"
        :rules="rules" 
        :model="form"
        >   <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>

            <el-form-item 
            class="inputName" 
            label="名称" 
            prop="name" 
            :label-width="60" 
            required>
                <el-input 
                placeholder="请填写权限名称" 
                v-model="form.name"/>
            </el-form-item>

            <el-form 
            label="权限" 
            prop="permissions">
                <el-tree 
                ref="treeRef"
                :default-checked-keys="defaultKeys"
                :default-expanded-keys="[2]"
                show-checkbox 
                :data="permissionData" 
                style="max-width: 600px"
                node-key="id"
                 />
            </el-form>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click.stop="dialogFormVisible=false;submitForm(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 分页 -->
    <div class="pagination" >
        <el-pagination 
            layout="total, prev, pager, next" 
            :page-sizes="[5, 10, 15, 20]"
            :total="tableData.total"
            v-model:current-page="menuPermissionData.pageNum"
            v-model:page-size="menuPermissionData.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
    >
        </el-pagination>
     </div>
</template>

<script setup>
import { menuPermission, getMenuList, setMenuPost } from '../../src/api/menu';
import { nextTick, onMounted, reactive,ref } from 'vue';
import{Plus} from '@element-plus/icons-vue'

//弹窗显示隐藏
const dialogFormVisible = ref(false)
const formRef = ref()//拿到表单实例
const treeRef=ref() //拿到tree组件实例
//下拉权限列表
const permissionData = ref([])
//列表数据
const tableData=reactive({
    list:[],
    total:10
})
//提交的form表单数据
const form=reactive(({
    id:'',
    name:'',
    permissions:'',
}))
//分页数据
const menuPermissionData=reactive({
    pageNum:1,
    pageSize:10,
})

//关闭弹窗的回调
const beforeClose=()=>{
    //重置表单
    formRef.value.resetFields()
    //tree选择重置
    treeRef.value.setCheckedKeys(defaultKeys) 
    dialogFormVisible.value=false
}

onMounted(() => {
    getMenuList().then(({ data }) => {
        permissionData.value = data.data
    })
    getListData()
})

//封装编辑的弹窗的打开和关闭
const open=(rowData={})=>{
    dialogFormVisible.value=true
        //弹窗打开和form生成是异步的
        nextTick(()=>{
            if(rowData){
            //form是响应式数据，拼接的数据不能直接给form，会有数据都是问题，所以用浅拷贝，将传入的数据拼给form
            Object.assign(form,{id:rowData.id,name:rowData.name})
            //给tree组件设置permission
            treeRef.value.setCheckedKeys(rowData.permissions)
        }
    })
}

//默认选中权限
const defaultKeys=[4,5]

//添加权限

const rules = reactive({
    name: [
        { required:true, trigger: 'blur' ,message:'请输入权限名称'} //validateUser是一个函数 trigger:'blur'失去焦点触发
    ],
})

//表单提交
const submitForm=async(ElForm)=>{
    if (!ElForm) return//判断是否接收到表单实例
    await ElForm.validate((valid, fields) => {
        if (valid){
            //校验成功后,提交表单
            //获取到选择的checkbox数据,返回是数组,转成string
            const permissions=JSON.stringify(treeRef.value.getCheckedKeys())
            setMenuPost({name:form.name,permissions,id:form.id}).then(({data})=>{
                //console.log(data,'setMenuPost');
                getListData()
                beforeClose()
            })
        }else{
            console.log('error submit!',fields);
        }
    })
        
}

//请求列表数据,需要传递分页的参数,因为是一个复用的逻辑,需要封装

const getListData=()=>{
    menuPermission(menuPermissionData).then(({data})=>{
        const {list,total}=data.data
        tableData.list=list
        tableData.total=total
    })
}
//分页
const handleSizeChange=(val)=>{
    val=menuPermissionData.pageSize
    getListData()
}
const handleCurrentChange=(val)=>{
    val=menuPermissionData.pageNum
    getListData()
}
</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

.pagination{
    position: absolute;
    right: 20px;
    // background-color: aqua;
}

.btns{
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
</style>
