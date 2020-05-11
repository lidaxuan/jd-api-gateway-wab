<!--
 * @Description: 入口vue文件
 * @version: 0.1.0.20200225_alpha
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-24 19:26:21
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 15:10:05
 * @FilePath: \api-gateway-web\src\App.vue
 -->

<template>
  <div id="app">
    <page-header></page-header>
    <main>
      <page-aside></page-aside>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
import PageHeader from '@/components/PageHeader';
import PageAside from '@/components/PageAside';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageAside,
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_1656253_fw7aeyky5gu.css);
#app {
  display: flex;
  flex-direction: column;
  min-width: 1366px;
  height: 100%;
  & main {
    flex: 1;
    display: flex;
    & .content-container {
      position: relative;
      flex: 1;
      min-height: 100%;
      overflow: auto;
      background-color: #f4f3f9;
    }
  }
}
</style>
