const BaseController = require('./baseController');
const blogService = require('../service/blogService');
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
    let blogResult = await blogService.getBlogListByUser(userName, pageIndex);
    
    blogResult.blogListTpl = getBlogListStr(blogResult.blogList);
    super.resSuccess(ctx, blogResult)
  }
}

module.exports = new BlogProfileController();
