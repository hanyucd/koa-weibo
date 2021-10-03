const BaseController = require('./baseController');
const blogService = require('../service/blogService');
const codeMsg = require('../config/codeMsg');
const blogValidate = require('../validator/blogValidate');
const xss = require('xss');

class BlogHomeController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 创建微博
   */
  async createBlog(ctx) {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;

    try {
      const blog = await blogService.createBlog({
        userId, content: xss(content), image
      });

      super.resSuccess(ctx);
    } catch (error) {
      console.log(error.message, error.stack);
      return super.resFail(ctx, codeMsg.createBlogError);
    }
  }
}

module.exports = new BlogHomeController();
