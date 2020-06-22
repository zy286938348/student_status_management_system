<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩排名</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-form>
          <el-form-item label="班级">
            <el-select v-model="classNum" @change="selectItem">
              <el-option
                :key="item.classId"
                v-for="item in classNums"
                :label="item.classId"
                :value="item.classId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="stuNum" label="学号"></el-table-column>
          <el-table-column prop="stuName" label="姓名"></el-table-column>
          <el-table-column prop="stuGradeSum" label="总分">
            <template slot-scope="props">
              <span v-if="props.row.stuGradeSum <= 0">未录入成绩</span>
              <span v-if="props.row.stuGradeSum > 0" v-text="props.row.stuGradeSum"></span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="成绩单" width="100">
            <template slot-scope="props">
              <el-button type="text" @click="isDialogVisible(props.row.stuId)">成绩单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!-- 成绩单弹出框 -->
    <el-dialog title="成绩单" :visible.sync="dialogVisible" width="30%">
      <el-table :data="stuGradeList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="courseName" label="课程名"></el-table-column>
        <el-table-column prop="courseGrade" label="成绩">
          <template slot-scope="props">
            <span v-if="props.row.courseGrade <= 0">未录入成绩</span>
            <span v-else-if="props.row.courseGrade > 0" v-text="props.row.courseGrade"></span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 班级初始绑定值
      classNum: "181300416",
      // 班级列表
      classNums: [],
      // 表格中的数据
      tableData: [],
      // 存储学生的成绩列表
      stuGradeList: [],
      dialogVisible: false
    };
  },
  methods: {
    async isDialogVisible(data) {
      console.log(data);

      const res = await this.$http.get("/grade/person", {
        params: {
          stuId: data
        }
      });

      this.stuGradeList = res.data.map.list;

      console.log(res.data.map.list);

      this.dialogVisible = true;
    },
    // 获取班级学生信息
    async getUserList() {
      const res = await this.$http.get("/grade/rank/list", {
        params: {
          classId: this.classNum
        }
      });
      console.log(res.data.map.list);
      if (res.data.code == 200) {
        this.tableData = res.data.map.list;
      }
    },
    // 获取班级列表
    async getClassNum() {
      const res = await this.$http.get("/class/list", {});
      if (res.data.code == 200) {
        this.classId = res.data.map.list[0].classId;
        this.classNums = res.data.map.list;
      }
      console.log(res.data);
    },
    selectItem() {
      this.getUserList();
    }
  },
  created() {
    this.getClassNum();
    this.getUserList();
  }
};
</script>

<style lang="less" scoped>
</style>

