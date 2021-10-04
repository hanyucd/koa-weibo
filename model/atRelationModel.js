const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class AtRelation extends Model {}

/**
 * 用户关注
 */
AtRelation.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '博客 id'
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
}, {
  sequelize,
  modelName: 'at_relation',
});

module.exports = AtRelation;
