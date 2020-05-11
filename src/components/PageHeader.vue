<!--
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-25 15:18:07
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 16:21:55
 * @FilePath: \api-gateway-web\src\components\PageHeader.vue
 -->
<template>
  <header>
    <div class="logo">
      <i class="iconfont icon-api-gateway"></i>
      <strong>Data<span style="color: #0766FF;">Service</span></strong>
    </div>
    <el-menu
      class="nav"
      :default-active="activeIndex"
      mode="horizontal"
      background-color="#2d3664"
      text-color="#c0c4cc"
      active-text-color="#fff"
      :router="true">
      <el-menu-item index="/develop">开发中心</el-menu-item>
      <el-menu-item index="/service">服务中心</el-menu-item>
      <el-menu-item index="/platform">平台管理</el-menu-item>
    </el-menu>
    <div class="project-select">
    </div>
    <div class="help">
      <i
        class="el-icon-question"
        style="margin: 0 5px 0 0"></i>帮助
      <!-- <router-link to="/develop">帮助</router-link> -->
    </div>
    <div class="user-info">
      <span>您好，</span>
      <span style="color: #fff;">李鑫</span>
      <el-avatar :size="32" fit="scale-down" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
    </div>
  </header>
</template>
<script type="text/ecmascript-6">

export default {
  name: 'page-header',
  components: {},
  props: [],
  data() {
    return {
      activeIndex: '/',
    };
  },
  computed: {},
  watch: {
    $route() {
      this.activeIndex = typeof this.$route.meta !== 'undefined' ? `/${this.$route.meta.activeItem.split('/')[1]}` : '';
    },
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
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {},
  },
};

</script>
<style lang="scss" scoped>
header {
  display: flex;
  background-color: #2d3664;
  & .logo {
    width: 300px;
    padding: 0px 20px;
    line-height: 60px;
    color: #fff;
    & i {
      display: inline-block;
      margin: -4px 0 0 0;
      font-size: 42px;
      line-height: 42px;
      vertical-align: middle;
      padding: 0 10px 0 0;
    }
    & strong {
      font-size: 20px;
      vertical-align: top;
    }
  }
  & .nav {
    flex: 1;
  }
  & .help {
    display: inline-block;
    font-size: 16px;
    line-height: 60px;
    color: #fff;
  }
  & .user-info {
    display: inline-block;
    padding: 0 40px;
    font-size: 16px;
    line-height: 60px;
    text-align: right;
    color: $secondary;
    cursor: pointer;
    & .el-avatar {
      margin: -4px 0 0 10px;
      border: 1px solid rgba(255,255,255,0.34);
      vertical-align: middle;
    }
  }

  // 覆盖element ui的样式
  & ul.nav {
    border-bottom-width: 0;
    font-size: 16px;
    & li {
      border-bottom-width: 0;
      &.is-active {
        border-bottom-width: 0;
        font-weight: $bold;
      }
    }
  }
}
</style>
