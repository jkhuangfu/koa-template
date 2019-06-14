const router = require('koa-router')();

router.get('/user', ctx => {
    //ctx.type = 'html';
    console.log(1111,ctx.session.test)
    ctx.body = { code: 2010, msg: 'user', }
});
router.get('/post',ctx => {
    //console.log(ctx.request.body)
    ctx.session.test = Date.now()
    ctx.body = {
        code:200,
        msg:111
    }
})

module.exports = router;