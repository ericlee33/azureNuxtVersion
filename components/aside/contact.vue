<template>
  <div class="aboutme">

    <div class="box-card">
      <div class="header">
        <span><i class="el-icon-right"></i> 我的名片 <i class="el-icon-back"></i></span>

      </div>
      <div class="text">
        <div class="imgContact">
          <!-- wechat二维码 -->
          <div class="wechat add">
            <p @mouseenter="addWechat" @mouseleave="removeWechat"></p>
            <img src="../../assets/images/aboutme/addwechat.png" alt="" v-if="wechatFlag">
          </div>
          <!-- qq二维码 -->
          <div class="qq add">

            <p id="qq-icon" @mouseenter="addQQ" @mouseleave="removeQQ"></p>
            <img src="../../assets/images/aboutme/addqq.png" alt="" v-if="qqFlag">
          </div>

        </div>
       
        <div class="others">
          <p>
            <label for="">Github: </label>
            <a href="https://github.com/Azure33" target="_blank">https://github.com/Azure33</a>
          </p>
          <p>Email: 515634453@qq.com</p>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      wechatFlag: false,
      qqFlag: false
    }
  },
  methods:{
    addWechat() {
      this.wechatFlag = true
    },
    removeWechat() {
      this.wechatFlag = false
    },
    addQQ() {
      this.qqFlag = true
    },
    removeQQ() {
      this.qqFlag = false
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  /* 名片整体样式 */
  padding: 4%;
  margin-top: 10%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,.3);

  /* 名片头部 */
  .header {
    border-bottom: 1px solid azure;
    height: 30px;
    line-height: 30px;
  }
  /* 名片内容 */
  .text {
    margin-top: 2%;
    
    .imgContact {
      padding: 0 30% 0 30%;
      display: flex;
      justify-content: space-around;
      /* 微信二维码样式 */
      .add {
        position: relative;
        p {
          /* 遮挡层 */
          &:hover::after {
            content:'';
            display: block;
            width: 50px;
            height: 50px;
            background-color: rgba(0,0,0,.2);
          }

          width: 50px;
          height: 50px;
          background: url('../../assets/images/aboutme/wechat-icon.png');
          background-size: cover;
        }

        img {
          border: 1px solid #333;
          width: 120px;
          height: 120px;
          position: absolute;
          top: -125px;
          transform: translateX(-25%);
          z-index: 99;
        }
      }
      #qq-icon {
        background-image: url('../../assets/images/aboutme/qq-icon.png');
      }
    }
    .others {
      margin-top: 2%;
      p{
        height: 40px;
        line-height: 40px;
        
        a{
          color: skyblue;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    
    
  }
}


</style>