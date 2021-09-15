const { resSuccess } = require('../config/codeMsg');

class BaseController {
  constructor() {}

  /**
   * 处理成功响应
   */
  resSuccess(ctx, data) {
    ctx.body = { data, ...resSuccess };
  }

  /**
   * 处理失败响应
   */
  resFail(ctx, failMsg, data = null) {
    ctx.body = { data, ...failMsg };
  }
}

module.exports = BaseController;
