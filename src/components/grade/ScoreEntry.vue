<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-form :model="gradeEntry" label-width="80px">
            <el-form-item label="学号">
              <el-input v-model="gradeEntry.stuNum" @blur="getMessage"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="gradeEntry.stuName"></el-input>
            </el-form-item>
            <el-form-item label="课程">
              <el-select v-model="gradeEntry.courseId" placeholder="请选择课程">
                <el-option :key="item.courseId" v-for="item in courseList" :label="item.courseName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成绩">
              <el-input v-model="gradeEntry.grade"></el-input>
            </el-form-item>
          </el-form>
          <div class="buttonClass">
            <el-button>重置</el-button>
            <el-button type="primary" @click="submitGrade">录入</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 成绩信息提交
      gradeEntry: {
        stuId: "",
        stuNum:"",
        stuName: "",
        courseId: "",
        grade:""
      },
      // 课程列表
      courseList:[]
    };
  },
  methods:{
    // 获取用户班级课程信息
    async getMessage(){
      const res = await this.$http.get("/student/search",{
        params:{
          stuNum:this.gradeEntry.stuNum
        }
      })
      console.log(res.data)
      if(res.data.code == 200){
        this.gradeEntry.stuId =res.data.map.student.stuId 
        this.gradeEntry.stuName =res.data.map.student.stuName 
        this.courseList = res.data.map.courses
      }
    },
    // 提交成绩
    async submitGrade(){
      const res = await this.$http.get('/grade/update',{
        params: this.gradeEntry
      })
      console.log(res.data)
    }
  }
};
</script>

<style lang="less" scoped>
.buttonClass {
  display: flex;
  justify-content: flex-end;
}
</style>