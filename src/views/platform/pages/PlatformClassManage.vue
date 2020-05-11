<!--
import { fork } from 'child_process';
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan5@jd.com）
 * @Date: 2020-02-29 12:25:42
 * @LastEditors: 李继玄（lijixuan5@jd.com）
 * @LastEditTime: 2020-02-29 12:34:33
 * @FilePath: \api-gateway-web\src\views\classManage\pages\index.vue
 -->
<template>
  <div class="class-manage">
    <page-crumbs :data="crumbs"></page-crumbs>
    <div class="class-manage-box">
      <div class="content">
        <!-- <div class="top-box">
          <el-input v-model.trim="searchIpt"  @keyup.enter.native="filtrate"></el-input>
          <el-button @click="filtrate" type="primary" style="margin-left:.4rem;">筛选</el-button>
        </div> -->
        <el-tree class="filter-tree tree-box" :data="dataList" :props="defaultProps" default-expand-all node-key="id" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree">
          <div class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="mouseenter(data, node)" @mouseleave="mouseleave(data)">
            <span v-show="!data.editFlag">{{ node.label }}</span>{{data.editFlagasd}}
            <input ref="nodeIpt" class="nodeipt" type="text" :style="{width:text(editNodeInfo.label)}"
              v-if="data.editFlag" @input="nodeEditIpt(node, data)" v-model="editNodeInfo.label" @blur="iptBlur(node, data)">
            <div calss="tree-btn-box" style="width: 100px; display: flex; justify-content: space-around;">
              <el-link v-show="data.showFlag" size="mini" type="primary" @click="editBtn( node, data, 'edit')" icon="el-icon-edit"></el-link>
              <el-link v-show="data.showFlag" size="mini" type="primary" @click="remove( node, data, 'remove')" icon="el-icon-remove"></el-link>
              <el-link v-show="data.showFlag" size="mini" type="primary" @click="addSameLevelBtn( node, data, 'addSameLevel')" icon="el-icon-circle-plus"></el-link>
              <el-link v-show="data.showFlag" size="mini" type="primary" @click="addBtn( node, data, 'add')" v-if="node.level != 3" icon="el-icon-arrow-right"></el-link>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      crumbs: [
        { path: '/platform', name: '平台管理' },
        { path: '', name: 'API分类管理' },
      ],
      dataList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      currentData: undefined,
      searchIpt: '', // 输入框筛选字段
      editNodeInfo: {
        label: '',
      },
      editNodeInfoLabel: '',
      isEditFlag: false, // 当前是否在编辑
      flag: true,
    };
  },
  filters: {},
  computed: {

  },
  beforeCreate() {},
  created() {
    this.getData();
  },
  methods: {
    text(value) {
      if (value === '') {
        return '170px';
      } else {
        return `${String(value).length * 14.5}px`;
      }
    },
    async getData(label = '') {
      const res = await this.$api.get('/categoryconfig/queryCategory', { label });
      if (!res) {
        return;
      }
      if (this.flag && res.length === 0) { // 假如一上来没有输入 默认造数据
        this.flag = false;
        const obj = {};
        obj.name = '一级业务场景'; // 分类名称
        obj.parentLevel = 0; // 父级id（必填）
        obj.level = 0;
        this.addApiFn(obj);
        return;
      }
      res.forEach(ele => {
        ele.label = ele.name;
        if (ele.children) {
          ele.children.forEach(el => {
            el.label = el.name;
            if (el.children) {
              el.children.forEach(e => {
                e.label = e.name;
              });
            }
          });
        }
      });
      this.dataList = JSON.parse(JSON.stringify(res));
    },
    // 编辑 按钮点击事件
    editBtn(node, data) {
      if (this.isEditFlag) {
        return;
      }
      this.isEditFlag = true;
      this.editNodeInfo = data;
      this.editNodeInfoLabel = JSON.parse(JSON.stringify(data.label));
      this.$set(data, 'editFlag', true);
      this.$nextTick(() => {
        this.$refs.nodeIpt.focus();
      });
    },
    // 输入框 输入时
    nodeEditIpt(node, data) {
      this.$set(data, 'label', this.editNodeInfo.label);
    },
    // 输入框 失去焦点时 或者回车事件
    iptBlur(node, data) {
      // console.log('this.editNodeInfo', this.editNodeInfo);
      // console.log('this.data', data);
      this.isEditFlag = false;
      this.$set(data, 'editFlag', false);
      if (this.editNodeInfoLabel === data.label) {
        return;
      }
      // console.log(data);
      const obj = {};
      obj.name = data.label;
      obj.code = data.code;
      obj.tenancyId = data.tenancyId;
      obj.projectId = data.projectId;
      obj.programId = data.programId;
      this.$api.post('/categoryconfigt/updateCategory', obj).then((res) => {
        console.log('-----------------', res);
      });
    },
    // 删除按钮
    remove(node, data) {
      if (this.dataList.length === 1) {
        this.$message.error('只有一条数据不可以删除');
        return;
      }
      // console.log(data);return;
      this.$api.get('/categoryconfig/deleteCategory', { code: data.code }).then((res) => {
        console.log('-----------------', res);
        this.getData();
      });
    },
    // 子集添加
    addBtn(node, data) {
      let str = '';
      let level = '';
      // console.log('data.level', data);
      if (data.level === 0) {
        str = '二级业务场景';
        level = 1;
      } else if (data.level === 1) {
        str = '三级业务场景';
        level = 2;
      }
      const newChild = { label: str, children: [], level };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      const obj = {};
      // obj.label = str; // 分类名称
      obj.name = str; // 分类名称
      obj.parentLevel = data.id; // 父级id（必填）
      obj.tenancyId = data.tenancyId; // 租户id（必填）
      obj.projectId = data.projectId; // 项目id（必填）
      obj.programId = data.programId; // 工程id（必填）
      obj.level = level;
      console.log('11111111111111111111', obj);
      this.addApiFn(obj);
    },
    // 添加同级按钮
    addSameLevelBtn(node, data) {
      let str = ''; let parentLevel = '';
      /* if (data.level === 0) {
        str = '一级业务场景';
      } else if (data.level === 1) {
        for (let i = 0; i < this.data.length; i++) {
          if (!this.data[i].children) {
            this.data[i].children = [];
          }
          for (let j = 0; j < this.data[i].children.length; j++) {
            if (this.data[i].children[j].id === data.id) {
              str = '二级业务场景';
              // const newChild = { label: str, children: [], level: 2 };
              // this.data[i].children.push(newChild);
            }
          }
        }
      } else if (data.level === 2) {
        this.data.forEach((ele) => {
          if (!ele.children) {
            ele.children = [];
          }
          ele.children.forEach(item => {
            if (!item.children) {
              item.children = [];
            }
            item.children.forEach((e) => {
              if (e.id === data.id) {
                str = '三级业务场景';
                // const newChild = { label: str, children: [], level: 3 };
                // item.children.push(newChild);
              }
            });
          });
        });
      } */
      if (data.level === 0) {
        str = '一级业务场景';
        parentLevel = 0;
      } else if (data.level === 1) {
        str = '二级业务场景';
        parentLevel = data.parentLevel;
      } else if (data.level === 2) {
        str = '三级业务场景';
        parentLevel = data.parentLevel;
      }
      const obj = {};
      // obj.label = str; // 分类名称
      obj.name = str; // 分类名称
      obj.parentLevel = parentLevel; // 父级id（必填）
      obj.tenancyId = data.tenancyId; // 租户id（必填）
      obj.projectId = data.projectId; // 项目id（必填）
      obj.programId = data.programId; // 工程id（必填）
      obj.level = data.level;
      console.log('data', data);

      console.log('22222222222222222222222', obj); // return;
      this.addApiFn(obj);
    },
    // 添加api 方法抽离
    addApiFn(data) {
      this.$api.post('/categoryconfig/saveCategory', data).then((res) => {
        console.log('-----------------', res);
        this.getData();
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 鼠标移入 按钮是否展示
    mouseenter(data, node) {
      this.$set(data, 'showFlag', true);
      if (node.level < 3) {
        // console.log(1);
      }
    },
    // 鼠标移出 按钮是否展示
    mouseleave(data) {
      this.$set(data, 'showFlag', false);
    },
    // 筛选的点击事件
    filtrate() {
      /* this.$refs.tree.setCurrentKey(this.searchIpt);
      return; */
      if (this.searchIpt.trim()) {
        this.getData(this.searchIpt.trim());
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .class-manage {
    display: flex;
    flex-direction: column;
    flex: none;
    width: 100%;
    min-height: 100%;
    padding: 30px 40px;
    .class-manage-box {
      width: 100%;
      background-color: #fff;
      min-height: 100%;
      padding: 20px;
    }
    .content {
      width: fit-content;
    }
    .top-box {
      width: 400px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .tree-box {
      // background-color: #f5f5f5;
      min-width: 300px;
      .nodeipt {
        height: 25px;
        background: rgba(243,244,248,0.00);
        border: 1px solid #C8CCDE;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      .tree-btn-box {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  body .el-input .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }


</style>
