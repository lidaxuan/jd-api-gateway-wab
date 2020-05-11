<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-02-27 11:45:58
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-02-27 11:45:58
 * @FilePath: \api-gateway-web\src\pages\Details.vue
 -->
 <template>
  <div class="detail">
    <!-- header/body/footer布局 -->
    <div class="detail-header">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/develop' }">开发中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/develop' }">API开发</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/details">API详情</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-body">
      <el-card>
        <div class="header">
          <h2>API详情</h2>
          <!-- <div>返回<i class="iconfont icon-fanhui"></i></div> -->
        </div>
        <div class="personal">
          <h3>基本信息</h3>
          <created-personal></created-personal>
        </div>
        <div class="details-tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="调用信息" name="first">
              <div class="details-table">
                <h3>请求参数</h3>
                <el-table
                :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
                :data="tableData"
                border
                style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="参数名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="操作符">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="是否必须"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="示例值">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="默认值">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="描述">
                  </el-table-column>
                </el-table>
              </div>
              <div class="details-table">
                <h3>返回参数</h3>
                <el-table
                :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
                :data="tableData"
                border
                style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="参数名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="示例值">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="描述">
                  </el-table-column>
                </el-table>
              </div>
              <div class="details-table">
                <h3>正常返回结果示例</h3>
                <div class="result"></div>
              </div>
              <div class="details-table">
                <h3>错误码</h3>
                <el-table
                :header-cell-style="{background:'#FAFAFA',color:'#262626',border:'1px solid #E9E9E9'}"
                :data="tableData"
                border
                style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="错误码"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="错误信息">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="描述">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="流控策略" name="second">
              <div>
                <span>绑定策略：</span>
                <el-link :underline="false" type="primary">流控策略1</el-link>
              </div>
            </el-tab-pane>
            <el-tab-pane label="熔断策略" name="third">
              <div class="fusing-strategy">
                <p>触发条件：在60秒内，超时率达到10%，且总调用次数达到10次</p>
                <p>熔断措施：返回预设值</p>
                <p>预设值配置</p>
                <el-table
                :data="tableData"
                border
                style="width: 30%">
                  <el-table-column
                  prop="name"
                  label="参数名称">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="预设值">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="告警规则" name="fourth">
              <div>
                <span>绑定规则：</span>
                <el-link :underline="false" type="primary">告警1</el-link>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
    <div class="detail-footer" />
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name Details
 * @author 晏丹
 * @description API详情页
 */

// js
// import assetsIs from "@/assets/js/assetsIs"; //export default
// import { api1, api2 } from "@/assets/js/api"; //export多个
// 公共组件

import CreatedPersonal from '@/views/develop/components/CreateApiPersonalDetails';
// 本模块组件
// import dialogCreate from "views/module_name/component/dialogCreate";

export default {
  name: 'Name', // 小写
  components: {
    CreatedPersonal,
  },
  props: [],
  data() {
    return {
      activeName: 'first',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
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
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
.detail {
  // width: 100%;
  margin: 30px 40px 30px 40px;
  background-color: #F4F4F4;
  // display: flex;
  .detail-header {
  }
  .detail-body {
    height: 100%;
    margin-top: 20px;
    & .header {
      display: flex;
      justify-content: space-between;
      border-left: 3px solid #108EE9;
      margin-left: 10px;
      padding: 5px 10px;
      & h2 {
        font-weight: 700;
      }
    }
    & .personal {
      margin: 20px;
      border-bottom: 1px solid #DFE4ED;
    }
    & .details-tabs {
      min-height: 500px;
      margin-left: 20px;
      & .details-table {
        margin-top: 40px;
        & .result {
        width: 100%;
        height: 300px;
        background-color: #FAFAFC;
      }
      }
    }
  }
  h3 {
    border-left: 3px solid #108EE9;
    padding-left: 10px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  .fusing-strategy {
    & p {
      margin: 10px;
    }
  }
}
</style>
