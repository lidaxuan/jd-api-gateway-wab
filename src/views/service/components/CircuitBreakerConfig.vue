<!--
 * @Description: 熔断配置组件
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-10 15:22:17
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-10 15:22:22
 * @FilePath: \api-gateway-web\src\views\service\components\CircuitBreakerConfig.vue
 -->

<template>
  <div class="circuit-breaker-config">
    <el-form ref="circuitForm" :model="form" label-width="100px">
      <el-form-item label="熔断开关">
        <el-switch v-model="form.on"></el-switch>
      </el-form-item>
      <el-form-item label="触发条件">
        <el-checkbox v-model="form.timeoutCheck">谁是谁</el-checkbox>
        <br/>
        <el-checkbox v-model="form.failureCheck">谁是谁</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name CircuitBreakerConfig
 * @author 李鑫（lixin758@jd.com）
 * @description 熔断配置组件
 */

// js
// import assetsIs from "@/assets/js/assetsIs"; //export default
// import { api1, api2 } from "@/assets/js/api"; //export多个
// 公共组件
// import header from "@/components/header";
// 本模块组件
// import dialogCreate from "views/module_name/component/dialogCreate";

export default {
  name: 'CircuitBreakerConfig',
  components: {},
  props: [],
  data() {
    return {
      form: {
        on: true,
        timeoutCheck: true,
        failureCheck: true,
      },
    };
  },
  computed: {},
  watch: {
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
::v-deep .el-form .el-form-item .el-form-item__label {
  padding: 0 12px 0 0;
}
// @import "@/assets/css/common.scss";
</style>
