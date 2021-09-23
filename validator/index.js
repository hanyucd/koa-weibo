const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * 数据验证函数
 * @param {Object} schema  用于验证的json schema规则
 * @param {Object} data  要进行验证的数据
 */
const validate = (schema, data = {}) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
};

module.exports = validate;
