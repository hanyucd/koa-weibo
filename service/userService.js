const { userModel } = require('../model');
const formatUtil = require('../utils/formatUtil');
const passwdUtil = require('../utils/passwdUtil');
const codeMsg = require('../config/codeMsg');

class UserService {  
  /**
   * 获取用户信息
   * @param {String} userName 用户名
   * @param {String} password 密码
   */
  async getUserInfo(userName, password) {
    let queryObj = { userName };
    if (password) queryObj = { ...queryObj, password };

    const queryRes = await userModel.findOne({
      where: queryObj,
      attributes: ['id', 'userName', 'nickName', 'picture', 'gender', 'city']
    });

    console.log('queryRes', queryRes);
    if (!queryRes) return null;

    return formatUtil.formatUser(queryRes);
  }

  /**
   * 登录
   */
  async login(userName, password) {
    const user = await userModel.findOne({
      where: { userName },
    });
    // 用户不存在
    if (!user) return { status: false, resMsg: codeMsg.userNameNotExistError };
    // 密码解密比较
    const decryptPasswrod = passwdUtil.decrypt(user.password);
    if (decryptPasswrod !== password) return { status: false, resMsg: codeMsg.passwordError }
    
    return { status: true, resResult: formatUtil.formatUser(user) };
  }

  /**
   * 创建用户
   * @param {Object} userInfo
   */
  async createUser(userInfo) {
    const { userName, password, gender, nickName } = userInfo;

    const userResult = await userModel.create({
      userName,
      password,
      gender,
      nickName: nickName || '_三眼神将'
    });
    
    console.log('新用户 id', userResult.id);
    return userResult.toJSON();
  }
}

module.exports = new UserService();
