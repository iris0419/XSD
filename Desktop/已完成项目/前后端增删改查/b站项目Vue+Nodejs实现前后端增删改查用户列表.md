# b站项目:Vue+Nodejs实现前后端增删改查用户列表

## 搭建环境

### 安装依赖

1.创建文件夹 node-user,index.html,server.js

2.进入目录,npm init -y ,创建一个package.json

3.安装依赖 npm i express sqlite3 sequelize nodemon  express--启动node.js的服务 sqlite3--数据库  sequelize--用于连接数据库的工具  nodemon--在不启动服务器的情况下刷新服务

```
package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"  //node改成nodemon
  },
```

4.创建style.css并引入

```
<link rel="stylesheet" href="./style.css">
```

### 引入Element-UI(浏览器直接引入)

直接通过浏览器的 HTML 标签导入 Element Plus，然后就可以使用全局变量 `ElementPlus` 了。

```
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="//unpkg.com/element-plus"></script>
</head>
```

## 静态页面

```
//作用:让Vue的代码生效
<body>
<div id="app">
</div>
</body>

<script>
    const App={
        data(){
            return{}
        }
    }
    
    const app = Vue.createApp(App);
    app.use(ElementPlus)
    app.mount('#app');
</script>
```

### 页面搭建

```vue
<body>
    <div id="app">
        <h1 class="mgb24">信息录入</h1>
        <el-form :inline="true" :model="userForm" class="demo-form-inline">
            <el-form-item label="name">
                <el-input v-model="userForm.name" />
            </el-form-item>

            <el-form-item label="age">
                <el-input v-model="userForm.age" />
            </el-form-item>

            <el-form-item label="sex">
                <el-radio-group v-model="userForm.sex">
                    <el-radio label="male">male</el-radio>
                    <el-radio label="female">female</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handelUserAdd">add</el-button>
                <el-button type="primary" @click="handelUserUpdate">update</el-button>
            </el-form-item>
        </el-form>
        <h1 class="mgb24">信息展示</h1>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="name">
                <el-input v-model="searchForm.name" />
            </el-form-item>
      
            <el-button type="primary" @click="handelSearch">add</el-button>
        </el-form>
        <!-- 表格展示 -->
        <el-table class="mgb24" :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="name" width="180"></el-table-column>
            <el-table-column prop="name" label="age" width="180"></el-table-column>
            <el-table-column prop="address" label="sex"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class='pagination' background layout="prev, pager, next" :total="1000" />
    </div>
</body>

<script>
    const App = {
        data() {
            return {
                userForm: {
                    name: '',
                    sex: '',
                    age: '',
                },
                searchForm: {
                    name: ''
                },
                tableData:[
                    {
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                    },
                ],
            }   
        },
        methods: {
            handelUserAdd() {
                console.log(this.userForm);
            },
            handelUserUpdate() { },
            handelSearch() {
                console.log(this.searchForm);
            },
        },
    }

    const app = Vue.createApp(App);
    app.use(ElementPlus)
    app.mount('#app');
</script>
```

### 页面搭建---样式

```vue
*{
    margin: 0;
    padding: 0;
}

body{
    display: flex;
    justify-content: center;
    padding: 100px 0;
}

.pagination{
    margin-top: 24px;
    float: right;
}

.mgb24{
    margin-top: 24px;
}
```

## 连接数据

### 点击add 信息录入

```vue
methods: {
            //点击add按钮提交表单信息
            async handelUserAdd() {
               const response=await fetch('http://localhost:3000/users',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                },
                body:JSON.stringify(this.userForm)
               })
               const data=response.data()
            },
```

查看  网络--保留日志--负载

```
//server.js 启动服务器
const express=require('express')

const app=express()


app.listen(3000,()=>{
    console.log('server start port 3000')
})
指令:pnpm start
查看是否启动成功:http://localhost:3000/
```

```
//测试是否成功拿数据
app.post('/users',(req,res)=>{
    const {name,sex,age}=req.body
    console.log(req.body);
})
```

#### 报错1:跨域

```
Access to fetch at 'http://localhost:3000/users' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

```
//2.
app.use(express.json())  //解析body上的js结构

//解决跨域 //1.
app.all('*',(req,res,next)=>{  //*所有请求都会经过方法 
    res.header('Access-Control-Allow-Origin','*')//无论什么域名的接口请求都给通过
    res.header('Access-Control-Allow-Headers','Content-Type') //async handelUserAdd()请求里设置了header,所以这里也要设置

    //如果请求是OPTIONS(预请求),就给通过,不是就next()进入下列代码
    if(req.method==='OPTIONS'){  
        res.sendStatus(200)
    }else{
        next()
    }
})
```

### 引入数据库

```
const { Sequelize , DataTypes}=require('sequelize')

const sequelize=new Sequelize({
    dialect:'sqlite',//用的数据库类型是sqlite
    storage:'./database.sqlite', //数据文件存放地址
})

const User=sequelize.define('User',{
    name:DataTypes.STRING,
    age:DataTypes.NUMBER,
    sex:DataTypes.STRING,
})

User.sync() //同步文件,会自动增加一个database.sqlite文件
```

安装一个插件:Database Client

连接左侧 DataBase,名称,路径,--连接

### 向表里插入数据

```
//server.js
app.post('/users',async (req,res)=>{
    const {name,sex,age}=req.body //通过body传参
    await User.create({name,sex,age})//创建User表格内容
    return res.sendStatus(200) //创建成功
})
```

### 把表格数据显示在页面上

```vue
html////拿到自己插入表格的数据 //1.
        async mounted() {
            const response = await fetch('http://localhost:3000/users')  //这里的地址有下划线
            const data = await response.json()
            this.tableData = data.users
        },
```

```vue
server.js//拿到自己插入表格的数据 //2.
app.get('/users', async (req, res) => {
    const users = await User.findAll()
    return res.status(200).json({ users })
})
```

## 编辑edit

```
<!-- 编辑和删除 --> 点击edit,需要修改的数据显示在页面上
            <el-table-column>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">edit</el-button>
                    <el-button size="small" type='danger' @click="handleDel(scope.row)">delete</el-button>
                </template>
            </el-table-column>
 -------
 handleEdit(row){
                this.userForm=row
            },
```

#### 问题:没有点击update,表格 就自动因为输入框更改而更改

原因:

```
handleEdit(row){
                this.userForm=row
            },
```

解决方法:

```
handleEdit(row){
                this.userForm={...row} //用解构写法,相当于生成一个新的地址,但是值是row的值
            },
```

## 更新update

```
//更新 1.
            async handelUserUpdate() {
                const response = await fetch(`http://localhost:3000/users/${this.userForm.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.userForm)
                })
            },
```

```
//更新 2.
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH')
```

```
//更新 3.
app.patch('/users/:id', async (req, res) => {
    const { name, sex, age, } = req.body
    const { id } = req.params
    await User.update({name, sex, age}, { where: { id } })
    return res.sendStatus(200)
})
```

#### 报错:获取不到id

```
userForm: {
                    name: '',
                    sex: '',
                    age: '',
                    id: '',//更新4 因为更新的时候获取不到id
                },
```

## 删除delete

```
//删除 1.
            async handleDel(row){
                const response = await fetch(`http://localhost:3000/users/${row.id}`, {
                    method: 'DELETE',
                })
            },
```

```
//删除 2.
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH')
```

```
//删除 3.
app.delete('/users/:id',async (req,res)=>{
    const {id}=req.params
    await User.destroy({where:{id}})
    res.sendStatus(200)
})
```

### 打包函数

```
//获取列表 ,因为用的比较频繁,所以打包函数方便调用
        async mounted() {
            this.fetchList() //调用
        },
         methods: {
            //获取列表 ,因为用的比较频繁,所以打包函数方便调用  ,必须写在methods下
            async fetchList() {
                const response = await fetch(`http://localhost:3000/users`)
                const data = await response.json()
                this.tableData = data.users
            },
```

## 分页

```
async fetchList() {
                const {name}=this.searchForm //搜索 1.
                const response = await fetch(`http://localhost:3000/users?name=${name}&current=${this.current}`)  //搜索 2.
                const data = await response.json()
                this.tableData = data.users
                this.total=data.total
            },
```

```
tableData: [],
                current: 1,//分页 1.
                total: 0,//分页 2.
```

```
<!-- 分页 -->
        <el-pagination class='pagination' v-model:current-page="current" background layout="prev, pager, next"
            :total="total" @current-change="handelCurrentChange"/> 
```

```
handelCurrentChange(val){
                this.current=val
                this.fetchList()
            }
```

## 模糊查询(search)

```
//name模糊查询+分页 2.   
app.get('/users', async (req, res) => {
    const {name,current}=req.query
    const offset=(current - 1)*10 //显示第2页时候,将第1页的结果过滤掉
    let where={}
    if(name){
        where={name:{[Op.like]:`%${name}%`}} //模糊查询
    }
    const {count:total,rows:users} = await User.findAndCountAll({limit:10,where,offset})  //查询+分页 4.  limit:10每次请求只返回10条数据
    return res.status(200).json({ total,users })
})
```

```
async fetchList() {
                const {name}=this.searchForm //搜索 1.
                const response = await fetch(`http://localhost:3000/users?name=${name}&current=${this.current}`)  //搜索 2.
                const data = await response.json()
                this.tableData = data.users
                this.total=data.total
            },
```

```
 handelSearch() {
                this.fetchList()
            },
```

## 优化

### 创建时间降序排序(后创建的往前排)

```
const {count:total,rows:users} = await User.findAndCountAll({order:[['createdAt','DESC']], limit:10,where,offset})
```

