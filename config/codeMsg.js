module.exports = {
  resSuccess: { code: 0, message: '' }, // 成功
  // 用户名已存在
  userNameIsExistError: { code: 10001, message: '用户名已存在 请检查', },
  // 注册失败
  registerFailError: { code: 10002, message: '注册失败 请重试', },
  // 用户名不存在
  userNameNotExistError: { code: 10003, message: '用户名不存在，可以注册' },
  // 登录失败
  loginFailError: { code: 10004, message: '登录失败 请检查您的用户名和密码', },
  // 参数校验不通过
  jsonSchemaValidateError: { code: 10009, message: '参数格式校验不通过 请检查', },
};
