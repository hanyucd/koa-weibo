const BaseController = require('./baseController');
const userRelationService = require('../service/userRelationService');
const codeMsg = require('../config/codeMsg');

class userRelationController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 根据 用户id 获取粉丝列表
   * @param {String} userId 用户id
   */
  async getFans(userId) {
    const { count, userList } = await userRelationService.getUsersByFollower(userId);
    return { count, userList };
  }

  /**
   * 根据 用户id 获取用户所有关注的人
   */
  async getFollowers(userId) {
    const { count, followList } = await userRelationService.getFollowersByUser(userId);
    return { count, followList };
  }
}

module.exports = new userRelationController();
