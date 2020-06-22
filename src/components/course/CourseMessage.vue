<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="20">

        <el-button @click="addCourse" type="primary">添加课程</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" icon="el-icon-download" @click="exportToExcel">导出课程信息</el-button>
        </el-col>
      </el-row>
      <!-- 表格部分 -->
      <el-row>
        <el-table :data="courseList" style="width: 100%">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="courseId" label="课程号"></el-table-column>
          <el-table-column prop="courseName" label="课程名"></el-table-column>
          <el-table-column prop="courseTeacher" label="任课老师"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <el-button
                @click="changeCourseMessage(props.row.courseId)"
                size="small"
                type="primary"
                icon="el-icon-edit"
              >修改</el-button>
              <el-button
                @click="deleteCourse(props.row.id)"
                size="small"
                type="danger"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!-- 添加课程弹出框 -->
    <el-dialog title="添加课程" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="course" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="任课教师">
          <el-input v-model="course.courseTeacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitCourse">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 修改课程信息 -->
    <el-dialog
      title="修改课程信息"
      :visible.sync="courseChangeVisible"
      width="30%"
      :before-close="changeCourseClose"
    >
      <el-form :model="changeCourse" label-width="80px">
        <el-form-item label="课程ID">
          <el-input v-model="changeCourse.courseId" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="changeCourse.courseName"></el-input>
        </el-form-item>
        <el-form-item label="任课教师">
          <el-input v-model="changeCourse.courseTeacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeCourseClose">取 消</el-button>
        <el-button type="primary" @click="submitChange">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 课程列表
      courseList: [],
      // 要添加的课程对象
      course: {
        courseName: "",
        courseTeacher: ""
      },
      clearCourse: {
        courseName: "",
        courseTeacher: ""
      },
      // 要修改的课程对象
      changeCourse: {
        courseId: "",
        courseName: "",
        courseTeacher: ""
      },
      //   添加课程弹出框
      dialogVisible: false,
      // 修改课程信息
      courseChangeVisible: false
    };
  },
  methods: {
    //   修改课程信息
    async changeCourseMessage(courseId) {
      console.log(courseId)
      const res = await this.$http.get("/course/msg", {
        params: {
          courseId: courseId
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        this.courseChangeVisible = true;
        this.changeCourse = res.data.map.course;
        console.log("11545", this.changeCourse);
      } else {
        this.$message.error("获取信息失败，请重新加载");
      }
    },
    //   删除课程
    async deleteCourse(id) {
      console.log(id);
      const res = await this.$http.get("/course/delete", {
        params: {
          id: id
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        this.$message.success("删除成功");
        this.getCourseList();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开添加课程的dialog
    addCourse() {
      this.dialogVisible = true;
    },
    // 提交添加的课程
    async submitCourse() {
      console.log("发起添加课程请求");
      const res = await this.$http.post("/course/add", JSON.stringify(this.course));
      if (res.data.code == 200) {
        this.$message.success("添加成功");
        this.getCourseList();
        this.course = this.clearCourse
        this.dialogVisible = false
      }else{
        this.$message.error("添加失败");
        this.dialogVisible = false
      }
    },
    changeCourseClose() {
      this.courseChangeVisible = false;
    },
    // 提交课程的修改
    async submitChange() {
      console.log("发送修改课程信息的请求");
      const res = await this.$http.post(
        "/course/update",
        JSON.stringify(this.changeCourse)
      );
      if (res.data.code == 200) {
        this.$message.success("修改成功");
        this.getCourseList();
        this.courseChangeVisible = false;
      } else {
        this.$message.error("修改失败");
        this.courseChangeVisible = false;
      }
    },
    // 获取课程列表
    async getCourseList() {
      const res = await this.$http.get("/course/list", {});
      console.log(res.data);
      if (res.data.code == 200) {
        if (res.data.map.list != null) {
          this.courseList = res.data.map.list;
        } else {
          this.courseList = null;
        }
      } else {
        this.$message.error("加载失败");
      }
    },
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = ["课程号", "课程名", "授课教师"];
        const filterVal = [
          "courseId",
          "courseName",
          "courseTeacher"
        ];
        const list = this.courseList;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "课程信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    this.getCourseList();
  }
};
</script>

<style lang="less" scoped>
</style>
