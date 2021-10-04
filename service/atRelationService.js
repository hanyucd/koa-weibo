const { atRelationModel, blogModel, userModel } = require('../model');
const formatUtil = require('../utils/formatUtil');

class AtRelationService {  
  /**
   * 创建 博客和艾特的关系
   * @param {Number} userId
   * @param {Number} blogId
   */
  async createAtRelation(userId, blogId) {
    const atResult = await atRelationModel.create({
      userId, blogId
    });
    // console.log('at结果:', atResult);

    return atResult.id;
  }

  /**
   * 获取 @ 用户的微博数量（未读的）
   * @param {number} userId userId
   */
  async getAtRelationCount(userId) {
    const atResult = await atRelationModel.findAndCountAll({
      where: {
        userId, isRead: false,
      }
    });
    // 返回数量
    return atResult.count;
  }
}

module.exports = new AtRelationService();
