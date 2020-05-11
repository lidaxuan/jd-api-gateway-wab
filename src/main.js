/* jshint esversion: 6 */
/*
 * @Description: 入口文件
 * @version: 0.1.0.20200224_alpha
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-24 13:54:52
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-24 14:50:17
 * @FilePath: \api-gateway-web\src\main.js
 */
import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import plugin from './assets/utils/common/plugin.js';
import global from './assets/utils/tools/global.js';
import '@/assets/styles/index.scss';
// import '@/assets/styles/iconfont/iconfont.css';
import PageCrumbs from './components/PageCrumbs';

Vue.component('PageCrumbs', PageCrumbs);

Vue.use(Element);
Vue.use(plugin);

Vue.prototype.$global = global;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
