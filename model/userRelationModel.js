const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserRelation extends Model {}

/**
 * 用户关注
 */
UserRelation.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
}, {
  sequelize,
  modelName: 'user_relation',
});

module.exports = UserRelation;
