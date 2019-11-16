<template>
  <div class="comment-container">

    <h3>Hello~欢迎来到我的博客，有什么想说的~尽管写下吧!</h3>
    <hr>

    <!-- 写评论 -->
    <div class="add-comment">

      <el-form label-width="120px" :model="formLabelAlign">
        <el-form-item label="昵称" required>
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="想说些什么~" required>
          <el-input type="textarea" v-model="formLabelAlign.content" placeholder="来都来了,何不留个足迹呢~"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="sendMessageBoard">发表</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- 评论区 -->
    <div class="get-comment-container">

      <h3><i class="el-icon-chat-dot-square"></i> 有( {{ commentsnumber }} )个小伙伴正在吐槽~</h3>
      <hr>
      <div class="getcomment" v-for="(item,i) in comments" :key="i">
        
        
        <div class="header">
          <span class="avatar"><img src="~/assets/images/comment-avatar.png" alt=""></span>
          <span class="nickname">{{ item.nickname }}</span>
          <span class="time">{{ item.created_time | dateFormat }}</span>
        </div>
        <p class="content">
          {{ item.content }}
          <!-- <span class="reply">回复</span>  -->
           <!-- @click="replyMessage(item._id)" -->
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      comments: [],
      commentsnumber: '',
      formLabelAlign: {
        nickname: '',
        content: ''
      }
    }
  },
  methods: {
    // 发送留言数据
    sendMessageBoard(){
      this.$axios.post('/api/addmessageboard',{
          nickname: this.formLabelAlign.name,
          content: this.formLabelAlign.content
        })
        .then(res => {
          if(res.data.err_code === 0){
            // 清空数据
            this.formLabelAlign.name = ''
            this.formLabelAlign.content = ''
            this.$message('留言成功!')
            this.$store.state.commentFlag = true
            // 发送成功后,刷新评论区内容
            this.getMessageBoard()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 请求评论区数据
    getMessageBoard(){
      this.$axios.get('/api/getmessageboard')
        .then(res => {
          this.comments = res.data.data
          this.commentsnumber = res.data.data.length
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getMessageBoard()
  }
}
</script>

<style lang="less" scoped>
@titlecolor:#00A67C;
.comment-container {
  h3 {
    height: 50px;
    line-height: 50px;
    color: #00A67C;
  }
  .add-comment {
    margin-top: 20px;
  }
  .get-comment-container{
    h3 {
      height: 50px;
      line-height: 50px;
      color: #00A67C;

      i {
        font-size: 20px;
      }
    }
    .getcomment {
      height: 120px;
      margin-top: 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: rgba(255,255,255,.6);
      border-radius: 1%;
      box-shadow: 0 0 10px rgba(0,0,0,.3);
      padding: 1.5% 2%;

      .header {
        overflow: hidden;
        font-weight: bold;
        height: 50px;
        line-height: 50px;

        .avatar {
          float: left;
          margin-right: 1%;
          img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: 1px solid #AAA;
          }
        }
        .nickname {
          float: left;
          color: @titlecolor;
        }
        .time {
          line-height: 1;
          float: right;
          font-weight: 100;
        }
      }
      .content{
        text-indent: 10px;
        font-weight: bold;
        font-size: 16px;
        color: #777;

        .reply {
          float: right;
          cursor: pointer;
        }
      }
    }
  }
}
</style>