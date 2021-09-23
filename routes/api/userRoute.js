const Router = require('@koa/router');
const router = new Router({ prefix: '/api/user' });
const validateMiddleware = require('../../middleware/validateMiddleware');
const userValidate = require('../../validator/userValidate');
const userController = require('../../controller/userController');

// 用户名是否存在
router.post('/isExist', userController.isExist);
// 用户注册
router.post('/register', validateMiddleware(userValidate), userController.userRegister);
// 用户登录
router.post('/login', userController.login);

module.exports = router;
