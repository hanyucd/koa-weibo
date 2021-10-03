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
}

module.exports = new userRelationController();
