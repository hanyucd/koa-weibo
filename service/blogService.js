const { blogModel, userModel, userRelationModel } = require('../model');
const formatUtil = require('../utils/formatUtil');
const PAGE_SIZE = 5; // 一页数据

class blogService {
  /**
   * 创建微博
   * @param {*} userId 
   * @param {*} content 
   * @param {*} image 
   */
  async createBlog({ userId, content, image }) {
    const result = await blogModel.create({
      userId,
      content,
      image
    });

    // console.log(result.toJSON())
    return result;
  }

  /**
   *  根据用户获取她的微博
   * @param {*} userName 
   * @param {*} pageIndex 
   */
  async getBlogListByUser({ userName = '', pageIndex = 0 }) {
    // 拼接查询条件
    let userWhereObj = {};
    if (userName) userWhereObj.userName = userName;

    const result = await blogModel.findAndCountAll({
      order: [['create_time', 'desc']], // 创建时间 倒序
      offset: PAGE_SIZE * pageIndex, // 跳过多少条
      limit: PAGE_SIZE, // 每页多少条
      include: [
        {
          model: userModel,
          attributes: [ 'userName', 'nickName', 'picture' ],
          where: userWhereObj // inner join
        }
      ]
    });
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组
    let blogList = result.rows.map(row => row.dataValues);

    blogList = blogList.map(blogItem => {
      const user = blogItem.user.dataValues;
      blogItem.user = formatUtil.formatUser(user);
      return blogItem;
    });
    // 格式化微博数据
    blogList = formatUtil.formatBlog(blogList);
    // console.log('blogList:', blogList);

    return {
      isEmpty: result.count === 0, 
      count: result.count,
      blogList,
      pageIndex,
      pageSize: PAGE_SIZE
    }
  }

  /**
   * 根据用户 获取该用户关注的所有人的微博
   * @param {Number} userId 用户ID
   */
  async getFollowersBlogListByUser({ userId, pageIndex = 0 }) {
    const result = await blogModel.findAndCountAll({
      order: [['create_time', 'desc']], // 创建时间 倒序
      offset: pageIndex * PAGE_SIZE,
      limit: PAGE_SIZE,
      include: [
        {
          model: userModel,
          attributes: [ 'userName', 'nickName', 'picture' ],
        },
        {
          model: userRelationModel,
          attributes: ['userId', 'followerId'],
          where: { userId }
        }
      ]
    });

    let blogList = result.rows.map(row => row.dataValues);
    blogList = formatUtil.formatBlog(blogList);
    blogList.map(item => {
      let user = item.user.dataValues;
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
}

module.exports = new blogService();
