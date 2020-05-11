/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-02-28 14:40:16
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-02-28 14:40:16
 * @FilePath: \api-gateway-web\src\router\routers\service.js
 */
export default {
  path: '/service',
  component: () => import('@/views/service'),
  children: [
    {
      path: '/',
      name: 'service',
      component: () => import('@/views/service/pages/ServiceManage'),
      meta: {
        activeItem: '/service',
      },
    },
    {
      path: 'monitor/charts',
      name: 'service/monitor/charts',
      component: () => import('@/views/service/pages/ServiceMonitor'),
      meta: {
        activeItem: '/service/monitor/charts',
      },
    },
    {
      path: 'traffic-control',
      name: 'service/traffic-control',
      component: () => import('@/views/service/pages/TrafficControl.vue'),
      meta: {
        activeItem: '/service/traffic-control',
      },
    },
    {
      path: 'traffic-control/strategies-details',
      name: 'service/traffic-control/strategies-details',
      component: () => import('@/views/service/pages/StrategiesDetails.vue'),
      meta: {
        activeItem: '/service/traffic-control/strategies-details',
      },
    },
    {
      path: 'monitor/alarm',
      name: 'service/monitor/alarm',
      component: () => import('@/views/service/pages/ServiceAlarmRules'),
      meta: {
        activeItem: '/service/monitor/alarm',
      },
    },
    {
      path: 'monitor/alarm/rules-info',
      name: 'service/monitor/alarm/rules-info',
      component: () => import('@/views/service/pages/ServiceRulesInfo'),
      meta: {
        activeItem: '/service/monitor/alarm/rules-info',
      },
    },
    /* {
      path: 'monitor/alarm/creat-rules',
      name: 'serviceSeeAlarmRules',
      component: () => import('@/views/service/pages/ServiceCreatRules'),
      meta: {
        activeItem: '/service/monitor/alarm/ServiceCreatRules',
      },
    }, */
    /* {
      path: 'aaa',
      name: 'aaa',
      component: () => import('@/views/service/pages/aaa.vue'),
      meta: {
        activeItem: '',
      },
    }, */
  ],
};
