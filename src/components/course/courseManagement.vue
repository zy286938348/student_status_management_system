<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-button type="primary" @click="add">添加班级</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" icon="el-icon-download" @click="exportToExcel">导出班级信息</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="classList" style="width: 100%">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="classId" label="班级号"></el-table-column>
          <el-table-column prop="classTeacher" label="班主任"></el-table-column>
          <el-table-column label="学生信息">
            <template slot-scope="props">
              <el-button type="text" @click="showStudentList(props.row.classId)">学生信息</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <el-button type="text" @click="changeClass(props.row.classId)">修改信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!-- 学生信息弹出框 -->
    <el-dialog title="学生信息" :visible.sync="studentDialogVisible" width="40%" :show-close="false">
      <el-table :data="students">
        <el-table-column prop="stuNum" label="学号"></el-table-column>
        <el-table-column prop="stuName" label="姓名"></el-table-column>
        <el-table-column prop="stuPhone" label="电话"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改班级信息 -->
    <el-dialog title="修改信息" :visible.sync="classDialogVisible" width="15%">
      <el-form :model="classModel">
        <el-form-item>
          <el-input v-model="classModel.classId" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="classModel.classTeacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeClassMessage">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 添加班级 -->
    <el-dialog title="添加班级" :visible.sync="addDlassDialogVisible" width="30%">
      <el-form :model="addClass">
        <el-form-item>
          <el-input v-model="addClass.classId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addClass.classTeacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassMessage">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 班级列表信息
      classList: [],
      //   学生信息
      students: [],
      //   学生信息弹出框控制器
      studentDialogVisible: false,
      //   修改班级信息
      classDialogVisible: false,
      //   添加班级
      addDlassDialogVisible: false,
      //   修改班级对象
      classModel: {
        classId: "",
        classTeacher: ""
      },
      //   添加班级对象
      addClass: {
        classId: "",
        classTeacher: ""
      }
    };
  },
  methods: {
    // 显示班级学生信息
    async showStudentList(classId) {
      console.log(classId);
      this.studentDialogVisible = true;
      const res = await this.$http.get("/student/listByClassId", {
        params: {
          classId: classId
        }
      });
      console.log(res.data);
      this.students = res.data.map.classList;
    },
    // 修改班级信息--弹窗
    async changeClass(classId) {
      // console.log(classId);
      this.classDialogVisible = true;
      const res = await this.$http.get("/class/msg", {
        params: {
          classId: classId
        }
      });
      console.log(res.data);
      this.classModel = res.data.map.class;
    },
    // 修改班级信息
    async changeClassMessage() {
      const res = await this.$http.get("/class/update", {
        params: this.classModel
      });
      console.log(res.data);
      this.classDialogVisible = false;
      if (res.data.code == 200) {
        this.getClassList();
        this.$message.success("修改成功");
      } else {
        this.$message.success("修改失败");
      }
    },
    // 添加班级
    add() {
      this.addDlassDialogVisible = true;
    },
    // 获取所有班级信息
    async getClassList() {
      const res = await this.$http.get("/class/list", {});
      console.log(res.data.map.list);
      if (res.data.code == 200) {
        this.classList = res.data.map.list;
      } else {
        this.$message.error("获取信息失败");
      }
    },
    // 添加班级信息
    async addClassMessage() {
      const res = await this.$http.get("/class/add", {
        params: {
          classId: this.addClass.classId,
          classTeacher: this.addClass.classTeacher
        }
      });
      console.log(res.data);
      if (res.data.code == 200) {
        this.$message.success("添加成功");
        this.getClassList();
        this.addDlassDialogVisible = false;
      }
    },
    // 导出班级信息
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = ["班号", "班主任姓名"];
        const filterVal = ["classId", "classTeacher"];
        const list = this.classList;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "班级信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    this.getClassList();
  }
};
</script>

<style lang="less" scoped>
</style>