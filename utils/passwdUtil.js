const CryptoJS = require('crypto-js');
const secret_Key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

/**
 * 密码加密
 * @param {String} passwd 
 */
const encrypt = passwd => {
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(passwd, secret_Key);
  return ciphertext.toString();
};

/**
 * 密码解密
 * @param {String} ciphertext
 * @returns 
 */
const decrypt = ciphertext => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secret_Key);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};

/**
 * 密码加密 | md5 加密
 */
// const encrypt = password => {
//   const md5 = crypto.createHash('md5');
//   const content = `${ password }&${ SECRET_KEY }`;
//   return md5.update(content).digest('hex');
// };

module.exports = {
  encrypt,
  decrypt
};
