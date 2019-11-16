<template>
  <div class="bloginfo-container">
    <!-- 返回 -->
    <div class="back">
      <p @click="backToBlogList"><i class="el-icon-back"></i> 返回</p>
    </div>
      
    <div class="articles" v-for="item in article" :key="item.id">
      <div class="header">
        <h3 class="title">{{ item.title }}</h3>
        <p class="time">发表时间:{{ item.created_time | dateFormat }}</p>
        <p class="category">文章类型:{{ item.category }}</p>
      </div>
      <p class="content" v-html="item.content"></p>
    </div>

    <blog-info-ct :id="this.id"></blog-info-ct>
  </div>
</template>

<script>
import comment from './subcomponents/comment.vue'

export default {
  props: ['id'],
  data(){
    return{
      article: []
    }
  },
  methods: {
    addArticle() {
      this.$axios.get('/api/getblog/' + this.id)
        .then(res => {
          this.article = res.data.bloginfo
        })
    },
    backToBlogList() {
      this.$router.go(-1)
    }
  },
  created(){
    this.addArticle()
  },
  components: {
    'blog-info-ct':comment
  }
}
</script>

<style lang="less" scoped>
.bloginfo-container {
  position: relative;
  background-color: rgba(255,255,255,.6);
  border-radius: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  padding: 3%;
  .back {
    position: absolute;
    font-weight: bold;
    >p {
      width: 80px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: forestgreen;
      text-align: center;
      border-radius: 10%;
      background-color: rgba(0,0,0,.05);
      
      &:hover {
        background: rgba(0, 0, 0, .1)
      }
    }
  }

  .header {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 5%;

    >p {
      font-size:12px;
      height: 10px;
      line-height: 10px;
    }
  }
  .content {
    width: 100%;
    line-height: 1.8;
    // white-space:normal;
    word-break:break-all;
  }
  .em {
    width: 100%;
  }
}
</style>