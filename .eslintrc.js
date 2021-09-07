module.exports = {
  // 环境定义了预定义的全局变量
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  // 继承 eslint 中推荐的 (打钩的) 规则项
  extends: 'eslint:recommended',
  // 指定全局变量
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  // JavaScript 语言选项 es*
  parserOptions: {
    'ecmaVersion': 2021
  },
  /**
   * off 或 0 - 关闭规则
   * warn 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * error 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }], // 缩进使用 2个空格
    'semi': ['error', 'always'], // 强制在语句末尾使用分号
    'no-var': 'off', // 禁用 var，用 let 和 const 代替
    'no-multiple-empty-lines': ['error', { 'max': 1 }], // 空行最多不能超过 1 行
    'eqeqeq': ['warn', 'always', { 'null': 'ignore' }], // 必须使用 === 和 !== ，和 null 对比时除外
    'comma-spacing': ['error', { 'before': false, 'after': true }], // 控制逗号前后的空格
    'no-multi-spaces': 'error', // 禁止使用多个空格
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }], // 强制使用单引号 & 允许字符串使用反勾号
    'space-before-blocks': ['error', 'always'], // 强制在块之前使用一致的空格
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'object-curly-spacing': ['error', 'always'], // 强制在花括号中使用一致的空格
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    'space-in-parens': ['error', 'never'], // 强制圆括号内没有空格
    'block-spacing': ['error', 'always'], // 代码块花括号前后的空格规则
    'keyword-spacing': 'error', // 关键字前后必须有空格
    'arrow-spacing': 'error', // 箭头函数前后使用空格
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    'no-useless-catch': 'off', // 禁止不必要的 catch 子句
    'no-async-promise-executor': 'off', // 禁止使用异步函数作为 Promise executor
    'require-atomic-updates': 'off', // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    'no-unreachable': 'off', // 禁止在 return、throw、continue 和 break 语句后出现
  }
};
