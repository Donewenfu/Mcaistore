<template>
  <div class="mswiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(mswiper,index) in MswiperList" :key="index">
        <img :src="mswiper.icon_url" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      notNextTick: true,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
      },
    };
  },
  props: {
    MswiperList: Array,
  },
  methods: {
      
  },
  computed: {
      swiper(){
          return this.$refs.mySwiper.swiper//获取swiper对象
      }
  },
  components: {
    swiper,
    swiperSlide,
  },
  mounted() {
      
  },
};
</script>

<style scoped lang='less'>
.mswiper {
  // height: 230px;
  overflow: hidden;
  margin-top: 50px;
  img {
    width: 100%;
    // height: 230px;
  }
  /deep/.swiper-pagination-bullet-active {
    background-color: #01c150;
    border: 1px solid #fff;
  }
  /deep/.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
  }
  /deep/.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 5px;
  }
}
</style>