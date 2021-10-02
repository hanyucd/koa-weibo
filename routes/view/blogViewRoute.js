const Router = require('@koa/router');
const { loginRedirect }  = require('../../middleware/loginCheckMiddleware');
const router = new Router();

/**
 * 访问微博首页
 */
router.get('/', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo;

  await ctx.render('index', {
    blogData: {
      blogList: []
    },
    userData: {
      userInfo: myUserInfo
    }
  });
})

module.exports = router;
