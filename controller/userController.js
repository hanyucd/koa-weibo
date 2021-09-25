const userService = require('../service/userService');
const BaseController = require('./baseController');
const codeMsg = require('../config/codeMsg');

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
    if (!userInfo) return super.resFail(ctx, codeMsg.userNameNotExistError);

    return super.resSuccess(ctx, userInfo);
  }

  /**
   * 用户注册
   * @param {String} userName
   * @param {String} password
   * @param {number} gender
   */
  async userRegister(ctx) {
    const { userName, password, gender = 3 } = ctx.request.body;
    const userInfo = await userService.getUserInfo(userName);
    if (userInfo) return super.resFail(ctx, codeMsg.userNameIsExistError);

    try {
      // 创建用户
      const userResult = await userService.createUser({ userName, password, gender });
      super.resSuccess(ctx);
    } catch (error) {
      console.log(error.message, error.stack);
      return super.resFail(ctx, codeMsg.registerFailError);
    }
  }

  /**
   * 用户登录
   * @param {Object} ctx 当前上下文
   * @param {String} userName
   * @param {String} password
   */
  async login(ctx) {
    const { userName, password } = ctx.request.body;
    try {
      const userResult = await userService.login(userName, password);
      // console.log('server结果:', userResult);
      if (!userResult.status) return super.resFail(ctx, resResult.resMsg);

      if (ctx.session == null || ctx.session.userInfo == null) {
        ctx.session.userInfo = userResult.resResult;
      }
      super.resSuccess(ctx);
    } catch (error) {
      console.log('error', error);
      super.resFail(ctx, codeMsg.loginFailError);
    }

    // ctx.body = { userName, password };
  }
}

module.exports = new UserController;
