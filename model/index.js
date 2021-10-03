const userModel = require('./userModel');
const blogModel = require('./blogModel');
const userRelationModel = require('./userRelationModel');

// 一对一的关系, 外键在源模型中定义（blogModel）| 一个用户有多个博客 User.id 关联 = Blog.userId（外键）
blogModel.belongsTo(userModel, {
  foreignKey: 'userId',
});

// 一个用户有很多的粉丝 UserRelation.followerId（外键） 关联 = user.id
userRelationModel.belongsTo(userModel, {
  foreignKey: 'followerId',
});
// 一个用户有很多的 用户关系 如我关注了x，y关注了我 userRelation.userId（外键）关联= user.id
userModel.hasMany(userRelationModel, {
  foreignKey: 'userId'
});

// 完成博客与用户关系的连接  blog.userId 关联= userRelation.followerId
blogModel.belongsTo(userRelationModel, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  userModel,
  blogModel,
  userRelationModel
};
