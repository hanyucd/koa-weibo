const Router = require('@koa/router');
const router = new Router({ prefix: '/api/user' });
const userController = require('../../controller/userController');

/**
 * 用户注册
 */
router.post('/register', async (ctx, next) => {
  // throw Error();
  ctx.body = { a: 6 };
});

/**
 * 用户名是否存在
 */
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  const res = await userController.isExist(userName);
});

module.exports = router;
