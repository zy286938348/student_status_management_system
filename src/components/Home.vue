<template>
  <el-container class="home-container">
    <el-header height="80px">
      <div>
        <!-- <img src="../assets/logo.png" alt=""> -->
        <span>学生学籍管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          :router="true"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-xueshengxinxicaiji"></i>
              <span slot="title">学生信息</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/studentMessage" @click="saveNavState('/studentMessage')">
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-jibenxinxi"></i>
                <!-- 文本 -->
                <span>基本情况</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/messageManagement" @click="saveNavState('/messageManagement')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>信息管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-kechengguanli"></i>
              <span slot="title">课程管理</span>
            </template>
            <el-menu-item index="/classSelection" @click="saveNavState('/classSelection')">
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-kecheng"></i>
                <!-- 文本 -->
                <span>课程信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-chengjiguanli"></i>
              <span slot="title">成绩管理</span>
            </template>
            <el-menu-item
              index="/achievementStatistics"
              @click="saveNavState('/achievementStatistics')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-chengjitongji"></i>
                <!-- 文本 -->
                <span>成绩统计</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/achievementRanking" @click="saveNavState('/achievementRanking')">
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-paiming"></i>
                <!-- 文本 -->
                <span>成绩排名</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/scoreEntry" @click="saveNavState('/scoreEntry')">
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-icon_list_luru"></i>
                <!-- 文本 -->
                <span>成绩录入</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-xuanke"></i>
              <span slot="title">班级管理</span>
            </template>
            <el-menu-item
              index="/courseSelectionManagement"
              @click="saveNavState('/courseSelectionManagement')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-xueshengxinxicaiji"></i>
                <!-- 文本 -->
                <span>班级选课</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/courseManagement"
              @click="saveNavState('/courseManagement')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="iconfont icon-xueshengxinxicaiji"></i>
                <!-- 文本 -->
                <span>班级管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activePath: ""
    };
  },
  methods: {
    // 保持菜单激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  }
};
</script>

<style lang="less" scoped>
i {
  font-size: 1rem;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgb(255, 255, 255);
  display: flex;
  // 左右分开
  justify-content: space-between;
  // 上下居中
  align-items: center;
  font-size: 2rem;
  color: rgb(0, 0, 0);
  div {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: white;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
