const express = require('express')
const { Sequelize, DataTypes, Op } = require('sequelize') //查询+分页 3.

const sequelize = new Sequelize({
    dialect: 'sqlite',//用的数据库类型是sqlite
    storage: './database.sqlite', //数据文件存放地址
})

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
    sex: DataTypes.STRING,
})

User.sync() //同步文件,会自动增加一个database.sqlite文件

const app = express()
//2.
app.use(express.json())  //解析body上的js结构

//解决跨域 //1.
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')//无论什么域名的接口请求都给通过
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    //更新 2.
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH')

    //如果请求是OPTIONS,就给通过,不是就next()进入下列代码
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.post('/users', async (req, res) => {
    const { name, sex, age } = req.body //通过body传参
    await User.create({ name, sex, age })//创建User表格内容
    return res.sendStatus(200) //创建成功
})

//把表格数据显示在页面上 2.
// app.get('/users', async (req, res) => {
//     const users = await User.findAll()
//     return res.status(200).json({ users })
// })

//name模糊查询+分页 2.   
app.get('/users', async (req, res) => {
    const {name,current}=req.query
    const offset=(current - 1)*10 //显示第2页时候,将第1页的结果过滤掉
    let where={}
    if(name){
        where={name:{[Op.like]:`%${name}%`}} //模糊查询
    }
    const {count:total,rows:users} = await User.findAndCountAll({order:[['createdAt','DESC']], limit:10,where,offset})  //查询+分页 4.  limit:10每次请求只返回10条数据
    return res.status(200).json({ total,users })
})

//更新 3.
app.patch('/users/:id', async (req, res) => {
    const { name, sex, age, } = req.body
    const { id } = req.params
    await User.update({name, sex, age}, { where: { id } })
    return res.sendStatus(200)
})

//删除
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    await User.destroy({ where: { id } })
    res.sendStatus(200)
})
app.listen(3000, () => {
    console.log('server start port 3000')
})