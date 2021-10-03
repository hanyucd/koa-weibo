const BaseController = require('./baseController');
const blogService = require('../service/blogService');
const codeMsg = require('../config/codeMsg');
const redisUtil = require('../utils/redisUtil');

class BlogSquareController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 获取广场也 博客数据
   */
  async getSquareBolgList(pageIndex = 0) {
    pageIndex = parseInt(pageIndex);
    // 读取缓存里的数据
    const blogResult = await redisUtil.getSquareCacheList(pageIndex);

    return blogResult;
  }
}

module.exports = new BlogSquareController();
