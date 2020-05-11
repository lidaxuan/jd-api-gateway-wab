<template>
  <div class="basicLineChart">
    <div class="no-data" v-if="!responseTimeForm.xAxisData.length">暂无数据</div>
    <div v-if="responseTimeForm.xAxisData.length" :id="responseTimeForm.id" :style="{width: '540px', height: '327px'}"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts';

export default {
  name: 'basicLineChart', // Pascal命名
  components: {},
  props: ['responseTimeForm'],
  data() {
    return {};
  },
  computed: {},
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
      const myChart = echarts.init(document.getElementById(this.responseTimeForm.id));
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#fff',
        title: {
          text: that.responseTimeForm.name,
          subtext: that.responseTimeForm.company, // 单位
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
        legend: {
          data: ['tp999', 'tp99', 'tp90', 'max', 'avg'],
          right: 30,
          top: 10,
        },
        toolbox: {
          feature: {
          // saveAsImage: {}
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true,
            },
            data: that.responseTimeForm.xAxisData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
          },
        ],
        series: [
          {
            name: 'tp999',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                // position: 'top',
              },
            },
            data: that.responseTimeForm.seriesTimeTp999Data,
          },
          {
            name: 'tp99',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                // position: 'top',
              },
            },
            data: that.responseTimeForm.seriesTimeTp99Data,
          },
          {
            name: 'tp90',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                // position: 'top',
              },
            },
            data: that.responseTimeForm.seriesTimeTp90Data,
          },
          {
            name: 'max',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                // position: 'top',
              },
            },
            data: that.responseTimeForm.seriesTimeMaxData,
          },
          {
            name: 'avg',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                // position: 'top',
              },
            },
            data: that.responseTimeForm.seriesTimeAvgData,
          },
        ],
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
