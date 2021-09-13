const Router = require('@koa/router');
const router = new Router();

const errorViewRoute = require('./view/errorRoute');
const userViewRoute = require('./view/userRoute');
const blogViewRoute = require('./view/blogRoute');
const userApiRoute = require('./api/userRoute');

module.exports = app => {
  router.use(userViewRoute.routes());
  router.use(blogViewRoute.routes());
  router.use(errorViewRoute.routes());

  router.use(userApiRoute.routes());

  // 加载路由中间件
  app.use(router.routes()).use(router.allowedMethods());
};
