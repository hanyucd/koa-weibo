const BaseController = require('./baseController');
const atRelationService = require('../service/atRelationService');
const codeMsg = require('../config/codeMsg');

class AtRelationController extends BaseController {
  constructor() {
    super();
  }

  /**
  * 获取 @ 我的微博数量
  * @param {number} userId userId
  */
  async getAtMeCount(userId) {
    const atCount = await atRelationService.getAtRelationCount(userId);
    return atCount;
  }

  /**
   * 根据用户id获取at 但是未读取的博客列表
   * @param {Number} userId 用户ID
   */
  async getAtMeBlog(userId, pageIndex = 0) {
    // 调用服务层获取数据
    const blogResult = await atRelationService.getAtCountBlogListByUser(userId, pageIndex);
    return blogResult;
  }

  /**
   * 根据用户id 标记所有未读的微博为已读
   * @param {Number} userId
   */
  async markAsRead(userId) {
    try {
      await atRelationService.updateAtRelation({ newIsRead: true }, { userId, isRead: false });
    } catch (error) {
      console.log(error.message, error.stack);
    }
  }
}

module.exports = new AtRelationController();
