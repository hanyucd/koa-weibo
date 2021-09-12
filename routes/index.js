const Router = require('@koa/router');
const router = new Router({ prefix: '' });

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/json', async (ctx, next) => {
  const session = ctx.session;
  console.log(session);
  
  if (!session.viewCount) {
    session.viewCount = 0;
  }
  session.viewCount++;
  
  ctx.body = {
    title: 'koa2 json',
    viewCount: session.viewCount
  };
});

module.exports = router;
