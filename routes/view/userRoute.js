const Router = require('@koa/router');
const router = new Router();

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {});
});

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {});
});

module.exports = router;
