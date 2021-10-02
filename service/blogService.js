const { blogModel } = require('../model');

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
}

module.exports = new blogService();
