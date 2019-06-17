const koa = require('koa');
const views = require('koa-views')
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const koaStatic = require('koa-static');
const cors = require('koa2-cors');
const app = new koa();
const user = require('./router/user')
//session cookie 加密信息
app.keys = ['W@7712duagdb6hddhgW!']
const sessionConfig = {
    key: 'session',
    maxAge: 30 * 60 * 1000,//session 有效期 30Min
    autoCommit: true,
    overwrite: true,
    rolling: true,//设置为 true 刷新页面重新计时
    signed: true
}
const corsConfig = {
    origin: function(ctx) {//根据请求 url 限制是否允许跨域,也可直接设置为‘*’允许所有跨域
        if (ctx.url === '/postTest') {
            return '*'
        }
        return false;
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE','PUT','OPTIONS']//允许的请求方法
}

//处理错误信息,发送错误码
const err = async(ctx) => {
    if(ctx.response.status === 404){
        await ctx.render('index')
    }else{
        ctx.body = { code: ctx.response.status, msg: 'fail' }
    } 
}
app
    //跨域配置
    .use(cors(corsConfig))
    //session 中间件
    .use(session(sessionConfig, app))
    //渲染前端页面 模板引擎为 ejs | html
    .use(views(path.join(__dirname, 'views'), {
        extension: 'ejs'// html
    }))
    // 配置静态资源加载中间件
    .use(koaStatic(
        path.join(__dirname, 'public')
    ))
    
    .use(bodyParser())
    //路由
    .use(user.routes())
    //处理 error
    .use(err)

    .listen(8000, () => {
        console.log('server is running at http://localhost:8000')
    });
