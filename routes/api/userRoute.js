const Router = require('@koa/router');
const router = new Router({ prefix: '/api/user' });
const userController = require('../../controller/userController');

/**
 * 用户名是否存在
 */
router.post('/isExist', userController.isExist);

/**
 * 用户注册
 */
router.post('/register', async (ctx, next) => {
  // throw Error();
  ctx.body = { a: 6 };
});

module.exports = router;
