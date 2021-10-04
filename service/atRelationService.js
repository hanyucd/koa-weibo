const { atRelationModel, blogModel, userModel } = require('../model');
const formatUtil = require('../utils/formatUtil');
const PAGE_SIZE = 5; // 一页数据

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

  /**
   * 数据库 根据用户id 查询at该用户的 微博 及用户信息
   * @param {*} userId
   */
  async getAtCountBlogListByUser(userId, pageIndex = 0) {
    const result = await blogModel.findAndCountAll({
      order: [['create_time', 'desc']],
      limit: PAGE_SIZE,
      offset: pageIndex * PAGE_SIZE,
      include: [
        {
          model: atRelationModel,
          attributes: ['userId', 'blogId'],
          where: { userId, },
        },
        {
          model: userModel,
          attributes: ['nickName', 'userName', 'picture'],
        },
      ],
    });

    let blogList = result.rows.map(row => row.dataValues);
    blogList = formatUtil.formatBlog(blogList);
    blogList.map(item => {
      const user = item.user.dataValues;
      item.user = formatUtil.formatUser(user);
      return item;
    });

    return {
      isEmpty: result.count === 0, 
      count: result.count,
      blogList,
      pageIndex,
      pageSize: PAGE_SIZE
    };
  }

  /**
   * 更新 AtRelation
   * @param {Object} param0 更新内容
   * @param {Object} param1 查询条件
   */
   async updateAtRelation({ newIsRead }, { userId, isRead }) {
    // 首先拼接更新内容
    const updateData = {};
    if (newIsRead) updateData.isRead = newIsRead;

    // 接着拼接查询条件
    const whereData = {}
    if (userId) whereData.userId = userId;
    if (isRead) whereData.isRead = isRead;

    // 最后执行更新
    const result = await atRelationModel.update(updateData, {
        where: whereData
    });
    // console.log('更新结果:', result);
    
    return result[0] > 0;
  }
}

module.exports = new AtRelationService();
