const userService = require('../service/userService');
const BaseController = require('./baseController');
const { registerUserNameNotExistError } = require('../config/codeMsg');

class UserController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 用户是否存在 不存在可以注册
   * @param {string} userName  用户名
   */
  async isExist(ctx) {
    const { userName } = ctx.request.body;
    const userInfo = await userService.getUserInfo(userName);
    if (!userInfo) return super.resFail(ctx, registerUserNameNotExistError);

    return super.resSuccess(ctx, userInfo);
  }
}

module.exports = new UserController;
