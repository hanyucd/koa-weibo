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
