const { userRelationModel, userModel } = require('../model');
const { Op } = require('sequelize');
const formatUtil = require('../utils/formatUtil');

class userRelationService {  
  /**
   * 获取关注该用户的用户列表，即该用户的粉丝
   * @param {number} followerId 被关注人的 id
   */
  async getUsersByFollower(followerId) {
    const flllowerResult = await userModel.findAndCountAll({
      attributes: ['id', 'userName', 'nickName', 'picture'],
      include: [
        {
          model: userRelationModel,
          where: {
            followerId,
            // 不等于方法, 避免自己关注自己
            userId: { [Op.ne]: followerId }
          }
        },
      ],
      order: [
        [ userRelationModel, 'create_time', 'desc' ]
      ],
    });
    // result.count 总数
    // result.rows 查询结果，数组
    console.log('关注者结果:', flllowerResult);

    // 格式化
    let userList = flllowerResult.rows.map(row => row.dataValues)
    userList = formatUtil.formatUser(userList)

    return { count: flllowerResult.count, userList };
  }
}

module.exports = new userRelationService();
