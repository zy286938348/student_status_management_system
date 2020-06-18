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
            <template slot-scope="props" >
              <span v-if="props.row.stuGradeSum < 0">未录入成绩</span>
              <span v-if="props.row.stuGradeSum >= 0" v-text="props.row.stuGradeSum"></span>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 班级初始绑定值
      classNum: "",
      classNums: [],
      // 表格中的数据
      tableData: [],
      dialogVisible: false
    };
  },
  methods: {
    isDialogVisible(data) {
      console.log(data);
      this.dialogVisible = true;
    },
    async getUserList() {
      const res = await this.$http.get("/grade/rank/list", {
        params: {
          classId: this.classNum
        }
      });
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

