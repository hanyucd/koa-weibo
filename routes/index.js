const Router = require('@koa/router');
const router = new Router({ prefix: '' });

const errorViewRoute = require('./view/error');
const userApiRoute = require('./api/userRoute');

module.exports = app => {
  app.use(errorViewRoute.routes(), errorViewRoute.allowedMethods());

  app.use(userApiRoute.routes(), userApiRoute.allowedMethods());

  // 加载路由中间件
  // app.use(router.routes()).use(router.allowedMethods());
};
