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
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
      type="index"
      label="序号">
      </el-table-column>
      <el-table-column
        prop="op_type"
        label="操作类型">
      </el-table-column>
      <el-table-column
        prop="op_content"
        label="操作内容"
        width="300px">
      </el-table-column>
      <el-table-column
        prop="operators"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="op_time"
        label="操作时间">
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name ActionRecord
 * @author 晏丹（yandan8@jd.com）
 * @description 操作记录列表
 */

export default {
  name: 'ActionRecord',
  components: {},
  props: {
    api_code: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  computed: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    async initPage() {
      const res = await this.$api.post('/api/getOperations', this.queryInfo);
      console.log('--------', res);
      if (res.status !== 200) {
        console.log('错误');
      //   return this.$message.error('获取用户列表失败！')
      } else {
        this.tableData = res.list;
        this.total = res.total;
        console.log('成功');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
