const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const passwdUtil = require('../utils/passwdUtil');

class User extends Model {}

User.init({
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    unique: 'column',
    comment: '用户名 不可重复'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码',
    // 设置器
    set(value) {
      const _encryptPsd = passwdUtil.encrypt(value); // 密码加密
      this.setDataValue('password', _encryptPsd);
    }
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '昵称 可重复'
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1男性 2女性 3保密）'
  },
  picture: {
    type: DataTypes.STRING,
    comment: '头像'
  },
  city: {
    type: DataTypes.STRING,
    comment: '城市'
  }
}, {
  sequelize, // 需要传递连接实例 (必传)
  modelName: 'user', // 模型名称
  initialAutoIncrement: 10000, // 自增初始值
});

module.exports = User;
