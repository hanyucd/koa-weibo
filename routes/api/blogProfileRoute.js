const Router = require('@koa/router');
const { loginCheck } = require('../../middleware/loginCheckMiddleware');
const blogProfileController = require('../../controller/blogProfileController');

const router = new Router({ prefix: '/api/profile' });

// 个人主页加载更多微博
router.get('/loadMore/:userName/:pageIndex', loginCheck, blogProfileController.getProfileBlogList);

module.exports = router;
