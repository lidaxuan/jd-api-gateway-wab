<!--
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-09 17:37:00
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-10 15:04:14
 * @FilePath: \bbbbbb\src\views\service\pages\ServiceRulesInfo.vue
 -->

<template>
  <div class="service-rules-info">
    <page-crumbs :data="crumbs"></page-crumbs>
    <div class="content-box">
      <h2 class="content-box-title">报警规则</h2>
      <div class="alarm-configuration">
        <div class="item"><span class="name">规则名称: </span>{{rulesInfo.alarmName}} </div>
        <div class="item"><span class="name">创建人: </span>{{rulesInfo.creator}} </div>
        <div class="item"><span class="name">负责人: </span>{{rulesInfo.administrator}} </div>
        <div class="item"><span class="name">预警时机: </span>{{rulesInfo.warningTime}} </div>
        <div class="item"><span class="name">报警级别: </span>{{rulesInfo.alarmLevel}} </div>
        <div class="item"><span class="name">统计周期: </span>{{rulesInfo.statisticalPeriod}} </div>
        <div class="item"><span class="name">阈值: </span>{{rulesInfo.alarmName}} </div>
        <div class="item">
          <span class="name">报警方式: </span>
          <div>
            <span v-for="item in rulesInfo.alarmTypeids" :key="item">{{item}}&nbsp;</span>
          </div>
        </div>
        <div class="item">
          <span class="name">通知对象: </span>
          <div>
            <span v-for="item in rulesInfo.userNames" :key="item">{{item}}&nbsp;</span>
          </div>
        </div>
        <div class="item"><span class="name">报警通知间隔: </span>{{rulesInfo.alarmIntervalId}} </div>
        <div class="item"><span class="name">免打扰时段: </span>{{rulesInfo.startTime}} -- {{rulesInfo.endTime}} </div>
        <div class="item"><span class="name">报警状态: </span>{{rulesInfo.alarmStatus}} </div>
        <div class="item"><span class="name">创建时间: </span>{{rulesInfo.createdTime}} </div>
        <div class="item"><span class="name">最近更新时间: </span>{{rulesInfo.modifiedTime}} </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name serviceRulesInfo
 * @author lijixuan
 * @description 规则详情
 */
export default {
  name: 'Name', // Pascal命名
  components: {},
  props: [],
  data() {
    return {
      rulesId: '', // 报警规则id
      crumbs: [
        { path: '/service', name: '服务中心' },
        { path: '', name: '服务监控' },
        { path: '', name: '报警规则' },
        { path: '', name: '规则详情' },
      ],
      rulesInfo: {
        alarmName: '', // 规则名称
        warningTime: '', // 预警时机
        alarmLevel: '', // 告警级别
        statisticalPeriod: '', // 统计周期
        threshold: { // 阈值
          useTimeOvertop: '', // 调用次数高于
          useTimeUnder: '', // 调用次数低于
          useTimeTotal: '', // 总调用量
          availableRate: '', // 可用率
          failureRate: '', // 失败率
          averageRate: '', // 平均率
          top90ElapsedTime: '', // tp90耗时
          top99ElapsedTime: '', // tp99耗时
          top999ElapsedTime: '', // tp999耗时
          maxElapsedTime: '', // max耗时
        },
        alarmTypeids: [], // 报警方式
        userNames: [], // 通知对象
        startTime: '', // 免打扰时段（开始时间）
        endTime: '', // 免打扰时段（结束时间）
        alarmIntervalId: '', // 报警通知间隔
        alarmStatus: '', // 告警状态
      },
    };
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
  created() {
    if (this.$route.query.id) {
      this.rulesId = this.$route.query.id;
      this.getData(this.rulesId);
    }
  },
  mounted() {},
  methods: {
    getData(id) {
      this.$api.post('/monitor/warningRules/getRuleMessage', { id }).then((res) => {
        console.log(res);
        if (!res) {
          return;
        }
        this.rulesInfo = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
  .service-rules-info {
     margin: 30px 40px;
    .page-header {
      margin-bottom: 20px;
    }
    .content-box {
      padding: 25px 20px;
      background-color: #fff;
      .content-box-title {
        margin-bottom: 25px;
        color: #333748;
        display: flex;
        align-items: center;
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 20px;
          background-color: #0766FF;
          margin-right: 10px;
        }
      }
      .item {
        display: flex;
        align-items: center;
        min-height: 30px;
        line-break: 30px;
        .name {
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 20px;
          color: $capital;
        }
      }
    }
  }
</style>
