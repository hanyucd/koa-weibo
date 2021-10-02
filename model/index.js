const userModel = require('./userModel');
const blogModel = require('./blogModel');

// 一对一的关系, 外键在源模型中定义（blogModel）| 一个用户有多个博客 User.id 关联 = Blog.userId（外键）
blogModel.belongsTo(userModel, {
  foreignKey: 'userId',
});

module.exports = {
  userModel,
  blogModel
};
