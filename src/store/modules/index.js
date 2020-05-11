/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-25 14:55:28
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 14:56:37
 * @FilePath: \api-gateway-web\src\store\modules\index.js
 */
const files = require.context('.', true, /\.js$/);
const moudles = {};

files.keys()
  .forEach((key) => {
    if (key === './index.js') return;
    const fileName = key.replace('./', '').replace('.js', '');
    const storeModule = files(key).default;
    moudles[fileName] = storeModule;
  });

export default moudles;
