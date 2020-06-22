<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      <el-breadcrumb-item>基本情况</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="always">
      <el-row>
        <el-col :span="20">
          <el-button type="primary" @click="addStudent">添加学生信息</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" icon="el-icon-download" @click="exportToExcel">导出学生信息</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="right" inline class="demo-table-expand">
                <el-form-item label="学号">
                  <span>{{ props.row.stuNum }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ props.row.stuName }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.stuGender }}</span>
                </el-form-item>
                <el-form-item label="入学时间">
                  <span>{{ props.row.stuDate }}</span>
                </el-form-item>
                <el-form-item label="班级">
                  <span>{{ props.row.stuClass }}</span>
                </el-form-item>
                <el-form-item label="电话">
                  <span>{{ props.row.stuPhone }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="stuNum" label="学号"></el-table-column>
          <el-table-column prop="stuName" label="姓名"></el-table-column>
          <el-table-column prop="stuClass" label="班级"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="props">
              <el-tag v-if="props.row.stuStatus == 0">在读</el-tag>
              <el-tag type="danger" v-if="props.row.stuStatus == 1">休学</el-tag>
              <el-tag type="info" v-if="props.row.stuStatus == 2">留级</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="slot">
              <el-button type="text" @click="isDrawer(slot.row.stuId)">修改</el-button>
              <el-button type="text" @click="deleteUser">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!-- 添加学生信息 -->
    <el-dialog
      title="添加学生"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="dialogHandleClose"
    >
      <el-form ref="addUser" :model="addUser" label-width="80px">
        <el-form-item label="学号">
          <el-input maxlength="10" show-word-limit v-model="addUser.stuNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addUser.stuName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addUser.stuGender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间">
          <el-date-picker
            v-model="addUser.stuDate"
            type="datetime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="addUser.stuClass" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.Id"
              :label="item.classId"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input maxlength="11" show-word-limit v-model="addUser.stuPhone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addUser.stuStatus">
            <el-option label="在读" :value="0"></el-option>
            <el-option label="休学" :value="1"></el-option>
            <el-option label="留级" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改信息抽屉 -->
    <el-drawer title="学生信息修改" :visible.sync="drawer" :before-close="handleClose">
      <el-row>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model="userInfo.stuNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userInfo.stuName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="userInfo.stuGender"></el-input>
          </el-form-item>
          <el-form-item label="入学时间">
            <el-input v-model="userInfo.stuDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="userInfo.stuClass" disabled></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="userInfo.stuPhone"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="userInfo.stuStatus">
              <el-option label="在读" :value="0"></el-option>
              <el-option label="休学" :value="1"></el-option>
              <el-option label="留级" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeUserInfo">修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      flag: "0",
      // 学生信息
      tableData: [],
      // 抽屉中的学生信息
      userInfo: {},
      // 添加学生信息
      addUser: {
        stuNum: "",
        stuName: "",
        stuGender: "",
        stuDate: "",
        stuClass: "",
        stuPhone: "",
        stuStatus: ""
      },
      clearUser: {
        stuNum: "",
        stuName: "",
        stuGender: "",
        stuDate: "",
        stuClass: "",
        stuPhone: "",
        stuStatus: ""
      },
      // 班级列表
      classList: [],
      // 抽屉是否显示
      drawer: false,
      // 添加对话框
      dialogVisible: false
    };
  },
  methods: {
    // 班级列表
    async getClassList() {
      const res = await this.$http.get("/class/list", {});
      console.log(res.data);
      if (res.data.code == 200) {
        this.classList = res.data.map.list;
      }
    },
    // 获取学生列表
    async getStudentList() {
      const res = await this.$http.get("/student/list");
      console.log(res.data);
      if (res.data.code == 200) {
        this.tableData = res.data.map.list;
      }
    },
    // 修改学生信息
    async isDrawer(stuId) {
      // console.log('123456')
      const res = await this.$http.get("/student/msg", {
        params: {
          stuId: stuId
        }
      });
      if (res.data.code == 200) {
        console.log(res.data);
        this.userInfo = res.data.map.student;
        this.drawer = true;
      } else {
        this.$message.error("获取信息失败");
        this.drawer = false;
      }
      console.log(res.data);
      // 请求抽屉中的数据操作
    },
    // 抽屉
    handleClose(done) {
      this.$confirm("是否取消修改")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 对话框
    dialogHandleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    dialogClose() {
      console.log(this.$refs.addUserFrom);
      this.dialogVisible = false;
    },
    // 弹出添加学生对话框
    addStudent() {
      this.getClassList();
      this.dialogVisible = true;
    },
    // 添加学生信息
    async add() {
      console.log("发送添加学生信息请求");
      const res = await this.$http.post(
        "/student/add",
        JSON.stringify(this.addUser)
      );
      console.log(res.data);
      if (res.data.code == 200) {
        this.$message.success("添加成功");
        this.getStudentList();
        this.addUser = this.clearUser;
        this.dialogVisible = false;
      } else {
        this.$message.error("添加失败");
        this.dialogVisible = false;
      }
    },
    // 删除学生
    deleteUser() {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 提交修改学生信息
    async changeUserInfo() {
      const res = await this.$http.post(
        "/student/update",
        JSON.stringify(this.userInfo)
      );
      if (res.data.code == 200) {
        this.drawer = false;
        this.getStudentList();
        this.$message.success("修改成功");
      } else {
        this.drawer = false;
        this.$message.error("修改失败");
      }
    },
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = ["学号", "姓名", "性别", "入学时间", "班级", "电话"];
        const filterVal = [
          "stuNum",
          "stuName",
          "stuGender",
          "stuDate",
          "stuClass",
          "stuPhone"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "学生信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    this.getStudentList();
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
