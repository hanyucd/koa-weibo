const Router = require('@koa/router');
const router = new Router();

const errorViewRoute = require('./view/errorViewRoute');
const userViewRoute = require('./view/userViewRoute');
const blogViewRoute = require('./view/blogViewRoute');
const userApiRoute = require('./api/userRoute');

module.exports = app => {
  // router.use 使用给定的中间件，当且仅当路由匹配
  router.use(userViewRoute.routes());
  router.use(blogViewRoute.routes());
  router.use(errorViewRoute.routes());

  router.use(userApiRoute.routes());

  // 加载路由中间件
  app.use(router.routes()).use(router.allowedMethods());
};
