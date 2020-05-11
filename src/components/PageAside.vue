<!--
 * @Description:
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-02-25 16:23:05
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-02-25 18:25:37
 * @FilePath: \api-gateway-web\src\components\PageAside.vue
 -->
<template>
  <div
    class="menu-container"
    @mouseenter="isCollapseCtrl = true"
    @mouseleave="isCollapseCtrl = false">
    <el-menu
      :default-active="activeItem"
      class="aside-menu"
      :router="true"
      :collapse="isCollapse">
      <template v-for="item in menuList">
        <el-menu-item
          v-if="!item.hasSub"
          :key="item.index"
          :index="item.index"
          :disabled="item.disabled">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu
          :key="item.index"
          :index="item.index"
          v-if="item.hasSub">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.subMenu"
            :key="subItem.index"
            :index="subItem.index"
            :disabled="subItem.disabled">
            <i :class="subItem.icon"></i>
            <span slot="title">{{subItem.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <transition name="collapseIcon">
      <div
        v-show="isCollapseCtrl || isCollapse"
        class="nav-bar-collapse"
        @click="isCollapse = !isCollapse">
        <i
          class="icon-collapse"
          :class="{'el-icon-arrow-left': !isCollapse, 'el-icon-arrow-right': isCollapse}">
        </i>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'page-aside',
  components: {},
  props: [],
  data() {
    return {
      isCollapse: false,
      isCollapseCtrl: false,
      activeItem: '',
      menuList: [],
    };
  },
  computed: {},
  watch: {
    $route() {
      this.menuList = this.$global.getMenus(this.$route.path);
      if (this.menuList.length === 1) {
        this.activeItem = this.menuList[0].index;
      } else {
        this.activeItem = this.$route.meta.activeItem;
      }
    },
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
ul.aside-menu {
  width: 220px;
  height: 100%;
  padding: 20px 0;
  &.el-menu--collapse {
    width: 64px;
  }
  & li,
  & li.el-submenu {
    color: $secondary;
    i.iconfont {
      display: inline-block;
      width: 24px;
      margin-right: 5px;
      font-size: 18px;
      vertical-align: middle;
      text-align: center;
    }
    &.is-active,
    &.el-menu-item.is-active,
    &.el-menu-item:hover,
    &.el-menu-item:focus {
      font-weight: $bold;
      background-color: #fff;
      color: $capital;
      & i {
        font-weight: $bold;
        color: $baseColor;
      }
    }
    & ::v-deep .el-submenu__title {
      height: 42px;
      line-height: 42px;
      &:hover,
      &:focus {
        font-weight: $bold;
        background-color: #fff;
        color: $capital;
        & i {
          font-weight: $bold;
          color: $baseColor;
        }
      }
      color: inherit;
      background-color: inherit;
    }
  }
}
.nav-bar-collapse {
  position: fixed;
  bottom: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: $baseColor;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  & .icon-collapse {
    position: relative;
    top: 14px;
    left: 44px;
    font-size: 22px;
    color: #fff;
  }
}
.collapseIcon-enter-active,
.collapseIcon-leave-active {
  transition: all .4s;
  transition-timing-function: cubic-bezier(.06,.34,0,1.3);
}
.collapseIcon-enter,
.collapseIcon-leave-to {
  transform: translate(-50%, 50%);
  opacity: 0;
}
</style>
