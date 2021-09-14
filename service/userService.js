const { userModel } = require('../model');

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

    if (!queryRes) return null;

    return queryRes;
  }
}

module.exports = new UserService();
