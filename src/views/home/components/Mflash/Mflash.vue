<template>
  <div class="mflash">
    <div class="mflash-title">
      <div class="mlash-l-title">
        <h3 class="mflash-titles">限时抢购</h3>
        <p class="mflash-time">07:00场</p>
        <span class="mflash-tag">已结束</span>
      </div>
      <div class="mflash-r-more">
        <router-link to>更多</router-link>
      </div>
    </div>
    <!-- 商品切换 -->
    <div class="mflash-swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(product,index) in MflashList" :key='product.id'>
            <ProductItem :data='product'></ProductItem>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductItem from '@/components/ProductItem/ProductItem'
export default {
  data() {
    return {
      notNextTick: true,
      swiperOption: {
        slidesPerView:3
      },
    };
  },
  props:{
      MflashList:Array
  },
  components: {
      swiper,
      swiperSlide,
    ProductItem
  },
};
</script>

<style scoped lang='less'>
.mflash {
  background-color: #fff;
  padding: 10px;
  .mflash-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .mlash-l-title {
      display: flex;
      align-items: center;
      .mflash-titles {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        &::before {
          content: "";
          display: inline-block;
          width: 3px;
          height: 15px;
          background-color: orange;
          position: relative;
          top: 1px;
          margin-right: 10px;
        }
      }
      p,
      span {
        font-size: 14px;
        margin-left: 15px;
      }
      p {
        color: #01c150;
      }
      span {
        display: inline-block;
        border: 1px solid #999;
        border-radius: 4px;
        color: #999;
        padding: 0 3px;
      }
    }
    .mflash-r-more {
      display: flex;
      align-items: center;
      a {
        color: #333;
        font-size: 14px;
      }
    }
  }

}
</style>