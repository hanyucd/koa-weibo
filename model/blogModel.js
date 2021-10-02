const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Blog extends Model {}

Blog.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '发布用户 id'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: DataTypes.STRING,
    comment: '微博图片'
  }
}, {
  sequelize,
  modelName: 'blog',
});

module.exports = Blog;
