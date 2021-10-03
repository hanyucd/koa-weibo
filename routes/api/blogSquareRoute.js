const Router = require('@koa/router');
const blogSquareController = require('../../controller/blogSquareController');
const { getBlogListStr } = require('../../utils/blogUtil');

const router = new Router({ prefix: '/api/square' });

/**
 * 加载更多微博
 */
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);

  const blogResult = await blogSquareController.getSquareBolgList(pageIndex);
  blogResult.blogListTpl = getBlogListStr(blogResult.blogList);

  ctx.body = { code: 0, message: '', data: blogResult };
});

module.exports = router;
