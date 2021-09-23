const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * 数据验证函数
 * @param {Object} schema 用于验证的 json schema规则
 * @param {Object} data  要进行验证的数据
 */
const validate = (schema, data = {}) => {
  // 使用传入的 schema 验证数据 | 校验通过返回 true，不通过返回 false
  const valid = ajv.validate(schema, data);
  // console.log('valid', valid);
  // console.log('errors', ajv.errors);
  
  if (!valid) {
    // 在验证失败的情况下，Ajv 将错误数组分配各验证函数的 errors 属性
    return ajv.errors[0];
  }
};

module.exports = validate;
