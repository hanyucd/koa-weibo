const { DEFAULT_PICTURE_URL } = require('../config/const');

/**
 * 当 picture 为空的时候自动赋能
 * @param {object} userObj 用户对象
 */
const _formatUserPic = userObj => {
  if (!userObj) userObj.picture = DEFAULT_PICTURE_URL;
  return userObj;
};

/**
 * 批量或者单个更新 user pic 的信息
 * @param {Object|Array} user
 */
const formatUser = user => {
  if (!user) return user;
  // 如果传入的是用户列表 则 map 批量更新
  if (Array.isArray(user)) return user.map(_formatUserPic);
  // 是单个 obj 的情况
  return _formatUserPic(user);
};

module.exports = { formatUser };
