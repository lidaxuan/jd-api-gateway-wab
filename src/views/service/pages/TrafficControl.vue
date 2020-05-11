<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-03-09 15:13:03
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-03-09 15:13:05
 * @FilePath: \api-gateway-web\src\views\service\pages\TrafficControl.vue
 -->
<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/service' }">服务中心</el-breadcrumb-item>
        <el-breadcrumb-item><span>流量控制</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <el-card>
        <h3>流量控制</h3>
        <div class="search">
          <div class="search-left">
            <el-row
              type="flex"
              class="row-bg"
              justify="space-between"
              align="middle"
              :gutter="10">
              <el-col :span="10">
                <div class="grid-content lable">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-conten">
                  <el-input
                    placeholder="策略名称/API中文名/API英文名/创建人/负责人"
                    v-model="searchInput">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-button type="primary" @click="selectProjectList">搜索</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="new-strategy">
            <el-button icon="el-icon-plus" type="primary" @click="showAddStrategyDialogVisible">新增策略</el-button>
          </div>
        </div>
        <el-table
          :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
          :data="serviceList"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          border>
          <el-table-column
            label="策略名称">
            <template slot-scope="scope">
              <span @click="goStrategiesDetails" class="operation" style="margin-right: 10px">{{ scope.row.api_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="api_code"
            label="时间单位">
          </el-table-column>
          <el-table-column
            prop="scene.levelA"
            label="流控阈值">
          </el-table-column>
          <el-table-column
            prop="scene.levelB"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="publisher"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="publishtime"
            label="最近更新时间"
            sortable>
          </el-table-column>
          <el-table-column
            prop="chargePerson"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作"
            width="220px">
            <template>
              <span class="operation" @click="showModifyStrategyDialog">修改</span>
              <span class="operation" @click="showBindingApiDialog">绑定API</span>
              <span class="operation" @click="showActionRecordDialog">操作记录</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区 -->
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout=" prev, pager, next, sizes, total"
          :total="total"
          class="pagenation">
        </el-pagination>
      </el-card>
    </div>
    <!-- 新增策略对话框 -->
    <el-dialog
      title="新增策略"
      :visible.sync="addStrategyDialogVisible">
      <add-strategy></add-strategy>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStrategyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStrategyDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改策略对话框 -->
    <el-dialog
      title="修改策略"
      :visible.sync="modifyStrategyDialogVisible">
      <modify-strategy></modify-strategy>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyStrategyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyStrategyDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 绑定Api对话框 -->
    <el-dialog
      title="绑定API"
      :visible.sync="bindingApiDialogVisible"
      width="80%">
      <span></span>
      <binding-api></binding-api>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindingApiDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindingApiDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 操作记录对话框 -->
    <el-dialog
      title="操作记录"
      :visible.sync="actionRecordDialogVisible"
      width="50%">
      <action-record :api_code="serviceList.api_code"></action-record>
      <span slot="footer" class="dialog-footer">
        <el-button @click="actionRecordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="actionRecordDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name TrafficControl
 * @author 晏丹（yandan8@jd.com）
 * @description 流量控制列表页
 */
// 导入新增策略组件
import AddStrategy from '@/views/service/components/AddStrategy.vue';
// 导入修改策略组件
import ModifyStrategy from '@/views/service/components/ModifyStrategy.vue';
// 导入绑定API组件
import BindingApi from '@/components/BindingAPI.vue';
// 导入操作记录组件
import ActionRecord from '@/components/ActionRecord';

export default {
  name: 'TrafficControl', // Pascal命名
  components: {
    AddStrategy,
    ModifyStrategy,
    BindingApi,
    ActionRecord,
  },
  props: [],
  data() {
    return {
      // 查询搜索框
      searchInput: '',
      // 流量控制列表数据
      serviceList: [],
      // 总数据条数
      total: 0,
      // 分页查询参数
      queryInfo: {
        userId: 1,
        pageNum: 1,
        pageSize: 5,
      },
      // 新增策略对话框的显示与隐藏
      addStrategyDialogVisible: false,
      // 修改策略对话框的显示与隐藏
      modifyStrategyDialogVisible: false,
      // 绑定Api对话框的显示与隐藏
      bindingApiDialogVisible: false,
      // 操作记录对话框的显示与隐藏
      actionRecordDialogVisible: false,
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
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    async initPage() {
      const res = await this.$api.post('/api/getApis', this.queryInfo);
      console.log('--------', res);
      if (res.status !== 200) {
        console.log('错误');
        // return this.$message.error('获取用户列表失败！');
      } else {
        this.serviceList = res.list;
        this.total = res.total;
        console.log('成功');
      }
    },
    selectProjectList(value) {
      clearTimeout(this.$data.timer);
      this.$data.timer = setTimeout(() => {
        // 回调
        this.input = value;
        this.initPage();
      }, 1000);
    },
    // 已选分类标签的关闭事件
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 点击新增策略弹出新增策略对话框
    showAddStrategyDialogVisible() {
      this.addStrategyDialogVisible = true;
    },
    // 点击操作记录弹出操作记录对话框
    showActionRecordDialog() {
      this.actionRecordDialogVisible = true;
    },
    // 点击修改弹出修改策略对话框
    showModifyStrategyDialog() {
      this.modifyStrategyDialogVisible = true;
    },
    // 点击绑定Api弹出绑定Api对话框
    showBindingApiDialog() {
      this.bindingApiDialogVisible = true;
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.initPage();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNum = newPage;
      this.initPage();
    },
    // 点击策略名称跳转到策略详情页
    goStrategiesDetails() {
      this.$router.push({ path: '/service/traffic-control/strategies-details' });
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
.page {
  padding: 30px 40px;
}
.page-body {
  margin-top: 20px;
  & h3 {
    color: #303133;
    font-weight: 700;
  }
}
.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 40px 0 20px 0;
  & .search-left {
    width: 50%;
  }
  & .new-strategy {
  }
}
.operation {
  color: #1890FF;
  margin: 5px;
  cursor: pointer;
}
.pagenation {
  float: right;
  margin: 10px 30px 50px 0;
}
.lable {
  color: #303133;
  font-weight: 700;
}
</style>
