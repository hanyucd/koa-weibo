const Router = require('@koa/router');
const { loginRedirect }  = require('../../middleware/loginCheckMiddleware');
const blogService = require('../../service/blogService');
const blogSquareController = require('../../controller/blogSquareController');
const userRelationController = require('../../controller/userRelationController');
const blogHomeController = require('../../controller/blogHomeController');
const userService = require('../../service/userService');
const router = new Router();

/**
 * 访问微博首页
 */
router.get('/', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo;
  const userId = myUserInfo.id;
  

  // 获取粉丝列表
  const fansResult = await userRelationController.getFans(userId);
  const { count: fansCount, userList: fansList } = fansResult;
  
  // 获取关注列表
  const followerResult = await userRelationController.getFollowers(userId);
  const { count: followerCount, followList: followerList } = followerResult;

  // 获取关注人 和 自己的博客
  const blogResult = await blogHomeController.getHomeBlog(userId);
  const { isEmpty, blogList, count, pageIndex, pageSize } = blogResult;
  
  await ctx.render('index', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize,
    },
    userData: {
      userInfo: myUserInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followerCount,
        list: followerList
      }
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
  const myUserInfo = ctx.session.userInfo; // 我自己
  const { userName: curUserName } = ctx.params; // ta 人用户名
  const isMe = curUserName === myUserInfo.userName;

  let curUserInfo; // 当前所访问的用户信息
  if (isMe) {
    curUserInfo = myUserInfo;
  } else {
    // 先查询 ta 人的用户信息
    const existUserInfo = await userService.getUserInfo(curUserName);
    if (!existUserInfo) return;
    curUserInfo = existUserInfo;
  }

  // 获取第一页的数据
  const blogResult = await blogService.getBlogListByUser({ userName: curUserName });
  const { isEmpty, blogList, count, pageIndex, pageSize } = blogResult;
  
  // 获取粉丝列表
  const fansResult = await userRelationController.getFans(curUserInfo.id);
  const { count: fansCount, userList: fansList } = fansResult;
  
  // 获取关注列表
  const followerResult = await userRelationController.getFollowers(curUserInfo.id);
  const { count: followerCount, followList: followerList } = followerResult;

  // 遍历粉丝列表看看其中有没有我 我是否关注了此人？
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserInfo.userName;
  });
  
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followerCount,
        list: followerList
      }
    }
  })
});

/**
 * 访问广场
 */
router.get('/square', loginRedirect, async (ctx, next) => {
  const blogResult = await blogSquareController.getSquareBolgList(0);
  const { blogList, isEmpty, pageIndex, pageSize, count } = blogResult || {};

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize,
    },
  });
});

module.exports = router;
