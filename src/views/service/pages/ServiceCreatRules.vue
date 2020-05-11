<!--
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-03-09 13:35:44
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-03-09 16:19:36
 * @FilePath: \bbbbbb\src\views\service\pages\ServiceCreatRules.vue
 -->
<template>
  <div class="service-creat-rules">
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/service' }">服务中心</el-breadcrumb-item>
        <el-breadcrumb-item>服务监控</el-breadcrumb-item>
        <el-breadcrumb-item>报警规则</el-breadcrumb-item>
        <el-breadcrumb-item>新建规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-box">
      <h2 class="content-box-title">报警规则</h2>
      <div class="alarm-configuration">
        <h3 class="alarm-configuration-title">报警配置</h3>
        <p class="alarm-configuration-part">设置报警规则</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="rule-form">
          <el-form-item label="规则名称" prop="name">
            <label class="mr20" slot="label">规则名称：</label>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <label class="mr20" slot="label">负责人：</label>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="预警时机" prop="region">
            <label class="mr20" slot="label">预警时机：</label>
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报警级别" prop="resource">
            <label class="mr20" slot="label">报警级别：</label>
            <el-radio-group v-model="ruleForm.resource" v-for="item in options" :key="item.value">
              <el-radio :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计周期" prop="region">
            <label class="mr20" slot="label">统计周期：</label>
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈值配置" prop="delivery">
            <label class="mr20" slot="label">阈值配置：</label>
            调用次数高于<el-input v-model="ruleForm.name"></el-input>
            或调用次数低于<el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <p class="alarm-configuration-part">设置报警规则</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="rule-form">
          <el-form-item label="报警方式" prop="type">
            <label class="mr20" slot="label">报警方式：</label>
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox value="1" label="电话" name="type"></el-checkbox>
              <el-checkbox value="2" label="短信" name="type"></el-checkbox>
              <el-checkbox value="3" label="邮件" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="通知对象" prop="desc">
            <label class="mr20" slot="label">通知对象：</label>
            <el-transfer v-model="value" :data="data" :titles="['项目成员', '已选成员']"></el-transfer>
          </el-form-item>
          <el-form-item label="免打扰时段" prop="delivery">
            <label class="mr20" slot="label">免打扰时段：</label>
            <div class="select-time">
              <el-time-select v-model="startTime" placeholder="起始时间"
                :picker-options="{ start: '00:00', step: '01:00', end: '23:00' }">
              </el-time-select>
              <el-time-select v-model="endTime" placeholder="结束时间"
                :picker-options="{ start: '00:59', step: '01:00', end: '23:59', minTime: startTime }">
              </el-time-select>
            </div>
          </el-form-item>
          <el-form-item label="报警通知间隔" prop="region">
            <label class="mr20" slot="label">报警通知间隔：</label>
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报警状态" prop="delivery">
            <label class="mr20" slot="label">报警状态：</label>
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <!--  -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * @name ServiceCreatRules
 * @author lijixuan
 * @description 新建规则
 */
export default {
  name: 'Name', // Pascal命名
  components: {},
  props: [],
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      startTime: '',
      endTime: '',
      data: generateData(),
      value: [1, 4],
      options: [
        { value: '1', label: '黄金糕' },
        { value: '2', label: '双皮奶' },
        { value: '3', label: '蚵仔煎' },
      ],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur',
          },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        date1: [
          {
            type: 'date', required: true, message: '请选择日期', trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date', required: true, message: '请选择时间', trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change',
          },
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' },
        ],
      },
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
    onSubmit() {
      console.log('submit!');
    },
    submitForm() { // formName
      /* this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      }); */
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
  .service-creat-rules {
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
      .alarm-configuration-title {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333748;
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 20px;
          background-color: #0766FF;
          margin-right: 10px;
        }
      }
      .rule-form {
        .mr20 {
          margin-right: 20px;
        }
        .select-time {
          display: flex;
        }
      }
      .alarm-configuration-part {
        display: flex;
        align-items: center;
        color: #333748;
          &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 20px;
          background-color: #0766FF;
          margin: 10px 20px;
        }
      }
    }
  }
</style>
