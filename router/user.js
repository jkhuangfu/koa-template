const router = require('koa-router')();

router.get('/', async ctx => {
    await ctx.render('index')
})

router.get('/post',ctx => {
    //设置 session
    let { a,b } = ctx.request.query;
    ctx.session.test = Date.now();
    ctx.body = {
        code:200,
        msg:'post success'
    }
})

router.post('/postTest',async ctx => {
    let { a , b } = ctx.request.body;
    ctx.response.body = {
        a,b
    }
})

router.post('/post',async ctx => {
    let { a , b } = ctx.request.body;
    ctx.response.body = {
        a,b
    }
})

module.exports = router;