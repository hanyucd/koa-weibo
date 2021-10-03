const { blogModel, userModel } = require('../model');
const formatUtil = require('../utils/formatUtil');
const PAGE_SIZE = 5;

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
  async getBlogListByUser(userName, pageIndex = 0) {
    // 拼接查询条件
    let userWhereObj = {};
    if (userName) userWhereObj.userName = userName;

    const result = await blogModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: [ 'userName', 'nickName', 'picture' ],
          // inner join
          where: userWhereObj
        }
      ],
      order: [['id', 'desc']], // id 倒序
      offset: PAGE_SIZE * pageIndex, // 跳过多少条
      limit: PAGE_SIZE, // 每页多少条
    });
    console.log('result:', result);

    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

    let blogList = result.rows.map(row => row.dataValues);

    blogList = map(blogItem => {
      const user = blogItem.user.dataValues;
      blogItem.user = formatUtil.formatUser(user);
      return blogItem;
    });
    console.log('blogList:', blogList);

    return {
      isEmpty: result.count === 0, 
      count: result.count,
      blogList,
      pageIndex,
      pageSize: PAGE_SIZE
    }
  }
}

module.exports = new blogService();
