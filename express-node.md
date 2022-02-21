# -express-node-
###1.express解析字符串有问题，需加入以下代码
```
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```
###2.express-jwt解析时不要忘记除掉登录的路径，否则会一直报错缺少token，代码如下
```
app.use(expressJWT({secret:secretKey, algorithms: ['HS256']}).unless({ path: [/^\/user\//]}));
```
###3.前端发送请求时需设置如下代码获取个人用户信息
```
headers{
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZ1aGFuIiwiaWF0IjoxNjQ1NDE4NzQzLCJleHAiOjE2NDU1MDUxNDN9.RdZ-5FERXewEbXM4e_YRwQzjMDASRO6TFhYd8ylOkIU`
    }
```
###4.总思路：express+JWT+cors+app.post+app.get+app.listen
