<!--
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-10 11:04:15
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-10 11:04:23
 * @FilePath: \api-gateway-web\src\components\PageCrumbs.vue
 -->
<template>
  <div class="page-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in data" :key="index">
        <router-link v-if="item.path" :to="item.path">{{item.name}}</router-link>
        <span v-else>{{item.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name PageCrumbs
 * @author lijixuan
 * @description 面包屑
 */

export default {
  name: 'Name', // Pascal命名
  components: {},
  props: ['data'],
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
// @import "@/assets/css/common.scss";
.page-header {
  margin-bottom: 20px;
  font-size: 14px;
  color: $curmbsColor;
}
</style>
