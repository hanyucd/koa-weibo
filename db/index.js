const { Sequelize } = require('sequelize');
const { mysql: mysqlConfig } = require('../config');

const sequelize = new Sequelize(
  mysqlConfig.dbName,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql', // 连接的数据库类型
    logging: true, // 建议开启, 方便对照生成的 sql 语句
    timezone: '+08:00', // 时区, 不设置会与北京相差 8 小时
    pool: {
      max: 5, // 连接池中最大连接数量
      min: 0, // 最小
      idle: 10000 // 如果一个连接池 10s 之内没有被使用，则释放
    },
    // 定义 模型默认选项
    define: {
      timestamps: true, // 模型添加 createdAt 和 updatedAt 两个时间戳字段
      createdAt: 'create_time', // create_time 代替 createdAt 列的默认名
      updatedAt: 'update_time', // update_time 代替 updatedAt 列的默认名
      freezeTableName: true, // 强制表名称等于模型名称
      underscored: true, // 转换列名的驼峰命名规则为下划线命令规则
    }
  }
);

// 同步模型到数据库 sync 方法如果配置 { force: true }时，判断数据库是否有该表，如果有则会删除表，再重建。
sequelize.sync({
  // force: true,
  force: false,
  alter: true, // 检查数据库中表的当前状态 更新数据库表结构
});

module.exports = sequelize;
