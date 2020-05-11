/* jshint esversion: 6 */
/*
 * @Description: 服务中心左侧菜单配置项
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-02 18:56:45
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-02 18:56:46
 * @FilePath: \api-gateway-web\src\assets\utils\menus\configs\service.js
 */
export default [
  {
    title: '服务管理',
    index: '/service',
    icon: 'el-icon-set-up',
    hasSub: false,
    disabled: false,
  },
  {
    title: '流量控制',
    index: '/service/traffic-control',
    icon: 'el-icon-sort',
    hasSub: false,
    disabled: false,
  },
  {
    title: '服务监控',
    index: '/service/monitor',
    icon: 'iconfont icon-monitor',
    hasSub: true,
    disabled: false,
    subMenu: [
      {
        title: '监控图表',
        index: '/service/monitor/charts',
        icon: 'iconfont icon-chart',
        hasSub: false,
        disabled: false,
      },
      {
        title: '报警规则',
        index: '/service/monitor/alarm',
        icon: 'iconfont icon-chart',
        hasSub: false,
        disabled: false,
      },
    ],
  },
  {
    title: '日志中心',
    index: '/service/log-center',
    icon: 'el-icon-files',
    hasSub: false,
    disabled: false,
  },
];
