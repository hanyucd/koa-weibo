const BaseController = require('./baseController');
const blogService = require('../service/blogService');
const userRelationService = require('../service/userRelationService');
const codeMsg = require('../config/codeMsg');
const { getBlogListStr } = require('../utils/blogUtil');

class BlogProfileController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 根据当前的用户 查询该用户的微博
   */
  async getProfileBlogList(ctx) {
    let { userName, pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    // 查询数据
    let blogResult = await blogService.getBlogListByUser({ userName, pageIndex });
    
    blogResult.blogListTpl = getBlogListStr(blogResult.blogList);
    super.resSuccess(ctx, blogResult)
  }

  /**
   * 添加关注
   */
  async follow(ctx) {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;
    
    try {
      const followResult = await userRelationService.addFollower(myUserId, curUserId);
      // console.log('关注结果:', followResult);
      super.resSuccess(ctx, followResult);
    } catch (error) {
      console.log(error.message, error.stack);
      super.resFail(codeMsg.addFollowerError);
    }
  }

  /**
   * 取消关注
   */
  async unFollow(ctx) {
    const { id: myUserId } = ctx.session.userInfo;
    const { userId: curUserId } = ctx.request.body;

    try {
      await userRelationService.delFollower(myUserId, curUserId);
      super.resSuccess(ctx);
    } catch (error) {
      console.log(error.message, error.stack);
      super.resFail(codeMsg.delFollowerError);
    }
  }
}

module.exports = new BlogProfileController();
