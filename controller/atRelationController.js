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
}

module.exports = new AtRelationController();
