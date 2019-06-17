const router = require('koa-router')();

router.get('/', async ctx => {
    await ctx.render('index')
})

router.get('/post',ctx => {
    //设置 session
    ctx.session.test = Date.now();
    ctx.body = {
        code:200,
        msg:'post success'
    }
})

module.exports = router;