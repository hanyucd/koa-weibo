const Router = require('@koa/router');
const router = new Router({ prefix: '/user' });

router.get('/', async (ctx, next) => {
  // throw Error();
  ctx.body = { a: 6 };
});

module.exports = router;
