<template>
  <div class="list-container">

    <!-- 文章渲染 -->
    <div class="blog-container">
      <div class="articles" v-for="item in article" :key="item._id">
        <div class="header" @click="goBlogInfo(item._id)">
          <h3 class="title">{{ item.title }}</h3>
          <p class="readinfo"> > 点击阅读全文 </p>
        </div>
        <p class="content" v-html="$options.filters.ellipsis(item.content)"></p>
        <p class="watcher"><i class="el-icon-view"> 阅读( {{ item.watcher }} )</i></p>
        <p class="category"><i class="el-icon-paperclip"> {{ item.category }}</i></p>
        <p class="time"><i class="el-icon-time"></i> {{ item.created_time | dateFormat }}</p>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="size"
      :background="true"
      layout="total, prev, pager, next" 
      :page-count="count"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  props: ['category','info'],
  data(){
    return{
      article:[
      ],
      currentPage: 1,
      size: 8,
      total: null,
      count: 1
    }
  },
  methods: {
    getArticle() {
      let start = (this.currentPage - 1) * this.size
      let pagesize = this.size
    

      this.$axios.post('/api/getblog',{start: start, pagesize: pagesize,category: this.category})
        .then(res => {
          if(res.data.err_code === 0){
            this.article = res.data.blogs
          }
        })
        .catch(err => {
          console.log(err)
        })
          
      
    },
    getLength() {
      this.$axios.post('/api/bloglength',{category: this.category})
        .then(res => {
          if(res.data.err_code === 0){
              this.total = res.data.blogslength
              // 计算有多少页
              this.count = Math.ceil(res.data.blogslength / this.size)
            }
        })
    },
    // 点击文章查看详细内容
    goBlogInfo(id) {
      this.$router.push({ name: this.info, params: { id } }); 
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getArticle()
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = 400
    }
  },
  created(){
    this.getArticle()
    this.getLength()
  }
}
</script>

<style lang="less" scoped>
@titlecolor:#00A67C;

.container {
  .list-container{
    margin-bottom: 10px;

    .articles {
      position: relative;
      padding: 2%;
      min-height: 200px;
      margin-top: 4%;
      background-color: rgba(255,255,255,.6);
      border-radius: 1%;
      box-shadow: 0 0 10px rgba(0,0,0,.3);
      
      &:first-child{
        margin-top: 0;
      }
      .header{
        display: flex;
        justify-content: space-between;
        text-align: center;
        cursor: pointer;
        
        &:hover {
          color:#333;
          text-decoration: underline;
          text-shadow:0;
        }

        .title{
          font-size: 20px;
          color: @titlecolor;
          text-shadow: 2px 2px 15px white;
        }
        
        .readinfo {
          font-size: 14px;
          margin-top: 10px;
        }
      }
      .content {
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 40px;
      }
      /* .comment {
        position: absolute;
        bottom: 5px;
        right: 370px;
      } */
      .watcher {
        position: absolute;
        bottom: 5px;
        right: 290px;
      }
      .category {
        position: absolute;
        bottom: 5px;
        right: 200px;
      }
      .time {
        position: absolute;
        bottom: 5px;
        right: 10px;
      }
    }
  }
}
</style>