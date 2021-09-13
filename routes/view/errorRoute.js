const Router = require('@koa/router');
const router = new Router();

router.get('/error', async ctx => {
  await ctx.render('error');
});

router.get('/(.*)', async ctx => {
  await ctx.render('404');
});

module.exports = router;
