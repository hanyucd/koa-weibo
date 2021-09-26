const Router = require('@koa/router');
const router = new Router({ prefix: '/api/user' });
const validateMiddleware = require('../../middleware/validateMiddleware');
const userValidate = require('../../validator/userValidate');
const userController = require('../../controller/userController');
const { loginCheck } = require('../../middleware/loginCheckMiddleware');

// 用户名是否存在
router.post('/isExist', userController.isExist);
// 用户注册
router.post('/register', validateMiddleware(userValidate), userController.userRegister);
// 用户登录
router.post('/login', userController.login);
// 更新用户信息
router.patch('/changeInfo', loginCheck, validateMiddleware(userValidate), userController.changeUserInfo);
// 更新用户密码
router.patch('/changePassword', loginCheck, validateMiddleware(userValidate), userController.changeUserPassword);
// 退出登录
router.post('/logout', loginCheck, userController.logout);

module.exports = router;
