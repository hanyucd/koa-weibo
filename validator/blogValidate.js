const validate = require('./index');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
};

// 校验微博数据格式
const blogValidate = (data = {}) => {
  return validate(SCHEMA, data);
};

module.exports = blogValidate;
