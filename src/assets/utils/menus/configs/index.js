/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-02 18:48:12
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-02 18:48:12
 * @FilePath: \api-gateway-web\src\assets\utils\menus\configs\index.js
 */
const files = require.context('.', true, /\.js$/);
const modules = {};
files.keys()
  .forEach((key) => {
    if (key === './index.js') return;
    const fileName = key.replace('./', '').replace('.js', '');
    modules[fileName] = files(key).default;
  });

export default modules;
