<!--
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-02 12:49:46
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-02 12:50:36
 * @FilePath: \api-gateway-web\src\views\monitor\pages\index.vue
 -->

<template>
  <div class="monitor">
    <!-- 面包屑导航 -->
    <page-crumbs :data="crumbs"></page-crumbs>
    <div class="top-box">
      <h2 class="page-title">监控图表</h2>
      <div class="fn-box">
        <el-select v-model="companyValue" @change="companyChange" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
        <el-date-picker v-if="companyValue == 1 || companyValue == 2" class="h" v-model="value1" :editable="false"
          type="datetimerange" range-separator="至" :value-format="dateFormat" :format="dateFormat"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
       <!--  <el-date-picker v-if="companyValue == 2" class="h" v-model="value1" :editable="false"
          type="datetimerange" range-separator="至" :value-format="dateFormat" :format="dateFormat"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker> -->
        <el-date-picker v-if="companyValue == 3" class="h" prefix-icon="el-icon-time"
          v-model="value1" :value-format="dateFormat"
          type="daterange" :editable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!-- <el-tooltip class="item" effect="dark" :content="tipContent" placement="left">
          <i class="el-icon-question" style="margin: 0 10px;"></i>
        </el-tooltip> -->
        <el-select v-model="apiCode" :filter-method="searchApi" filterable clearable placeholder="API中文名/API英文名">
          <el-option v-for="item in apiList" :key="item.apiCode" :label="item.apiName" :value="item.apiCode"></el-option>
        </el-select>
        <el-button class="btn" @click="send" type="primary">查询</el-button>
      </div>
      <p class="tips">1、直接打开此页面时默认展示“服务列表”中第一个API当天按小时统计的数据；</p>
      <p class="tips">2、若是从服务管理中某个API的监控图标进入，则展示该API的监控图；</p> <br>
      <p class="tips">1、数据粒度为分钟最多只能查询1小时的数据，筛选时间时精确到分钟；</p>
      <p class="tips">2、数据粒度为小时最多只能查询3天的数据，筛选时间时精确到小时；</p>
      <p class="tips">3、数据粒度为小时最多只能查询30天的数据，筛选时间时精确到天；</p>
    </div>
    <div class="box">
      <basic-line-chart class="comment" ref="numberOfCallsForm" :numberOfCallsForm="numberOfCallsForm"></basic-line-chart>
      <stacked-area-chart class="comment" ref="responseTimeForm" :responseTimeForm="responseTimeForm"></stacked-area-chart>
      <basic-line-chart class="comment" ref="availabilityRateForm" :numberOfCallsForm="availabilityRateForm"></basic-line-chart>
      <basic-line-chart class="comment" ref="failureRateForm" :numberOfCallsForm="failureRateForm"></basic-line-chart>
    </div>
  </div>
</template>
<script>
import basicLineChart from '../components/_BasicLineChart';
import stackedAreaChart from '../components/_StackedAreaChart';

export default {
  name: 'Monitor',
  components: {
    basicLineChart,
    stackedAreaChart,
  },
  props: [],
  data() {
    return {
      crumbs: [
        { path: '/platform', name: '服务中心' },
        { path: '', name: '服务监控' },
        { path: '', name: '监控图表' },
      ],
      options: [
        // { value: 1, label: '按分钟' },
        // { value: 2, label: '按小时' },
        // { value: 3, label: '按天' },
      ],
      companyValue: 1, // 单位
      value1: '', // new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)
      apiCode: '', //
      restaurants: [],
      apiList: [],
      dateFormat: 'yyyy-MM-dd HH:mm',
      chartList: [], // 图表总数据
      bXAxisData: [], // 图表X轴数据
      numberOfCallsForm: { // 调用次数对象
        id: 'numberOfCalls',
        name: '调用次数',
        company: '单位：万', // 单位
        seriesNameAndLegenData: '调用次数', // 左角标
        xAxisData: [],
        seriesData: [], // 图表数据
      },
      responseTimeForm: { // 响应时长对象
        id: 'responseTime',
        name: '响应时长',
        company: '单位：ms', // 单位
        seriesNameAndLegenData: '', // 左角标
        xAxisData: [],
        seriesTimeAvgData: [], // 图表数据
        seriesTimeTp90Data: [], // 图表数据
        seriesTimeTp99Data: [], // 图表数据
        seriesTimeTp999Data: [], // 图表数据
        seriesTimeMaxData: [], // 图表数据
      },
      availabilityRateForm: { // 可用率对象
        id: 'availabilityRate',
        name: '可用率',
        company: '单位：%', // 单位
        seriesNameAndLegenData: '可用率', // 左角标
        xAxisData: [],
        seriesData: [], // 图表数据
      },
      failureRateForm: { // 失败率对象
        id: 'failureRate',
        name: '失败率',
        company: '单位：%', // 单位
        seriesNameAndLegenData: '失败率', // 左角标
        xAxisData: [],
        seriesData: [], // 图表数据
      },
    };
  },
  computed: {},
  filters: {},
  beforeCreate() {},
  created() {
    this.getCompanyList();
    this.callingMethod();
  },
  mounted() {
  },
  methods: {
    // 获取单位列表
    getCompanyList() {
      this.$api.post('/monitor/monitoringChart/getTimeGranularity', {}).then((res) => {
        console.log(res);
        this.companyValue = res[1].value; // 默认小时
        this.companyChange(this.companyValue);
        this.options = res;
      });
    },
    callingMethod(objParam = {}) {
      this.getCharts(1, objParam);
      this.getCharts(2, objParam);
      this.getCharts(3, objParam);
      this.getCharts(4, objParam);
    },
    // 监控图表展示
    getCharts(type, obj = {}) {
      let item; // 一则
      // obj.type = type;
      this.$api.post('/monitor/monitoringChart/getCharts', { ...obj, type }).then((res) => {
        if (!res) {
          return;
        }
        if (type !== 2) {
          item = res[0];
        }
        if (type === 1) { // 调用次数对象
          this.numberOfCallsForm.xAxisData = item.statisTime;
          this.numberOfCallsForm.seriesData = item.value;
        } else if (type === 3) { // 可用率对象
          this.availabilityRateForm.xAxisData = item.statisTime;
          this.availabilityRateForm.seriesData = item.value;
        } else if (type === 4) { // 失败率对象
          this.failureRateForm.xAxisData = item.statisTime;
          this.failureRateForm.seriesData = item.value;
        } else if (type === 2) { // 响应时长对象 五条线
          res.forEach(ele => {
            if (ele.key === 'avg') {
              this.responseTimeForm.seriesTimeAvgData = ele.value;
            } else if (ele.key === 'tp90') {
              this.responseTimeForm.seriesTimeTp90Data = ele.value;
            } else if (ele.key === 'tp99') {
              this.responseTimeForm.seriesTimeTp99Data = ele.value;
            } else if (ele.key === 'tp999') {
              this.responseTimeForm.seriesTimeTp999Data = ele.value;
            } else if (ele.key === 'max') {
              this.responseTimeForm.seriesTimeMaxData = ele.value;
            }
          });
          this.responseTimeForm.xAxisData = res[0].statisTime;
        }
        //
        if (this.numberOfCallsForm.xAxisData.length) {
          this.$nextTick(() => {
            this.$refs.numberOfCallsForm.drawLine();
          });
        }
        if (this.availabilityRateForm.xAxisData.length) {
          this.$nextTick(() => {
            this.$refs.availabilityRateForm.drawLine();
          });
        }
        if (this.failureRateForm.xAxisData.length) {
          this.$nextTick(() => {
            this.$refs.failureRateForm.drawLine();
          });
        }
        if (this.responseTimeForm.xAxisData.length) {
          this.$nextTick(() => {
            this.$refs.responseTimeForm.drawLine();
          });
        }
      });
    },
    // 时间单位切换
    companyChange(e) {
      if (e === 1) {
        this.dateFormat = 'yyyy-MM-dd HH:mm:00';
      } else if (e === 2) {
        this.dateFormat = 'yyyy-MM-dd HH:00:00';
      } else if (e === 3) {
        this.dateFormat = 'yyyy-MM-dd 00:00:00';
      }
      this.value1 = [];
    },
    // 查询api
    searchApi(e) {
      if (!e) {
        this.apiList = [];
        return;
      }
      this.$api.post('/apiConfig/getApiCode', { apiName: e }).then((res) => {
        this.apiList = res;
      });
    },
    send() {
      if (!this.value1 || !this.value1[0] || !this.value1[1]) {
        this.$message.error('请选择正确的时间段');
        return;
      }
      if (!this.apiCode) {
        this.$message.error('请选择要查询的API名称');
        return;
      }
      const startTiem = new Date(this.value1[0]).getTime() / 1000;
      const endTiem = new Date(this.value1[1]).getTime() / 1000;
      if (endTiem - startTiem === 0) {
        this.$message.error('请选择正确的时间段');
        return;
      }
      if (this.companyValue === 1 && (endTiem - startTiem > 3600)) {
        this.$message.error('范围不能大于一小时');
        return;
      } else if (this.companyValue === 2 && (endTiem - startTiem > 259200)) {
        this.$message.error('范围不能大于三天');
        return;
      } else if (this.companyValue === 3 && (endTiem - startTiem > 2592000)) {
        this.$message.error('范围不能大于三十天');
        return;
      }
      const objParam = {
        timeUnit: this.companyValue,
        startTime: this.value1 ? this.value1[0] : '',
        endTime: this.value1 ? this.value1[1] : '',
        apiId: this.apiCode,
      };
      // console.log('obj', objParam);
      this.callingMethod(objParam);
    },
  },
};
</script>
<style lang="scss" scoped>
  .monitor {
    padding: 10px 20px;
    .page-header {
      margin: 20px 0 20px;
      font-size: 14px;
      color: #333748;
    }
    .top-box {
      margin-bottom: 20px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      // height: 150px;
      background-color: #fff;
      padding: 30px 20px 20px;
      .tips {
        background-color: yellow;
        color: #000;
        width: max-content;
      }
      .h {
        margin: 0 20px;
        width: 400px;
        height: 36px;
      }
      .btn {
        margin-left: 20px;
      }
      .page-title {
        font-size: 24px;
        color: #333748;
      }
      .fn-box {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
    }
    .box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .comment {
        margin-bottom: 20px;
      }
    }
  }
  body .el-input .el-input__inner {
    height: 40px !important;
  }
</style>
