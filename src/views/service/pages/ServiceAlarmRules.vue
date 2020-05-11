<!--
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-08 10:59:27
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-10 16:23:46
 * @FilePath: \bbbbbb\src\views\service\pages\ServiceAlarmRules.vue
 -->

<template>
  <div class="service-alarm-rules">
    <page-crumbs :data="crumbs"></page-crumbs>
    <div class="content-box">
      <h2 class="content-box-title">报警规则</h2>
      <div class="fn-box">
        <div class="fn-box-query">
          <div class="fn-box-query-left">
            <el-select  v-model="queryInfo.condition" clearable placeholder="请选择">
              <el-option
                v-for="item in options" :key="item.value"
                :label="item.label" :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input v-model.trim="queryInfo.ruleMsg" class="fn-box-query-left-ipt" placeholder="规则名称/API中文名/API英文名/创建人/负责人" suffix-icon="el-icon-search"></el-input>
            <el-select class="fn-box-query-left-select" v-model="queryInfo.alarmType" clearable placeholder="请选择">
              <el-option
                v-for="item in warningListOptions" :key="item.value"
                :label="item.key" :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button @click="searchBtn" type="primary">查询</el-button>
          </div>
          <div class="fn-box-query-right"><el-button @click="creatRulesBtn" type="primary">新建规则</el-button></div>
        </div>
        <div class="fn-box-table">
          <el-table class="table" :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
          :data="serviceList" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" @sort-change="sortChange"
          border>
            <el-table-column prop="alarmName" label="规则名称" header-align="center" align="center">
              <template slot-scope="scope">
                <a href="javascript:;" @click="ruleName(scope.row)">{{scope.row.alarmName}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="alarmType" label="预警时机" header-align="center" align="center">
              <template slot-scope="scope">
                <span v-for="item in 3" :key="item">
                  <span v-if="item === scope.row.alarmType">{{item}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="timeUnit" label="统计周期" header-align="center" align="center"></el-table-column>
            <el-table-column prop="threshold" label="阈值" header-align="center" align="center"></el-table-column>
            <el-table-column prop="administrator" label="创建人" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creator" label="负责人" header-align="center" align="center"></el-table-column>
            <el-table-column prop="modifiedTime" label="最近更新时间" width="200" sortable header-align="center" align="center"></el-table-column>
            <el-table-column prop="alarmLastTime" label="最近报警时间" width="200" sortable header-align="center" align="center"></el-table-column>
            <el-table-column prop="alarmOpen" label="状态" header-align="center" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" :on-value="1" :off-value="0" @change="switchChange($event, scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220px">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: space-around; cursor: pointer">
                  <span @click="editBtn(scope.row)" class="operation">修改</span>
                  <span @click="bindingBtn(scope.row)" class="operation">绑定API</span>
                  <span @click="operationBtn(scope.row)" class="operation">操作记录</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区 -->
          <div class="pagenation">
            <el-pagination layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum" :page-size="queryInfo.pageSize"
              :page-sizes="[ 10, 15, 20]" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="操作记录" width="70%" :visible.sync="dialogTableVisible">
      <el-table border :data="operationRecordData">
        <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column property="opType" label="操作类型" width="150" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-for="(item, index) in operationTypeArr" :key="index">
              <span v-if="item.id === scope.row.opType">{{item.name}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="opContent" label="操作内容" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column property="v" label="操作人" width="150" header-align="center" align="center"></el-table-column>
        <el-table-column property="opTime" label="操作时间" header-align="center" align="center"></el-table-column>
      </el-table>
      <div class="pagenation">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
          @size-change="dialogHandleSizeChange" @current-change="dialogHandleCurrentChange"
          :current-page="dialogQuery.pageNum" :page-size="dialogQuery.pageSize"
          :page-sizes="[ 10, 15, 20]" :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name ServiceAlarmRules
 * @author 李继玄
 * @description 报警规则
 */

export default {
  name: 'Name', // Pascal命名
  components: {},
  props: [],
  data() {
    return {
      crumbs: [
        { path: '/service', name: '服务中心' },
        { path: '', name: '服务监控' },
        { path: '', name: '报警规则' },
      ],
      queryInfo: {
        pageNum: 10,
        pageSize: 1,
        condition: '', // 第一个下拉框  条件(1.规则名称/2.API中文名/3.API英文名/4.创建人/5.负责人)
        ruleMsg: '', // 搜索框 规则搜索字段
        alarmType: '', // 报警类型
        sortUpdateTime: '', // 按更新时间排序(1.正序 2.倒序)
        sortAlarmTime: '', // 按报警时间排序(1.正序 2.倒序)
      },
      warningListOptions: [],
      operationTypeArr: [
        { name: '删除', id: 0 },
        { name: '插入', id: 1 },
        { name: '修改', id: 2 },
      ],
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
      ],
      serviceList: [],
      total: 0,
      // 弹框参数
      dialogTableVisible: false,
      operationRecordData: [], // 操作记录
      currentOperationData: {}, // 当前点击的操作对象
      dialogQuery: {
        pageNum: 1,
        pageSize: 5,
      },
      dialogTotal: 0, // 总数
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
    this.getData();
    this.getWarningList();
  },
  mounted() {},
  methods: {
    // 获取数据
    async getData() {
      const res = await this.$api.post('/monitor/warningRules/getList', this.queryInfo);
      // console.log(res);
      this.serviceList = res.records;
      this.total = res.total;
    },
    // 获取告警类别
    async getWarningList() {
      const res = await this.$api.post('/monitor/warningRules/getWarningTime', this.queryInfo);
      console.log(res);
      this.warningListOptions = res;
    },
    // 查询按钮
    searchBtn() {
      if (!this.queryInfo.condition && this.queryInfo.ruleMsg === '' && !this.queryInfo.alarmType) {
        return;
      }
      this.getData();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getData();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getData();
    },
    // 排序
    sortChange(column) {
      this.queryInfo.sortUpdateTime = undefined;
      this.queryInfo.sortAlarmTime = undefined;
      if (column.prop === 'updateTime') { // 最近更新时间
        if (column.order === 'descending') { // 倒序
          this.queryInfo.sortUpdateTime = '2';
        } else {
          this.queryInfo.sortUpdateTime = '1';
        }
      } else if (column.prop === 'alarmTime') { // 最近报警时间
        if (column.order === 'descending') { // 倒序
          this.queryInfo.sortAlarmTime = '2';
        } else {
          this.queryInfo.sortAlarmTime = '1';
        }
      }
      this.getData();
    },
    // table 中 报警开关 change 事件
    switchChange(e, data) {
      // console.log(e,data);
      const obj = {
        ruleId: data.id,
        status: e ? 1 : 2,
      };
      this.$api.post('/monitor/warningRules/changeState', obj).then((res) => {
        if (res) {
          this.$message({ message: '操作成功', type: 'success' });
        }
      });
    },
    // 规则名称点击
    ruleName(data) {
      console.log(data);
      this.$router.push({
        path: '/service/monitor/alarm/rules-info',
        query: {
          id: data.id,
        },
      });
    },
    // 新建规则
    creatRulesBtn() {
      this.$router.push({
        path: '/service/monitor/alarm/creat-rules',
      });
    },
    // 编辑按钮
    editBtn(data) {
      console.log(data);
    },
    // 绑定API
    bindingBtn(data) {
      console.log(data);
      this.$router.push({
        path: '/service/monitor/alarm/bind-api',
      });
    },
    // 操作记录
    async operationBtn(data) {
      this.dialogQuery.pageNum = 1;
      this.currentOperationData = data;
      this.dialogTableVisible = true; // 弹框展示
      const obj = {
        opCxtEm: '规则',
        opKey: data.id, //
        pageNum: this.dialogQuery.pageNum,
        pageSize: this.dialogQuery.pageSize,
      };
      const res = await this.$api.post('/operationlog/getOperationLog', obj);
      console.log(res);
      this.operationRecordData = res.records;
      this.dialogTotal = res.total;
    },
    // 监听 pagesize 改变的事件
    dialogHandleSizeChange(newSize) {
      this.dialogQuery.pageSize = newSize;
      this.operationBtn(this.currentOperationData);
    },
    // 监听 页码值 改变的事件
    dialogHandleCurrentChange(newPage) {
      this.dialogQuery.pageNum = newPage;
      this.operationBtn(this.currentOperationData);
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
  .service-alarm-rules {
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
      }
      .fn-box {
        .fn-box-query {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .fn-box-query-left {
            display: flex;
            align-items: center;
            .fn-box-query-left-ipt {
              width: 340px;
              margin: 0 20px;
            }
            .fn-box-query-left-select {
              margin: 0 20px 0 0;
            }
          }
        }
      }
      .table {
        margin: 20px 0 0;
      }
    }
    .pagenation {
      margin-top: 20px;
      .el-pagination {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
