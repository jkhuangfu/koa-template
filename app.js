const koa = require('koa');
const views = require('koa-views')
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const koaStatic = require('koa-static');
const app = new koa();
const t = require('./router')
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


//处理错误信息,发送错误码
const err = async(ctx) => {
    if(ctx.response.status === 404){
        await ctx.render('index')
    }else{
        ctx.body = { code: ctx.response.status, msg: 'fail' }
    } 
}
app
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
    .use(t.routes())
    .use(user.routes())
    //处理 error
    .use(err)

    .listen(8000, () => {
        console.log('server is running at http://localhost:8000')
    });
