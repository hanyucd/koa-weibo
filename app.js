const Koa = require('koa');
const app = new Koa();
const views = require('koa-views'); // 动态模板渲染引擎
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const { redis: redisConfig } = require('./config');
const routes = require('./routes');

require('./model');

// error handler
let onErrorConfig = {
  redirect: '/error'
};
onerror(app, onErrorConfig);

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] })); // 解析 post 数据
app.use(json());
app.use(logger()); // 打印日志
app.use(require('koa-static')(__dirname + '/public')); // 静态化资源 可以通过地址访问public下文件
app.use(require('koa-static')(path.join(__dirname, 'uploadFiles'))); // 静态化资源 可以通过地址访问 uploadFiles 下文件

// 注册 ejs 会对 context 注入 render 方法
app.use(views(__dirname + '/views', { extension: 'ejs' }));

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

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 注册路由
routes(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
