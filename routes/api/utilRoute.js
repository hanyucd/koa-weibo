const Router = require('@koa/router');
const router = new Router({ prefix: '/api/util' });
const koaFrom = require('formidable-upload-koa');
const utilController = require('../../controller/utilController');
const { loginCheck } = require('../../middleware/loginCheckMiddleware');

// 上传图片
router.post('/upload', loginCheck, koaFrom(), utilController.uploadFile);

module.exports = router;
