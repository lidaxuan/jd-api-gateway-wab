<template>
  <div class="basicLineChart">
    <div class="no-data" v-if="!numberOfCallsForm.xAxisData.length">暂无数据</div>
    <div v-if="numberOfCallsForm.xAxisData.length" :id="numberOfCallsForm.id" :style="{width: '540px', height: '327px'}"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts';

export default {
  name: 'basicLineChart', // Pascal命名
  components: {},
  props: ['numberOfCallsForm'],
  data() {
    return {};
  },
  computed: {

  },
  filters: {},
  beforeCreate() {},
  created() {},
  mounted() {
    // this.drawLine();
  },
  methods: {
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById(this.numberOfCallsForm.id));
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#fff',
        title: {
          text: that.numberOfCallsForm.name, // '调用次数'
          subtext: that.numberOfCallsForm.company, // 单位
          left: '20',
          align: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          left: '12%',
          top: '20%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: that.numberOfCallsForm.xAxisData, //  ['1', '2', '3', '4']
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          lineHeight: 10,
        },
        series: [{
          data: that.numberOfCallsForm.seriesData,
          name: that.numberOfCallsForm.seriesNameAndLegenData,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#0766FF', // 改变折线点的颜色
              lineStyle: {
                color: '#0766FF', // 改变折线颜色
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          symbolSize: 10,
        }],
        legend: {
          data: [that.numberOfCallsForm.seriesNameAndLegenData],
          right: 50,
          top: 10,
        },
        itemStyle: {
          normal: {
            color: '#8cd5c2', // 改变折线点的颜色
            lineStyle: {
              color: '#8cd5c2', // 改变折线颜色
            },
          },
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
  .no-data {
    width: 540px;
    height: 327px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
</style>
