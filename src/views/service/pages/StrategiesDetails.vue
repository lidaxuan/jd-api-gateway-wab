<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-03-11 10:43:00
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-03-11 10:43:02
 * @FilePath: \api-gateway-web\src\views\service\pages\StrategiesDetails.vue
 -->
<template>
  <div style="padding:20px;background: #fff;">
    <!-- 面包屑导航 -->
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/service' }">服务中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/service/traffic-control' }"><span>流量控制</span></el-breadcrumb-item>
        <el-breadcrumb-item><span>策略详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <el-card>
        <h3>策略详情</h3>
        <div class="personal-main">
          <ul>
            <li><span class="message-name">策略名称:</span><span>{{a}}</span></li>
            <li><span class="message-name">创建人:</span><span>{{a}}</span></li>
            <li><span class="message-name">负责人:</span><span>{{a}}</span></li>
            <li><span class="message-name">时间单位:</span><span>{{a}}</span></li>
            <li><span class="message-name">流控阈值:</span><span>{{a}}</span></li>
            <li><span class="message-name">描述:</span><span>{{a}}</span></li>
            <li><span class="message-name">绑定API:</span><span>{{a}}</span></li>
            <li><span class="message-name">创建时间:</span><span>{{a}}</span></li>
            <li><span class="message-name">最近更新时间:</span><span>{{a}}</span></li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'StrategiesDetails',
  components: {
  },
  props: [],
  data() {
    return {
      a: 'a',
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
.page {
  padding: 30px 40px;
}
.page-body {
  margin-top: 20px;
  & h3 {
    font-weight: 700;
  }
  & .personal-main {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-right: 50px;
    & li {
      list-style-type: none;
      margin-right: 0;
      padding: 5px;
      & .message-name {
        display:inline-block;
        width: 100px;
        text-align: right;
      }
      & span {
        margin-left: 10px;
      }
    }
  }
}
</style>
