module.exports = {
  resSuccess: { code: 0, message: '' }, // 成功
  paramError: { code: 1, message: '参数错误' },
  // 用户名已存在
  userNameIsExistError: { code: 10001, message: '用户名已存在 请检查', },
  // 注册失败
  registerFailError: { code: 10002, message: '注册失败 请重试', },
  userNameNotExistError: { code: 10003, message: '用户名不存在，可以注册' },
};
