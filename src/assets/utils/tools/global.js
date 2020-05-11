/* jshint esversion: 6 */
/*
 * @Description: 公共方法
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-02 19:30:26
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-02 19:30:26
 * @FilePath: \api-gateway-web\src\assets\utils\tools\global.js
 */
import MenuConfig from '../menus';

const global = {
  /**
   * 通过模块路由获取菜单
   */
  getMenus(routerPath) {
    if (routerPath === '/') {
      return [];
    }
    const modelRouter = routerPath.split('/')[1];
    return MenuConfig.PageMenu[modelRouter];
  },
};

export default global;
