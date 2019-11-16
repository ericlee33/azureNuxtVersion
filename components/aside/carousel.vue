<template>
  <!-- 轮播图 -->
  <div>
    <div class="wrapper" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for='item in images' :key="item.id">
          <img :src="item.src" class="swiper-img">
        </div> 
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
   data() {
    return {
      swiperOption: {
        autoplay: {
          autoplay: 2000,
          disableOnInteraction: false,//放置触摸后自动轮播停止
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        loop:true,
      },
      images: [
        {
          id:1,
          src:require('../../assets/images/carousel/carousel1.png')
        },
        {
          id:2,
          src:require('../../assets/images/carousel/carousel2.png')
        },
        {
          id:3,
          src:require('../../assets/images/carousel/carousel3.png')
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 10%;
  background-color: rgba(255,255,255,.6);
  border-radius: 1%;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  img{
    width: 100%;
  }
}
</style>