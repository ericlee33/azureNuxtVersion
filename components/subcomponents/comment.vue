<template>
  <div class="comment-container">

    <h3>Write down some words here</h3>
    <hr>

    <!-- 写Comment -->
    <div class="add-comment">

      <el-form label-width="120px" :model="formLabelAlign">
        <el-form-item label="Name" required>
          <el-input v-model="formLabelAlign.nickname"></el-input>
        </el-form-item>
        <el-form-item label="Message" required>
          <el-input type="textarea" v-model="formLabelAlign.content" placeholder="来都来了,何不留个足迹呢~"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMessageBoard">发表</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- Comment区 -->
    <div class="get-comment-container">

      <h3>Comment~</h3>
      <hr>
      <!-- Comment内容 -->
      <div class="getcomment" v-for="(item,i) in comments" :key="i">
        <div class="header">
          <span class="floor">第{{ i+1 }}楼</span>
          <span class="nickname">{{ item.nickname }}</span>
          <span class="time">{{ item.created_time | formatDate()}}</span>
        </div>
        <p class="content">{{ item.content }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  // 向父元素请求id
  props:["id"],
  data(){
    return{
      comments: [],
      formLabelAlign: {
        nickname: '',
        content: ''
      }
    }
  },
  methods: {
    // 向后台评论接口发送Comment数据
    sendMessageBoard(){
      // console.log(this.formLabelAlign)
      // console.log(this.id)
      this.$axios.post('/api/comment',{
          id: this.id,
          nickname: this.formLabelAlign.nickname,
          content: this.formLabelAlign.content
        })
        .then(res => {
          if(res.data.err_code === 0){
            this.formLabelAlign.nickname = ''
            this.formLabelAlign.content = ''
            this.$message('Comment成功!')
            // 评论成功后,刷新Comment区内容
            this.getComment()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 请求Comment区数据
    getComment(){
      this.$axios.get('/api/comment/' + this.id)
        .then(res => {
          this.comments = res.data.comment
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.getComment()
    }
}
</script>

<style lang="less" scoped>

.comment-container {
  padding: 3%;

  h3 {
    height: 50px;
    line-height: 50px;
  }
  .add-comment {
    margin-top: 20px;
  }
  .get-comment-container{
    h3 {
      height: 50px;
      line-height: 50px;
    }
    .getcomment {
      height: 90px;
      margin-top: 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: rgba(255,255,255,.6);
      border-radius: 1%;
      box-shadow: 0 0 10px rgba(0,0,0,.3);
      padding: 1%;

      .header {
        overflow: hidden;
        font-weight: bold;

        .floor {
          float: left;
          margin-right: 1%;
          color: #00aa37;
        }
        .nickname {
          float: left;
          color: #00aa37;
        }
        .time {
          float: right;
        }
      }
      .content{
        font-weight: bold;
        font-size: 16px;
        color: #777;
      }
    }
  }
}
</style>