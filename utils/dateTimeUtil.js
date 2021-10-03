const { format } = require('date-fns');

/**
 * 格式化时间，如 2012.09.05 23:02
 * @param {string} str 时间字符串
 */
const timeFormat = str => {
  return format(new Date(str), 'yyyy.MM.dd HH:mm');
};

module.exports = {
  timeFormat
};
