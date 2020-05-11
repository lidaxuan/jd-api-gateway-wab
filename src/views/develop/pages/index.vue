<!--
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-27 20:16:36
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-27 20:16:36
 * @FilePath: \api-gateway-web\src\views\develop\pages\index.vue
 -->
<template>
  <div class="development-overview">
    <!-- <div class="development-leftNavigation">
      <div>
        <div></div>
        <ul>
          <router-link v-for="(item,index) in navigationList" :to="{ name: 'development' }" :key="index">{{ item.name }}</router-link>
        </ul>
      </div>
    </div> -->
    <!-- 右侧列表区 -->
    <div class="list-Right">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>开发中心</el-breadcrumb-item>
        <el-breadcrumb-item>API开发</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="list-Main">
        <!-- 查询、新建区 -->
        <div class="list-Main-Header">
          <!-- 左侧查询区 -->
          <el-row :gutter="20" class="list-Main-Header-Search">
            <el-col :span="10">
              <el-input
                placeholder="API中文名/API英文名/创建人"
                v-model="inquireInput">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            <!-- 状态选择器 -->
            <el-col :span="4">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in stateSelection"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <!-- 类型选择器 -->
            <el-col :span="4">
              <el-select v-model="value" splaceholder="请选择">
                <el-option
                  v-for="item in typeSelection"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
          <!-- 右侧新建API区 -->
          <div list-Main-Header-newAPI>
            <el-button type="primary">新建API</el-button>
          </div>
        </div>
        <!-- 表格主体区 -->
        <div list-Main-Body>
          <el-table
            :header-cell-style="{background:'#FAFAFA',color:'#262626'}"
            :data="APIListData"
            style="width: 100%;"
            border
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              prop="date"
              label="API中文名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="API英文名">
            </el-table-column>
            <el-table-column
              prop="province"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="city"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="最近更新时间"
              sortable
              width="130px">
            </el-table-column>
            <el-table-column
              prop="c"
              label="最近发布时间"
              sortable
              width="130px">
            </el-table-column>
            <el-table-column
              prop="a"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="b"
              label="操作">
              <template>
                <el-link type="primary" :underline="false">进入开发</el-link>
                <el-link type="primary" :underline="false">下线</el-link>
                <el-link type="primary" :underline="false">操作记录</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页区 -->
      <el-row :gutter="20">
        <el-col :span="10" :offset="8">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout=" sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      value: '',
      // navigationList: [
      //   { name: 'API开发', jump: 'development' },
      // ],
      // 查询搜索框的数据
      inquireInput: '',
      // 状态选择器数据
      stateSelection: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }],
      typeSelection: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }],
      APIListData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        c: 'c',
        a: 'a',
        b: 'b',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        c: 'c',
        a: 'a',
        b: 'b',
      }],
      // 总数据条数
      total: 400,
      queryInfo: {
        pageSize: '',
        pageNum: '',
      },
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
</style>
