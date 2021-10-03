const { redisSet, redisGet } = require('../db/redis');
const blogService = require('../service/blogService');
const SQUARE_CACHE_PREFIX = 'weibo_square'; // 微博广场 redis 缓存 key 前缀

/**
 * 获取广场页缓存数据列表
 * @param {Number} pageIndex 当前页面索引
 */
const getSquareCacheList = async pageIndex => {
  const cacheKey = `${ SQUARE_CACHE_PREFIX }_${ pageIndex }`;
  const cacheValue = await redisGet(cacheKey);
  console.log('缓存值有:', Boolean(cacheValue));
  // 如果处于缓存阶段 直接返回缓存的值
  if (cacheValue) return cacheValue;

  // 没有缓存，则先读取数据库
  const blogResult = await blogService.getBlogListByUser({ pageIndex });
  // 设置缓存 key 为上面的 key value为获取回来的值 缓存时间为 120 秒
  console.log('数据库查询有值:', Boolean(blogResult));
  redisSet(cacheKey, blogResult, 60 * 2);
  return blogResult;
};

module.exports = {
  getSquareCacheList,
};
