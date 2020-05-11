<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-03-01 15:40:46
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-03-01 15:40:46
 * @FilePath: \api-gateway-web\src\components\ActionRecord.vue
 -->
<template>
  <div>
    <h3>选择要绑定的API</h3>
      <div class="dialog-header">
        <div class="search">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-button">
          <el-button type="primary" width="120px">搜 索</el-button>
        </div>
      </div>
      <div class="dialog-body">
        <div class="body-left">
          <el-table :data="gridData" border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="date" label="API中文名" width="150"></el-table-column>
            <el-table-column property="name" label="API英文名" width="200"></el-table-column>
            <el-table-column property="address" label="已绑策略"></el-table-column>
          </el-table>
          <el-button style="margin-top: 10px;" type="primary">添加选项中</el-button>
        </div>
        <div class="body-right">
          <el-table :data="gridData">
            <el-table-column property="date" label="已选择的API" min-width="180px">
            </el-table-column>
            <el-table-column>
              <template>
                <el-button type="primary">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name BindingApi
 * @author 晏丹(yandan8@jd.com)
 * @description 操作记录列表
 */

export default {
  name: 'BindingApi',
  components: {},
  props: [],
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }],
      dialogTableVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      input: '',
    };
  },
  computed: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {},
    showDialog() {
      this.dialogTableVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-header {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 10px;
  padding: 0 10px 0 20px;
  & .search {
    display: flex;
    & .input {
      margin-left: 10px;
    }
  }
}
.dialog-body {
  display: flex;
  justify-content: space-between;
  flex-direction:row;
  margin: 10px 20px;
}
.body-left {
  width: 60%;
  margin-right: 10px;
}
.body-right {
  border: 1px solid #DFE6EC;
  padding: 10px;
}
</style>
