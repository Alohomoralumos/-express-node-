// 导入 express 模块
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

// 定义 secret 密钥
const secretKey = 'xiaofuhanOvO'; 
//定义将 JWT 字符串解析还原成 JSON 对象的中间件
app.use(expressJWT({secret: secretKey, algorithms: ['HS256']}).unless({ path: [/^\/user\//]}));

/*const mysql = require('mysql');
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'12138',
    database:'my_db_01'
})

//检测正常工作
db.query('select 1',(err,results) => {
    // mysql 工作期间报错
    if(err) return console.log(err.message);
    //成功执行
    console.log(results) 
})*/

const path = require('path');

// 导入cors 模块,解决跨域问题
const cors = require('cors');

// 配置解析表单数据的中间件
app.use(express.urlencoded());

// express 托管静态资源
app.use(express.static('./HTTP'));

// 配置 cors 中间件, 从而解决接口跨域的问题
app.use(cors());

// post 接口
app.post('/user/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let body = req.body;
    //设置跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    //判断用户提交的登录信息是否正确
    if(req.body.username !== 'fuhan' || req.body.password !== '121380')
    {
        return res.send({
                msg:'登陆失败',
                data:body
            });
    }
    
    //登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串
    //参1：用户的信息 参2：加密的密钥 参3：配置 token 有效期
    const tokenStr = jwt.sign({username:req.body.username},secretKey,{ expiresIn:'24h' });

    return res.send({
        message:'登陆成功',
        url:path.join(__dirname,'./login.html'),
        token:tokenStr,//发送给前端的 token 字符串
    });
})

//获取用户名的接口
app.get('/username/getusername',(req,res)=>{
    console.log(req.user);
    res.send({
        status: 200,
        msg: 'success',
        username: req.user
    })
})


app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})