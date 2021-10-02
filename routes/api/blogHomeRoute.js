const Router = require('@koa/router');
const router = new Router({ prefix: '/api/blog' });
const { loginCheck } = require('../../middleware/loginCheckMiddleware');
const blogHomeController = require('../../controller/blogHomeController');

// 创建微博
router.post('/create', loginCheck, blogHomeController.createBlog);

module.exports = router;
