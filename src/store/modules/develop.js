/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-25 14:55:28
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 14:58:37
 * @FilePath: \api-gateway-web\src\store\modules\mdw.js
 */
const state = {
  sample: '',
};

const getters = {
};

const actions = {
};

const mutations = {
  // 例子
  setSample(data, payload) {
    data.sample = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
