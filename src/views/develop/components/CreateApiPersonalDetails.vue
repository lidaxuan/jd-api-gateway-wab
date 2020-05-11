<!--
 * @Description:
 * @version:
 * @Author: 晏丹(yandan8@jd.com)
 * @Date: 2020-03-09 11:43:05
 * @LastEditors: 晏丹(yandan8@jd.com)
 * @LastEditTime: 2020-03-09 11:43:07
 * @FilePath: \api-gateway-web\src\views\develop\components\CreateApiPersonalDetails.vue
 -->
<template>
  <div class="personal-main">
    <ul>
      <li><span class="message-name">API中文名:</span><span>{{a}}</span></li>
      <li><span class="message-name">API英文名:</span><span>{{a}}</span></li>
      <li><span class="message-name">协议:</span><span>{{a}}</span></li>
    </ul>
    <ul>
      <li><span class="message-name">API path:</span><span>{{a}}</span></li>
      <li><span class="message-name">请求方式:</span><span>{{a}}</span></li>
      <li><span class="message-name">超时时间:</span><span>{{a}}</span></li>
    </ul>
    <ul>
      <li><span class="message-name">描述:</span><span>{{a}}</span></li>
      <li><span class="message-name">负责人:</span><span>{{a}}</span></li>
      <li><span class="message-name">创建时间:</span><span>{{a}}</span></li>
    </ul>
    <ul>
      <li><span class="message-name">编码方式:</span><span>{{b}}</span></li>
      <li><span class="message-name">服务分类:</span><span>{{a}}</span></li>
      <li><span class="message-name">是否对外开放:</span><span>{{a}}</span></li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'CreatedPersonal', // Pascal命名
  components: {},
  props: [],
  data() {
    return {
      a: 'a',
      b: 'b',
    };
  },
  filters: {},
  beforeCreate() {},
  created() {},
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {},
  },
};
</script>
<style lang="scss" scoped>
// @import "@/assets/css/common.scss";
.personal-main {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-right: 50px;
  & li {
    list-style-type: none;
    margin-right: 0;
    padding: 5px;
    & .message-name {
      display:inline-block;
      width: 100px;
      text-align: right;
    }
    & span {
      margin-left: 10px;
    }
  }
}
</style>
