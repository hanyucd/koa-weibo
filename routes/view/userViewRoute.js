const Router = require('@koa/router');
const router = new Router();

const { loginRedirect }  = require('../../middleware/loginCheckMiddleware');

/**
 * 获取登录信息
 */
const _getLoginInfo = ctx => {
  // 默认未登录
  let data = { isLogin: false, userName: '' };
  // console.log('sesssion', ctx.session);
  const userInfo = ctx.session.userInfo;
  if (userInfo) {
    data.isLogin = true;
    data.userName = userInfo.userName;
  }

  return data;
};

// 注册
router.get('/register', async (ctx, next) => {
  await ctx.render('register', _getLoginInfo(ctx));
});

// 登录
router.get('/login', async (ctx, next) => {
  await ctx.render('login', _getLoginInfo(ctx));
});

// 设置页面
router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;
