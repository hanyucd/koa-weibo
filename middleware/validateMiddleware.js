const codeMsg = require('../config/codeMsg');

/**
 * 生成 json schema 验证的中间件
 * @param {function} 校验函数
 */
const validateMiddleware = validateFn => {
  // 返回中间件函数
  return async (ctx, next) => {
    const data = ctx.request.body;

    // 校验 validateFn 成功的话没有返回值
    const error = validateFn(data);
    console.log('error:', error);
    // 不存在错误对象，验证通过，继续下一步
    if (!error) return await next();

    // 验证失败
    ctx.body = codeMsg.jsonSchemaValidateError;
  }
};

module.exports = validateMiddleware;
