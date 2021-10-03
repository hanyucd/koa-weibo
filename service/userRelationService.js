const { userRelationModel, userModel } = require('../model');
const { Op } = require('sequelize');
const formatUtil = require('../utils/formatUtil');

class userRelationService {  
  /**
   * 获取关注该用户的用户列表，即该用户的粉丝
   * @param {number} followerId 被关注人的 id
   */
  async getUsersByFollower(followerId) {
    const fansResult = await userModel.findAndCountAll({
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
    // console.log('关注者结果:', fansResult);

    // 格式化
    let userList = fansResult.rows.map(row => row.dataValues)
    userList = formatUtil.formatUser(userList)

    return { count: fansResult.count, userList };
  }

  /**
   * 获取关注人列表
   * @param {number} userId userId
   */
  async getFollowersByUser(userId) {
    const followerResult = await userRelationModel.findAndCountAll({
      where: {
        userId,
        followerId: { [Op.ne]: userId }
      },
      include: [
        {
          model: userModel,
          attributes: ['nickName', 'userName', 'picture', 'gender'],
        }
      ],
      order: [
        [ 'create_time', 'desc' ]
      ],
    });
    // console.log('followerResult:', followerResult);


    let followerList = followerResult.rows.map(row => row.dataValues);
    followerList = followerList.map(item => {
      let user = item.user.dataValues;
      user = formatUtil.formatUser(user);
      return user;
    });

    return { count: followerResult.count, followList: followerList };
  }

  // 添加关注关系
  async addFollower(userId, followerId) {
    const result = await userRelationModel.create({
      userId,
      followerId
    });
    // console.log('关注关系:', result);

    return result.toJSON();
  }

  // 删除关注关系
  async delFollower(userId, followerId) {
    const destroy =  await userRelationModel.destroy({
      where: {
        userId,
        followerId
      }
    });
    // console.log('删除:', destroy);
    return destroy;
  }
}

module.exports = new userRelationService();
