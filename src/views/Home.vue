<!--
 * @Description: 首页
 * @version: 0.1.0.20200225_alpha
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-24 19:26:21
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 16:03:30
 * @FilePath: \api-gateway-web\src\views\Home.vue
 -->
<template>
  <div style="padding:20px;background: #fff;">
    <!-- <api-selector
      :value.sync="value"
      style="width:350px;"></api-selector> -->
    <!-- <classification-selector :value.sync="value"></classification-selector> -->
    <circuit-breaker></circuit-breaker>
  </div>
  <!-- <div
    style="position: absolute;
      top: 30vh;
      width: 100%;
      height: 200px;
      font-size: 36px;
      text-align: center;
      line-height: 200px;
      color: #999;">
    等待填充内容
  </div> -->
</template>

<script type="text/ecmascript-6">
import ApiSelector from '@/components/ApiSelector';
import ClassificationSelector from '@/components/ClassificationSelector';
import CircuitBreaker from '@/views/service/components/CircuitBreakerConfig';

export default {
  name: 'Home',
  components: {
    ApiSelector,
    ClassificationSelector,
    CircuitBreaker,
  },
  props: [],
  data() {
    return {
      value: [],
    };
  },
  methods: {
  },
  computed: {},
  watch: {
  },
  filters: {},
  beforeCreate() {},
  created() {},
  mounted() {
  },
};
</script>
<style lang="scss" scoped>

</style>
