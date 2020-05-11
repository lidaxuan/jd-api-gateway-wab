<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-02-28 14:45:35
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-02-28 14:45:35
 * @FilePath: \api-gateway-web\src\views\service\pages\ServiceManage.vue
 -->
<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/service' }">服务中心</el-breadcrumb-item>
        <el-breadcrumb-item><span>服务管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <el-card class="service-category">
        <!-- 服务分类业务场景区 -->
        <classification-selector></classification-selector>
      </el-card>
      <el-card>
        <div class="search">
          <el-input
            placeholder="API中文名/API英文名/发布人/负责人"
            v-model="searchInput"
            class="input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="selectProjectList">查询</el-button>
        </div>
        <!-- 列表数据 -->
        <el-table
          :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
          :data="serviceList"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          border>
          <el-table-column
            label="API中文名"
            min-width="80px">
            <template slot-scope="scope">
              <span @click="goDetailsList" class="operation" style="margin-right: 10px">{{ scope.row.api_name}}</span>
              <i @click="goMonitorCharts" class="el-icon-s-data operation"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="api_code"
            label="API英文名">
          </el-table-column>
          <el-table-column
            prop="scene.levelA"
            label="一级业务场景">
          </el-table-column>
          <el-table-column
            prop="scene.levelB"
            label="二级业务场景">
          </el-table-column>
          <el-table-column
            prop="publisher"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="chargePerson"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="publishtime"
            label="最近发布时间"
            sortable
            min-width="120px">
          </el-table-column>
          <el-table-column
            label="操作"
            width="220px">
            <template>
              <span class="operation" @click="showFusingConfigurationDialog">熔断配置</span>
              <span class="operation">下载文档</span>
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
    <!-- 熔断配置对话框 -->
    <el-dialog
      title="熔断配置"
      :visible.sync="fusingConfigurationDialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fusingConfigurationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fusingConfigurationDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name ServiceManage
 * @author 晏丹（yandan8@jd.com）
 * @description 服务管理列表页
 */
// import assetsIs from "@/assets/js/assetsIs"; //export default
// 公共组件
import ClassificationSelector from '@/components/ClassificationSelector';
import ActionRecord from '@/components/ActionRecord';


export default {
  name: 'ServiceManage', // Pascal命名
  components: {
    ClassificationSelector,
    ActionRecord,
  },
  props: [],
  data() {
    return {
      // 查询搜索框
      searchInput: '',
      // 服务列表数据
      serviceList: [],
      // 总数据条数
      total: 0,
      // 分页查询参数
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      // 操作记录对话框的显示与隐藏
      actionRecordDialogVisible: false,
      // 熔断配置对话框的显示与隐藏
      fusingConfigurationDialogVisible: false,
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    // 获取列表页数据
    async initPage() {
      const res = await this.$api.post('/api/getApis', this.queryInfo);
      console.log('--------', res);
      if (res.status !== 200) {
        console.log('错误');
      //   return this.$message.error('获取用户列表失败！')
      } else {
        this.serviceList = res.list;
        this.total = res.total;
        console.log('成功');
      }
    },
    // input框模糊查询
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
    // 点击操作记录弹出操作记录对话框
    showActionRecordDialog() {
      this.actionRecordDialogVisible = true;
    },
    // 点击熔断配置弹出熔断配置对话框
    showFusingConfigurationDialog() {
      this.fusingConfigurationDialogVisible = true;
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
    // 点击中文名跳转到API详情页
    goDetailsList() {
      this.$router.push({ path: '/develop/api-details/' });
    },
    // 点击图表跳转到监控图表页
    goMonitorCharts() {
      this.$router.push({ path: '/service/monitor/charts' });
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
  & .service-category {
    margin: 20px 0;
    & .classify {
      display: flex;
      & p{
        width: 100px;
        margin-top: 15px;
      }
      & .classify-theme {
        flex: 1;
      }
    }
  }
}
.selected {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
  & p{
    margin-right: 10px;
  }
}
.search{
  display: flex;
  width: 30%;
  margin: 20px 0;
  & .input {
    margin-right: 10px;
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
.a {
  margin-left: 10px;
}
</style>
