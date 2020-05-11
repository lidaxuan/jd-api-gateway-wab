<!--
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-04 15:26:16
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-04 15:26:16
 * @FilePath: \api-gateway-web\src\components\ApiSelector.vue
 -->
<template>
  <div class="input-container">
    <i class="el-icon-search"></i>
    <el-select
      v-model="apiCode"
      filterable
      remote
      autocomplete
      clearable
      :size="size"
      :placeholder="placeholder"
      :remote-method="getApiList"
      :loading="loading"
      @change="changeHandler">
      <el-option
        v-for="item in apiList"
        :key="item.api_code"
        :label="item.api_name"
        :value="item.api_code">
        <span class="api-title">{{ item.api_name }}</span>
        <span class="api-code">{{ item.api_code }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @name ApiSelector
 * @author 李鑫（lixin758@jd.com）
 * @description API搜索插件
 */

export default {
  name: 'ApiSelector',
  components: {},
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    serchParams: {
      type: Object,
      default: () => {},
      required: false,
    },
    size: {
      type: String,
      default: 'medium',
      required: false,
    },
    placeholder: {
      type: String,
      default: 'API中文名/API英文名/发布人',
      required: false,
    },
  },
  data() {
    return {
      apiCode: this.value,
      apiList: [],
    };
  },
  computed: {},
  watch: {
  },
  filters: {},
  beforeCreate() {},
  created() {},
  mounted() {
  },
  methods: {
    getApiList(query) {
      this.loading = true;
      if (query !== '') {
        const params = {
          conditions: query,
          ...this.serchParams,
        };
        this.$api.post('/api/getApis', params).then((data) => {
          this.apiList = data.list;
          this.loading = false;
        });
      } else {
        this.apiList = [];
      }
    },
    changeHandler(value) {
      this.$emit('change', value);
      this.$emit('update:value', value);
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
.input-container {
  position: relative;
  .el-icon-search {
    position: absolute;
    top: calc(50% - 0.5em);
    left: 15px;
    z-index: 1;
    display: inline-block;
    font-size: inherit;
    line-height: 100%;
    color: $weakly;
  }
  ::v-deep input.el-input__inner {
    padding: 0 20px 0 40px;
  }
  .api-title {
    float: left;
  }
  .api-code {
    float: right;
    color: $secondary;
    font-size: 12px;
  }
}

</style>
