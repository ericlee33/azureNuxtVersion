<template>
  <div class="footer-container">
    <div class="w footer">
      <p>Azure的个人空间 Mounted on Tencent Cloud for <i>{{ days }}</i> days</p></p>
      <p class="copyright">Copyright © 2019, azure All Rights Reserved</p>
      <p>京ICP备19054058号-1</p>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    days() {
      let s1 = new Date('2019/08/20')
      let s2 = new Date()
      let days = s2.getTime() - s1.getTime()
      let time = parseInt(days / (1000 * 60 * 60 * 24))
      return time
    }
  }
}

</script>

<style lang="less" scoped>
.footer-container {
  min-height: 125px;
  background: url('~assets/images/footer/ft2.jpg') repeat center center;
  position: relative;
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
  }
  .footer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    p {
      margin-top: 10px;
      color: rgba(22, 26, 4, 0.644);
      font-weight: 700;
      font-size: 16px;
      >i {
        color: rgb(192, 61, 21);
      }
    }
  }
}
</style>