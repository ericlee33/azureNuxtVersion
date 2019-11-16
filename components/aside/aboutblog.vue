<template>
  <div class="aboutblog">
    <p>小站已经在云上漂流了<i> {{ days }} </i>天了！</p>
    <p>欢迎大家在小站上留言:.ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ</p>
    <p>您是第<i> {{ guest }} </i>位来到这里的访客</p>
    <p>小站目前有<i> {{ articleNum }} </i>篇文章</p>
  </div>
</template>
<script>
export default {
  data(){
    return{
      guest:0
    }
  },
  methods: {
    guestNum() {
      this.$axios.get('/api/guest')
        .then(res=>{
          this.guest = res.data.data.guest
        })
    }
  },
  computed: {
    days() {
      let s1 = new Date('2019/08/20')
      let s2 = new Date()
      let days = s2.getTime() - s1.getTime()
      let time = parseInt(days / (1000 * 60 * 60 * 24))
      return time
    },
    articleNum() {
      return this.$store.state.articleLength
    }
  },
  created() {
    this.guestNum()
  }
}
</script>

<style lang="less" scoped>
.aboutblog {
  // 名片整体样式
  color: forestgreen;
  font-weight: 1000;
  padding: 4%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,.3);

  >p {
    margin-top: 2%;
    &:nth-of-type(1) {
      margin-top: 0;
    }
  }
  i {
    color: mediumslateblue;
  }
}


</style>