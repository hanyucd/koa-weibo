const Router = require('@koa/router');
const { loginRedirect }  = require('../../middleware/loginCheckMiddleware');
const blogService = require('../../service/blogService');
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
});

/**
 * 访问自己主页
 */
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${ userName }`);
});

/**
 * 访问个人主页
 */
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  console.log('params', ctx.params)
  const myUserInfo = ctx.session.userInfo; // 我自己
  const { userName: curUserName } = ctx.params; // ta 人用户名
  const isMe = curUserName === myUserInfo.userName;
  console.log('curUserName:', curUserName);
  // console.log('myUserInfo', myUserInfo.userName);

  // 获取第一页的数据
  const blogResult = await blogService.getBlogListByUser(curUserName);
  const { isEmpty, blogList, count, pageIndex, pageSize } = blogResult;
  
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize
    },
    userData: {
      userInfo: myUserInfo
    }
  })
});

module.exports = router;
