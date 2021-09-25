const codeMsg = require('../config/codeMsg');

/**
 * API 登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
const loginCheck = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    return await next();
  }
  ctx.body = codeMsg.loginCheckFailError;
};

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
const loginRedirect = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    return await next();
  }
  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
  // 例如：http://localhost:3000/login?url=%2Fsetting 登录成功后
  // 最终跳转到 http://localhost:3000/setting
};

module.exports = {
  loginCheck,
  loginRedirect
};
