const Router = require('@koa/router');
const router = new Router({ prefix: '/api/blog' });
const { loginCheck } = require('../../middleware/loginCheckMiddleware');
const validateMiddleware = require('../../middleware/validateMiddleware');
const blogValidate = require('../../validator/blogValidate');
const blogHomeController = require('../../controller/blogHomeController');

// 创建微博
router.post('/create', loginCheck, validateMiddleware(blogValidate), blogHomeController.createBlog);

module.exports = router;
