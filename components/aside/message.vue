<template>
  <div class="message-container">
    <!-- 最新评论 -->
    <h4><i class="el-icon-s-comment"></i>最新评论</h4>

    <!-- 得到评论 -->
    <div class="getcomment" v-for="(item,i) in comments" :key="i">

        <div class="header">
          <span class="nickname">{{ item.nickname }}</span>
          <span class="time">{{ item.created_time | dateFormat }}</span>
        </div>
        <p class="content">
          {{ item.content }}
        </p>

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      comments: []
    }
  },
  methods: {
    getMessageBoard(){
      this.$axios.get('/api/getmessageboard')
        .then(res => {
          this.comments = res.data.data.slice(0,5)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getMessageBoard()
  },
  watch: {
    '$store.state.commentFlag': function(newVal,oldVal) {
      if(this.$store.state.commentFlag) {
        this.getMessageBoard()
      }
      this.$store.state.commentFlag = false
    }
  }
}

</script>
<style lang="less" scoped>
@titlecolor:#00A67C;

.message-container {
  padding: 5%;
  margin-top: 10%;
  width: 100%;
  background-color: rgba(255,255,255,.6);
  border-radius: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  h4 {
    line-height: 30px;
    font-weight: 400;
  }
  .getcomment {
    padding: 4% 0;
    border-bottom: 1px dotted blue;

    &:last-child {
      border: 0;
    }

    .header {
      display: flex;
      justify-content: space-between;

      .nickname {
        color: @titlecolor;
        font-weight: bold;
      }
      .time {
        font-size: 13px;
      }
    }
    .content {
      margin-top: 5%;
    }
  }

}
</style>