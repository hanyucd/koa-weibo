module.exports = {
  resSuccess: { code: 0, message: '' }, // 成功
  // 参数校验不通过
  jsonSchemaValidateError: { code: 1, message: '参数格式校验不通过 请检查' },
  // 用户名已存在
  userNameIsExistError: { code: 10001, message: '用户名已存在 请检查', },
  // 注册失败
  registerFailError: { code: 10002, message: '注册失败 请重试', },
  // 用户名不存在
  userNameNotExistError: { code: 10003, message: '用户名不存在，可以注册' },
  // 密码不正确
  passwordError: { code: 10004, message: '密码不正确' },
  // 登录失败
  loginFailError: { code: 10005, message: '登录失败 请检查您的用户名和密码' },
  // 当前未登录
  loginCheckFailError: { code: 10006, message: '当前未登录', },
  // 文件过大
  uploadFileSizeTooBigError: { code: 10007, message: '上传文件尺寸过大' },
  // 更新用户信息错误
  updateUserInfoError: { code: 10008, message: '修改基本信息失败', },
  // 更新用户密码错误
  updateUserPasswordError: { code: 10009, messgae: '修改密码失败', },

  // 创建微博失败
  createBlogError: { code: 11001, message: '创建微博失败，请重试', },
  // 删除微博失败
  deleteBlogError: { code: 11002, message: '删除微博失败，请重试', },
};
