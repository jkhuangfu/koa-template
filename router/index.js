const router = require('koa-router')();

router.get('/t/:id', async (ctx, next) => {
    console.log(ctx.params)
    ctx.body = { code: 200, msg: 'ttt' }
})
router.get('/doc', async (ctx, next) => {
   // console.log(ctx.params)
   console.log(111)
   await ctx.render('index')
})

module.exports = router;
