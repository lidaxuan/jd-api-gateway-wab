<!--
 * @Description: 业务分类选择组件
 * @version:
 * @Author: 李鑫（lixin758@jd.com）
 * @Date: 2020-03-05 15:35:33
 * @LastEditors: 李鑫（lixin758@jd.com）
 * @LastEditTime: 2020-03-05 16:26:57
 * @FilePath: \api-gateway-web\src\components\ClassificationSelector.vue
 -->

<template>
  <div class="classification-container">
    <div class="selector">
      <div class="selector-title">服务分类</div>
      <div :class="isOpen ? 'selector-content is-open' : 'selector-content'">
        <div class="level level-1">
          <div class="sub-title">一级主题</div>
          <div class="tags-container">
            <el-badge
              v-for="(item) in lv1List"
              :key="item.id"
              :value="item.subCheckedCount"
              :class="item | getClass">
              <span
                :data-id="item.id"
                :data-level="1"
                :data-path="`${lv0Path}/${item.id}`"
                :data-label="`${lv0Label}/${item.name}`"
                :data-is-leaf="item.children && item.children.length > 0 ? 'false' : 'true'"
                @click="tagClickHandler">{{ item.name }}</span>
            </el-badge>
          </div>
          <div class="more">
            <el-button
              v-if="isOpen"
              type="text"
              @click="isOpen=false">
              收起
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              v-else
              type="text"
              @click="isOpen=true">
              展开
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </div>
        </div>
        <div
          v-if="lv2Opened && lv2List.length > 0"
          class="level level-2">
          <div class="sub-title">二级主题</div>
          <div class="tags-container">
            <el-badge
              v-for="(item) in lv2List"
              :key="item.id"
              :value="item.subCheckedCount"
              :class="item | getClass">
              <span
                :data-id="item.id"
                :data-level="2"
                :data-path="`${lv1Path}/${item.id}`"
                :data-label="`${lv1Label}/${item.name}`"
                :data-is-leaf="item.children && item.children.length > 0 ? 'false' : 'true'"
                @click="tagClickHandler">{{ item.name }}</span>
            </el-badge>
          </div>
          <div class="more"></div>
        </div>
        <div
          v-if="lv3Opened && lv3List.length > 0"
          class="level level-3">
          <div class="sub-title">三级主题</div>
          <div class="tags-container">
            <el-badge
              v-for="(item) in lv3List"
              :key="item.id"
              :value="item.subCheckedCount"
              :class="item | getClass">
              <span
                :data-id="item.id"
                :data-level="3"
                :data-path="`${lv2Path}/${item.id}`"
                :data-label="`${lv2Label}/${item.name}`"
                :data-is-leaf="item.children && item.children.length > 0 ? 'false' : 'true'"
                @click="tagClickHandler">{{ item.name }}</span>
            </el-badge>
          </div>
          <div class="more"></div>
        </div>
      </div>
    </div>
    <div class="checked-tags">
      <div class="checked-title">已选分类</div>
      <div class="checked-content">
        <el-tag
          v-for="tag in checkedLabel"
          :key="tag.path"
          closable
          @close="uncheck(tag)">
          {{tag.label}}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * @name ClassificationSelector
 * @author 李鑫（lixin758@jd.com）
 * @description 业务分类选择组件
 */

export default {
  name: 'ClassificationSelector',
  components: {},
  props: {
    value: {
      type: Array,
      default: () => { return []; },
      required: false,
    },
  },
  data() {
    return {
      isOpen: true,
      lv2Opened: true,
      lv3Opened: true,
      lv0Path: '',
      lv0Label: '',
      lv1List: [],
      lv1Path: '',
      lv1Label: '',
      lv2List: [],
      lv2Path: '',
      lv2Label: '',
      lv3List: [],
      checked: new Map(),
      checkedLabel: [],
      itemMap: [],
    };
  },
  computed: {},
  watch: {
  },
  filters: {
    getClass(value) {
      const badge = value.children && value.children.length > 0 ? '' : ' no-badge';
      const active = value.active ? ' is-active' : '';
      return `select-tag${badge}${active}`;
    },
  },
  beforeCreate() {
  },
  created() {
    this.init();
  },
  mounted() {
  },
  methods: {

    async init() {
      const list = await this.$api.get('categoryconfig/queryCategory?label=""');
      if (list && Object.prototype.toString.call(list) === '[object Array]') {
        this.lv1List = this.preTreated(list, 0);
        this.initChecked();
      }
    },

    deepLoop(list, basicPath, pathName) {
      let itemMap = {};
      list.forEach((item) => {
        const path = `${basicPath}/${item.id}`;
        const label = `${pathName}/${item.name}`;
        itemMap[item.id] = {
          path,
          label,
          id: item.id,
        };
        if (item.children.length > 0) {
          itemMap = { ...itemMap, ...this.deepLoop(item.children, path, label) };
        }
      });
      return itemMap;
    },

    initChecked() {
      if (this.value.length > 0) {
        const list = this.lv1List;
        this.itemMap = this.deepLoop(list, '', '');
        this.value.forEach((id) => {
          this.checkedLabel.push({ path: this.itemMap[id].path, label: this.itemMap[id].label });
          this.checked.set(this.itemMap[id].path, id);
        });
        this.lv1List.forEach((item) => {
          item.subCheckedCount = this.checkedLabel.filter((checkedItem) => {
            return checkedItem.path.indexOf(`/${item.id}`) === 0;
          }).length;
          if (item.subCheckedCount > 0) {
            item.active = true;
          }
        });
      }
    },

    preTreated(list, preLevel) {
      const checkedList = Array.from(this.checked.keys());
      const prePath = this[`lv${preLevel}Path`];
      return list.map((item) => {
        item.subCheckedCount = checkedList.filter((ele) => {
          return ele.indexOf(`${prePath}/${item.id}`) === 0;
        }).length;
        item.active = item.subCheckedCount > 0;
        return item;
      });
    },

    tagClickHandler(event) {
      const ev = event || window.event;
      const targetDom = ev.target;
      const parentDom = targetDom.parentElement;
      const {
        isLeaf, id, level, path, label,
      } = targetDom.dataset;
      if (isLeaf === 'true') {
        if (this.hasClass(parentDom, 'is-active')) {
          this.removeClass(parentDom, 'is-active');
          this.checked.delete(path);
          this.$emit('update:value', Array.from(this.checked.values()));
          this.checkedLabel = this.checkedLabel.filter((item) => {
            return item.path !== path;
          });
        } else {
          this.addClass(parentDom, 'is-active');
          this.checked.set(path, id);
          this.$emit('update:value', Array.from(this.checked.values()));
          if (this.checkedLabel.length === 0 || this.checkedLabel.filter((item) => { return item.path === path; }).length === 0) {
            this.checkedLabel.push({ path, label });
          }
        }
      } else if (this.hasClass(parentDom, 'is-opened')) {
        this.closeTrunk(parentDom, level);
      } else {
        const siblings = parentDom.parentNode.getElementsByClassName('is-opened');
        Array.from(siblings).map((item) => {
          this.closeTrunk(item);
          return [];
        });
        this.addClass(parentDom, 'is-opened');
        parentDom.getElementsByClassName('el-badge__content')[0].innerText = '··';
        const subList = this[`lv${level}List`].filter((value) => {
          return value.id.toString() === id;
        })[0].children;
        this[`lv${level}Path`] = path;
        this[`lv${level}Label`] = label;
        this[`lv${parseInt(level, 10) + 1}List`] = this.preTreated(subList, level);
        this[`lv${parseInt(level, 10) + 1}Opened`] = true;
        if (level === '1') {
          this.lv3Opened = false;
          this.lv3List = [];
        }
      }
    },

    getCount(path, level = 0) {
      const subChecked = Array.from(this.checked.keys()).filter((item) => {
        return item.indexOf(path) === 0 || (level !== 0 && item.split('/')[level] === path);
      });
      return subChecked.length;
    },

    closeTrunk(item, level) {
      switch (level) {
        case '1':
          this.lv2Opened = false;
          this.lv2List = [];
          this.lv3Opened = false;
          this.lv3List = [];
          break;
        case '2':
          this.lv3Opened = false;
          this.lv3List = [];
          break;
        default:
          break;
      }
      this.removeClass(item, 'is-opened');
      const originalPath = item.firstChild.dataset.path;
      const badgeDom = item.getElementsByClassName('el-badge__content')[0];
      const checkCount = this.getCount(originalPath);
      badgeDom.innerText = checkCount;
      if (checkCount > 0) this.addClass(item, 'is-active');
    },

    uncheck(tag) {
      this.checkedLabel = this.checkedLabel.filter((el) => {
        return el.path !== tag.path;
      });
      this.checked.delete(tag.path);
      this.$emit('update:value', Array.from(this.checked.values()));
      const domList = document.getElementsByClassName('select-tag is-active');
      Array.from(domList).forEach((dom) => {
        const spanDom = dom.firstChild;
        if (tag.path.indexOf(spanDom.dataset.path) === 0) {
          if (spanDom.dataset.isLeaf === 'true') {
            this.removeClass(dom, 'is-active');
          } else if (dom.lastChild.innerText === '1') {
            this.removeClass(dom, 'is-active');
            dom.lastChild.innerText = '··';
          } else if (dom.lastChild.innerText !== '··') {
            dom.lastChild.innerText = `${parseInt(dom.lastChild.innerText, 10) - 1}`;
          }
        }
        return dom;
      });
    },
    // class操作
    hasClass(elem, cls) {
      cls = cls || '';
      if (cls.replace(/\s/g, '').length === 0) return false;
      return new RegExp(` ${cls} `).test(` ${elem.className} `);
    },

    addClass(elem, cls) {
      if (!this.hasClass(elem, cls)) {
        elem.className += elem.className.length === 0 ? `${cls}` : ` ${cls}`;
      }
      return true;
    },

    removeClass(elem, cls) {
      if (this.hasClass(elem, cls)) {
        let newClass = ` ${elem.className.replace(/[\t\r\n]/g, '')} `;
        while (newClass.indexOf(` ${cls} `) >= 0) {
          newClass = newClass.replace(` ${cls} `, ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
      }
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.classification-container {
  font-weight: $semiBold;
  & .selector {
    display: flex;
    & .selector-title {
      width: 100px;
      padding: 0px 40px 0 0;
      line-height: 47px;
      color: $secondary;
    }
    & .selector-content {
      flex: 1;
      max-height: 57px;
      padding: 10px 0 0 0;
      overflow: hidden;
      transition: max-height ease-out 0.3s;
      &.is-open {
        max-height: 500px;
        transition: max-height ease-in 0.3s;
      }
      & .level {
        display: flex;
        border: 0 solid #ebeef5;
        border-bottom-width: 1px;
        padding: 18px 0 0 0;
        & .sub-title {
          width: 60px;
          line-height: 26px;
          color: $secondary;
        }
        & .tags-container {
          flex: 1;
          & .select-tag {
            display: inline-block;
            margin: 0 30px 18px 30px;
            user-select: none;
            & ::v-deep .el-badge__content {
              line-height: 15px;
              visibility: hidden;
            }
            & span {
              display: inline-block;
              padding: 6px 12px 8px 12px;
              border-radius: 17px;
              line-height: 14px;
              color: $capital;
              cursor: pointer;
            }
            &.is-active {
              & ::v-deep .el-badge__content {
                visibility: visible;
              }
              & span {
                color: #fff;
                background: #ff9800;
              }
            }
            &.is-opened {
              & ::v-deep .el-badge__content {
                visibility: visible;
              }
              & span {
                border-radius: 3px;
                color: #fff;
                background: #f5222d;
              }
            }
            &.no-badge.is-active {
              & ::v-deep .el-badge__content {
                line-height: 15px;
                visibility: hidden;
              }
            }
          }
        }
      }
      & .level:first-child {
        padding-top: 0;
      }
    }
    & .more {
      width: 80px;
      padding: 0 10px;
      text-align: right;
      & ::v-deep span {
        font-weight: $bold;
      }
      & ::v-deep i {
        font-weight: $bold;
      }
    }
  }
  & .checked-tags {
    display: flex;
    & .checked-title {
      width: 100px;
      padding: 0px 40px 0 0;
      line-height: 72px;
      color: $secondary;
    }
    & .checked-content {
      flex: 1;
      padding: 18px 0 8px 0;
      & ::v-deep .el-tag {
        margin: 0 10px 10px 0;
        color: $capital;
        user-select: none;
      }
    }
  }
}


</style>
