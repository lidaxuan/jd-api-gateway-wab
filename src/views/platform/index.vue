<!--
 * @Description: 平台管理公共组件
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-24 19:26:21
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-28 10:32:12
 * @FilePath: \api-gateway-web\src\views\platform\index.vue
 -->

<template>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
/**
 * @name Platform
 * @author 李鑫（lixin758@jd.com）
 * @description 平台管理公共组件
 */

// js
// import assetsIs from "@/assets/js/assetsIs"; //export default
// import { api1, api2 } from "@/assets/js/api"; //export多个
// 公共组件
// import header from "@/components/header";
// 本模块组件
// import dialogCreate from "views/module_name/component/dialogCreate";

export default {
  name: 'Platform', // Pascal命名
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {},
  watch: {
    // 对象写法
    // temObj: {
    //   handler(newVal, oldVal) {

    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },

    // temStr(val) {

    // },
  },
  filters: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {},
  },
};
</script>
<style lang="scss" scoped>
</style>
