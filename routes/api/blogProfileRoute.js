const Router = require('@koa/router');
const { loginCheck } = require('../../middleware/loginCheckMiddleware');
const blogProfileController = require('../../controller/blogProfileController');

const router = new Router({ prefix: '/api/profile' });

// 个人主页加载更多微博
router.get('/loadMore/:userName/:pageIndex', loginCheck, blogProfileController.getProfileBlogList);
// 关注
router.post('/follow', loginCheck, blogProfileController.follow);
// 取消关注
router.post('/unFollow', loginCheck, blogProfileController.unFollow);

module.exports = router;
