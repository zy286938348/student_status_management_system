<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级选课</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="8">
          <el-form>
            <el-form-item label="班级">
              <el-select v-model="classId" @change="selectItem">
                <el-option
                  :key="item.classId"
                  v-for="item in classList"
                  :label="item.classId"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- <el-col :span="2" :offset="13">
          <el-button type="primary">选课</el-button>
        </el-col>-->
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未选课程" name="first">
          <el-table
            ref="multipleTable"
            :data="noSelectList"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <!-- <el-table-column type="selection" label="#"></el-table-column> -->
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="courseId" label="课程号"></el-table-column>
            <el-table-column prop="courseName" label="课程名"></el-table-column>
            <el-table-column prop="courseTeacher" label="任课老师"></el-table-column>
            <el-table-column prop="selcet" label="操作">
              <template slot-scope="props">
                <el-button type="primary" size="mini" @click="selectCourse(props.row.id)">选择课程</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已选课程" name="second">
          <el-table
            ref="multipleTable"
            :data="selectList"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="courseId" label="课程号"></el-table-column>
            <el-table-column prop="courseName" label="课程名"></el-table-column>
            <el-table-column prop="courseTeacher" label="任课老师"></el-table-column>
            <el-table-column prop="selcet" label="操作">
              <template slot-scope="props">
                <el-button type="danger" size="mini" @click="deleteCourse(props.row.id)">删除课程</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classId: "1",
      // 已选课程信息
      selectList: [],
      // 未选课程信息
      noSelectList: [],
      // 班号列表
      classList: [],
      activeName: "first"
    };
  },
  methods: {
    // 获取选中的列表
    handleSelectionChange(val) {
      this.selectCourse = val;
      console.log(val);
    },
    //使用选中的数组赋值给选择框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 标签切换的监听
    handleClick(tab, event) {
      // console.log(tab, event)
      console.log(tab.index);
      console.log(this.classId);
      if (tab.index == 1) {
        this.getSelectCourseList();
      } else {
        this.getUnSelectCourseList();
      }
    },
    // 下拉框选择班级
    selectItem() {
      console.log(this.classId);
      console.log(this.activeName);
      if (this.activeName == "first") {
        this.getUnSelectCourseList();
      } else {
        this.getSelectCourseList();
      }
    },
    // 发送请求，获取已选课情况
    async getSelectCourseList() {
      const res = await this.$http.get("/course/selectList", {
        params: {
          classId: this.classId
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        if (res.data.map.list != null) this.selectList = res.data.map.list;
      } else {
        this.$message.error("获取信息失败");
      }
    },
    // 发送请求，获取未选课情况
    async getUnSelectCourseList() {
      const res = await this.$http.get("/course/unSelectList", {
        params: {
          classId: this.classId
        }
      });
      console.log('hahhhhh ',res);
      // if (res.data.code == 200) {
      if (res.status == 200) {
        this.noSelectList = res.data.map.list;
      } else {
        this.$message.error("获取信息失败");
      }
    },
    // 获取班级列表
    async getClassNum() {
      const res = await this.$http.get("/class/list", {});
      if (res.data.code == 200) {
        this.classList = res.data.map.list;
        this.classId = res.data.map.list[0].classId;
      }
      // console.log('ahhah',res.data);
    },
    // 选课
    async selectCourse(courseId) {
      const res = await this.$http.get("/course/choose", {
        params: {
          courseId: courseId,
          classId: this.classId
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        this.getUnSelectCourseList();
        this.$message.success("选课成功");
      } else {
        this.$message.error("选课失败");
      }
    },
    // 删除课程
    async deleteCourse(courseId) {
      const res = await this.$http.get("/course/unChoose", {
        params: {
          courseId: courseId,
          classId: this.classId
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        this.getSelectCourseList();
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
    }
  },
  created() {
    this.getClassNum();
    this.getUnSelectCourseList();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>
