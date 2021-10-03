const { DEFAULT_PICTURE_URL } = require('../config/const');
const { timeFormat } = require('./dateTimeUtil');

// 微博内容 @nickName - userName的正则检测
const REF_FOR_AT_WHO = /@(.+?)-(\w+?)\b/g;

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
  if (!user) return null;
  // 如果传入的是用户列表 则 map 批量更新
  if (Array.isArray(user)) return user.map(_formatUserPic);
  // 是单个 obj 的情况
  return _formatUserPic(user);
};

/**
 * 格式化时间数据
 * @param {Object} obj 数据
 */
const _formatDBTime = obj => {
  obj.createdAtFormat = timeFormat(obj.create_time);
  obj.updatedAtFormat = timeFormat(obj.update_time);
  return obj;
};

/**
 * 格式化微博内容
 * 检测@ 将@ 后面变成链接的形式
 * @param {Object} obj
 */
const _formateContent = obj => {
  obj.contentFormat = obj.content;
  // 格式化 @ 使用户可被点击
  // from '哈喽 @张三 - zhangsan 你好' 
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(REF_FOR_AT_WHO, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`;
  });
  return obj;
};

/**
 * 批量或者单个更新blog的信息
 * @param {Object|Array} list
 */
const fromateBlog = list => {
  if (!list) return null;

  if (Array.isArray(list)) return list.map(_formatDBTime).map(_formateContent);

  let res = _formatDBTime(list);
  res = _formateContent(res);
  return res;
};

module.exports = { formatUser, fromateBlog };
