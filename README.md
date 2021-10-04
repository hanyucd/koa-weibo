# 一个简易微博博客项目

koa + ejs + redis + mysql + sequelize

- 项目使用 koa 脚手架工具：koa-generator 生成基本结构
- koa-generic-session +  koa-redis session 会话操作
- 项目结构 MVC
- koa 获取 post 参数 (安装 koa-bodyparser 插件, 通过 ctx.request.body 获取参数)
- ajv (Node.js和浏览器中最快速的 JSON Schema验证器) 验证路由参数
- 文件上传 file（formidable-upload-koa & fs-extra ）

## 分层架构设计

- 视图层：SSR渲染呈现页面 和 页面请求 API 接口
- 路由层：view渲染、API处理、校验请求
- 控制层：实现基本业务逻辑、用户校验与返回数据格式
- 缓存层：实现 redis 和 mysql数据库之间对数据的是否缓存
- 数据层：对数据库的增删改查操作，最后返回数据实体对象
- 封装层：使用 Sequelize 对数据层进行封装操作

## Sequelize(ORM) 连接 MySQL

```js
// db/index.js

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
```

## redis连接

```js
// db/redis.js

const redis = require('redis');
const { redis: redisConfig } = require('../config');
// 创建客户端
const redisClient = redis.createClient({ host: redisConfig.host, port: redisConfig.port });

// 当连接上 redis 服务时，会尽可能快地触发一个connect事件
redisClient.on('connect', function() {
  console.log('Redis client is connected to the Server!');
});

// 当遇到连接到Redis服务器错误，或在node_redis中出现的任何其他错误时，client将触发error事件
redisClient.on('error', error => {
  console.error(error);
});

/**
 * redis set
 * @param {String} key 
 * @param {String} value 
 * @param {Number} timeout 过期时间单位 s 默认 1h
 */
const redisSet = (key, value, timeout = 60 * 60) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value);
  redisClient.expire(key, timeout); // 过期时间
};

/**
 * redis get
 * @param {String} key 
 */
const redisGet = key => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, res) => {
      if (error) return reject(error);

      if (res == null) return resolve(null);

      try {
        resolve(JSON.parse(res));
      } catch (err) {
        resolve(res);
      }
    });
  });
};

module.exports = { redisSet, redisGet };
```

## session

```js
// app.js

app.keys = ['server-koa-key']; // 设置签名的 Cookie 密钥
app.use(session({
  key: 'weibo.sid', // cookie name 默认'koa.sid'
  prefix: 'weibo:sess:', // redis key 的前缀，默认'koa:sess:'
  cookie: {
    path: '/', // 生成的 cookie 在整个网站都可以访问
    httpOnly: true, // 仅允许在 session 端修改，客户端不允许
    maxAge: 24 * 60 * 60 * 1000 // cookie过期时间 一天 ms
  },
  // ttl: 24 * 60 * 60 * 1000, // redis 过期时间 session工具默认 maxAge 时间，不需要手动添加
  store: redisStore({
    all: `${ redisConfig.host }:${ redisConfig.port }`
  })
}));
```

## 密码加密存储

使用 crypto-js 中的 AES 对称加密算法

```js
// utils/passwdUtil.js

const CryptoJS = require('crypto-js');
const secret_Key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

/**
 * 密码加密
 * @param {String} passwd 
 */
const encrypt = passwd => {
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(passwd, secret_Key);
  return ciphertext.toString();
};

/**
 * 密码解密
 * @param {*} ciphertext 
 * @returns 
 */
const decrypt = ciphertext => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secret_Key);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};

module.exports = {
  encrypt,
  decrypt
};
```
先在 userModel 中引入 passwdUtil 工具函数，然后在模型的 password 字段添加 set 设置器，(在 Sequelize 在将数据发送到数据库之前自动调用了设置器)
```js
// model/userModel.js
const passwdUtil = require('../utils/passwdUtil');

// 在设置器中添加密码加密
password: {
  type: DataTypes.STRING,
  allowNull: false,
  comment: '密码',
  // 设置器
  set(value) {
    const _encryptPsd = passwdUtil.encrypt(value); // 密码加密
    this.setDataValue('password', _encryptPsd);
  }
}
```
