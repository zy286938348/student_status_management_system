<template>
  <div>
    <h1>欢迎登录学生学籍管理系统</h1>

    <el-carousel indicator-position="outside" height="450px">
      <el-carousel-item :key="item.src" v-for="item in image">
        <img :src="item.src" alt="item.lable" width="100%" height="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: [
          {
              label:"中北大学",
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592905908030&di=a6b5851ecd3080b19bcf999feb1d3b1d&imgtype=0&src=http%3A%2F%2Fy1.ifengimg.com%2Fnews_spider%2Fdci_2013%2F05%2F8a152e791d1a5561353656fc52b18b6c.jpg"
          },
          {
              label:"中北大学",
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592905232571&di=4b89ce21db6d2f6b9ec8943b6110550c&imgtype=0&src=http%3A%2F%2Fcdn-hz.skypixel.com%2Fuploads%2Fcn_files%2Fvideo%2Fimage%2Fe78ac567-ed37-4ec0-aba6-3e78a96bfa38.jpg%40%25211200"
          },
          {
              label:"中北大学",
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592905539207&di=bf8ac71b2b87f5933c872f02f35e3f2b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181207%2F74f33b70cbb84e29b22ee82cbdb3debd.jpeg"
          },
          {
              label:"中北大学",
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592905974939&di=1cde765337bf53acf2f34319ff24b16c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171113%2Fc010e07c397f486ca8dc19286278c120.jpeg"
          },
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>