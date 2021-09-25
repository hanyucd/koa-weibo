const BaseController = require('./baseController');
const codeMsg = require('../config/codeMsg');

// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024;

class UtilController extends BaseController {
  constructor() {
    super();
  }

  async uploadFile(ctx, next) {
    // 获取文件
    const file = ctx.req.files['file'];
    if (!file) return;

    console.log(ctx.req);

    // 获取文件信息
    const { size, path, name, type } = file;
  }
}

module.exports = new UtilController;
