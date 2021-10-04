const BaseController = require('./baseController');
const blogService = require('../service/blogService');
const userService = require('../service/userService');
const atRelationService = require('../service/atRelationService');
const codeMsg = require('../config/codeMsg');
const xss = require('xss');

// 微博内容 @nickName - userName的正则检测
const REF_FOR_AT_WHO = /@(.+?)-(\w+?)\b/g;

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

    // 分析并收集 content 中的 @ 用户
    // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu'
    const atUserNameList = [];
    const cloneConten = content;
    cloneConten.replace(REF_FOR_AT_WHO, (matchStr, nickName, userName) => {
      // 目的不是 replace 而是获取 userName
      atUserNameList.push(userName);
      return matchStr; // 替换不生效，预期
    });

    // 根据 @ 用户名查询用户信息
    const atUserList = await Promise.all(atUserNameList.map(userName => userService.getUserInfo(userName)));
    // 根据用户信息，获取用户 id
    const atUserIdList = atUserList.map(user => user.id);

    try {
      const blog = await blogService.createBlog({
        userId, content: xss(content), image
      });

      // 创建 @ 关系
      atUserIdList.length && await Promise.all(atUserIdList.map(userId => atRelationService.createAtRelation(userId, blog.id)));

      super.resSuccess(ctx);
    } catch (error) {
      console.log(error.message, error.stack);
      return super.resFail(ctx, codeMsg.createBlogError);
    }
  }

  /**
   * 获取首页微博列表
   * @param {number} userId userId
   * @param {number} pageIndex page index
   */
  async getHomeBlog(userId, pageIndex = 0) {
    const blogResult = await blogService.getFollowersBlogListByUser({ userId, pageIndex });
    return blogResult;
  }
}

module.exports = new BlogHomeController();
