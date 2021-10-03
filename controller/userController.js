const userService = require('../service/userService');
const userRelationService = require('../service/userRelationService');
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
  }

  /**
   * 更新用户信息
   */
  async changeUserInfo(ctx, next) {
    const { nickName, city, picture } = ctx.request.body;
    // console.log(ctx.session.userInfo)
    const { userName } = ctx.session.userInfo;
    if (!nickName) nickName = userName;

    const result = await userService.updateUser({ newNickName: nickName, newCity: city, newPicture: picture }, { userName });
    // 更新用户信息失败
    if (!result) return super.resFail(ctx, codeMsg.updateUserInfoError);
    // 修改用户 session
    ctx.session.userInfo = { ...ctx.session.userInfo, nickName, city, picture };
    super.resSuccess(ctx);
  }

  /**
   * 更新用户密码
   */
  async changeUserPassword(ctx, next) {
    const { newPassword, password } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    const result = await userService.updateUser({ newPassword }, { userName, password });
    // 更新用户信息失败
    if (!result) return super.resFail(ctx, codeMsg.updateUserPasswordError);
    super.resSuccess(ctx);
  }

  /**
   * 退出登录
   */
  async logout(ctx) {
    // 移除 session
    delete ctx.session.userInfo;
    super.resSuccess(ctx);
  }

  /**
   * 获取 at 列表
   */
  async getAtList(ctx) {
    const { id: myUserId } = ctx.session.userInfo;

    const { count, followList } = await userRelationService.getFollowersByUser(myUserId);
    const list = followList.map(follower => {
      return `${ follower.nickName }-${ follower.userName }`;
    });

    ctx.body = list;
  }
}

module.exports = new UserController;
