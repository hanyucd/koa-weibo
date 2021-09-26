const BaseController = require('./baseController');
const codeMsg = require('../config/codeMsg');
const path = require('path');
const fse = require('fs-extra');

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024;
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles');

// app 启动就执行 检查是否需要创建文件存储目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
      fse.ensureDir(DIST_FOLDER_PATH); // 创建目录
  }
})

class UtilController extends BaseController {
  constructor() {
    super();
  }

  /**
   * 保存文件
   * @param {string} name 文件名
   * @param {string} type 文件类型
   * @param {number} size 文件体积大小
   */
  async uploadFile(ctx, next) {
    // console.log(ctx.req.files);
    // 获取文件
    const file = ctx.req.files['file']; // file: 对应前端 AJAX 的 upload 的 formData.append('file')
    if (!file) return;

    // 获取文件信息
    const { size, path: filePath, name, type } = file;
    // 上传文件若大于限制 则删除临时区文件 & 返回错误信息
    if (size > MAX_SIZE) {
      await fse.remove(filePath); // 先删除临时区文件
      return super.resFail(ctx, codeMsg.uploadFileSizeTooBigError);
    }

    // 文件名 时间戳 + ‘...’ 文件名称 防止重名
    const fileName = +new Date() + '-' + name;
    // 目标文件全路径
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
    // 从临时文件 移动到 目标文件(distFilePath) 路径
    await fse.move(filePath, distFilePath);
    // 返回文件路径
    return super.resSuccess(ctx, { url: `/${ fileName }` });
  }
}

module.exports = new UtilController;
