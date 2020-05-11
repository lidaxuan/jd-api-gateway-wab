/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-25 14:55:28
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 15:04:41
 * @FilePath: \api-gateway-web\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import modules from './modules/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
