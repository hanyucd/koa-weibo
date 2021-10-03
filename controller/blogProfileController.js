const BaseController = require('./baseController');
const blogService = require('../service/blogService');
const codeMsg = require('../config/codeMsg');

class BlogProfileController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 根据当前的用户 查询该用户的微博 以显示在个人主页上
   */
  async getProfileBlogList(ctx) {
    con

    try {
      // const blog = await blogService.createBlog({
      //   userId, content: xss(content), image
      // });

      // super.resSuccess(ctx);
    } catch (error) {
      console.log(error.message, error.stack);
      return super.resFail(ctx, codeMsg.createBlogError);
    }
  }
}

module.exports = new BlogProfileController();
