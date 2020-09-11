<template>
  <div id="detail">
    <!-- 导航 -->
    <van-nav-bar title="商品详情页" left-arrow :fixed="true" @click-left="onClickLeft" />
    <!-- 商品轮播图 -->
    <van-swipe @change="onChange" class="swiper-img">
      <van-swipe-item v-for="(sw,index) in detailinfodata.swiper" :key='index'>
        <img
          :src="sw"
          alt
        />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/3</div>
      </template>
    </van-swipe>
    <!-- 商品详情 -->
    <div class="detail-info">
        <div class="detail-title">
            <h3>{{detailinfodata.title}}</h3>
            <p>{{detailinfodata.des}}</p>
        </div>
        <div class="detail-price">
            <span>{{detailinfodata.price|moneyformat}}</span>
        </div>
        <div class="detail-time">
            <i class="iconfont">&#xe675;</i>
            <span>{{detailinfodata.time}}</span>
        </div>
    </div>
    <!-- 为您推荐 -->
    <div class="tuijuan">
        <h2>为您推荐</h2>
        <!-- 商品切换 -->
    <div class="mflash-swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(product,index) in detailinfodata.tuijian" :key='product.id'>
            <ProductItem :data='product'></ProductItem>
        </swiper-slide>
      </swiper>
    </div>
    </div>
    <!-- 规格 -->
    <div class="guige">
        <h2>规格</h2>
        <ul>
            <li>
                <span>净含量</span>
                <p>400kg</p>
            </li>
            <li>
                <span>保存条件</span>
                <p>常温保存</p>
            </li>
            <li>
                <span>保质期</span>
                <p>201958</p>
            </li>
        </ul>
    </div>
    <!-- 详情图 -->
    <div class="detail-content">
        <img v-for="(contentimg,index) in detailinfodata.dimg" :key='index' :src="contentimg" alt="">
    </div>
   <!-- 底部固定添加购物车 -->
   <div class="detailcart">
       <span class="numtag">{{produnum}}</span>
       <i class="iconfont" @click="gocart">&#xe603;</i>
       <button @click="addcartdetail">添加到购物车</button>
   </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductItem from '@/components/ProductItem/ProductItem'
import {addproductadd} from '@/service/api/index'
//引入网络
 import axios from 'axios';
 //引入vuex
 import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      current: 0,
      detailinfodata:'',
      notNextTick: true,
      swiperOption: {
        slidesPerView:3
      },
    };
  },
  methods: {
      ...mapMutations(['Add_GOODS']),
    onClickLeft() {
      this.$router.back();
    },
    onChange(index) {
      this.current = index;
    },
    //详情页接口
    async getdetailinfo(id){
        let data = await axios.get('http://api.wenfu814.xyz/web/xlmc/api/detail/'+id)
        // console.log(data)
        this.detailinfodata = data.result
    },
    //添加购物车
    async addcartdetail(){
        if(!this.acountinfo.token){
            this.$router.push('/login')
            window.sessionStorage.setItem('tabindex',2)
            return
        }
        //新增接口商品 假数据
        let result = await addproductadd(this.acountinfo.token,'5b150c9bc0a1ea13728b4576','粮全其美葱香味手抓饼 900g/袋','18.80','https://ddimg.ddxq.mobi/becc0e6b257781528108118451.jpg!maicai.product.list');
    //提交vuex
      this.Add_GOODS({
        goods_id:'5b150c9bc0a1ea13728b4576',
        goods_img: 'https://ddimg.ddxq.mobi/becc0e6b257781528108118451.jpg!maicai.product.list',
        goods_price: '18.80',
        good_name: '粮全其美葱香味手抓饼 900g/袋',
      });
      this.$toast({
        message: "商品添加成功！",
        duration: 1600,
      });
    },
    //跳转到购物车
    gocart(){
        this.$router.push('/dashboard/cart')
    }
  },
  created(){
      //获取商品的id
      let id = this.$route.params.id;
      this.getdetailinfo(id)
  },
  computed:{
      ...mapState(['shopCart','acountinfo']),
      swnum(){
          return this.detailinfodata.swiper.length
      },
      //计算商品的数量
      produnum(){
          let num = 0
          Object.values(this.shopCart).forEach((item,index)=>{
              num+=item.num
          })
          return num
      }
  },
  components:{
      swiper,
      swiperSlide,
    ProductItem
  }
};
</script>

<style scoped lang='less'>
#detail {
    background-color: #f5f5f5;
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  .swiper-img{
      margin-top: 40px;
      img{
          width: 100%;
      }
  }
  .detail-info{
      background-color: #fff;
      padding: 10px;
      .detail-title{
          h3{
              font-size: 15px;
              font-weight: bold;
              color: #333;
          }
          p{
              font-size: 12px;
              color: #999999;
          }
      }
      .detail-price{
          margin-top: 20px;
          display: flex;
          span{
              font-size: 16px;
              color: #FE6263;
          }
      }
      .detail-time{
          margin-top: 10px;
          border-top: 1px solid #f5f5f5;/*no*/
          display: flex;
          align-items: center;
          span{
              font-size: 14px;
              color: #333;
          }
          i{
              font-size: 18px;
              color: #999;
              margin: 5px;
          }
      }

  }
  .tuijuan{
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      box-sizing: border-box;
      h2{
          font-size: 16px;
          font-weight: bold;

      }
  }
  .guige{
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      h2{
          font-size: 16px;
          font-weight: bold;
        margin-bottom: 8px;
      }
      ul{
          li{
              padding: 10px 0;
              border-top: 1px dashed #ccc;/*no*/
              display: flex;
              span{
                  width: 60px;
                  font-size: 13px;
              }
              p{
                  margin-left: 20px;
                  font-size: 13px;
                  color: #999;
              }
          }
      }
  }
  .detail-content{
      img{
          width: 100%;
      }
      margin-bottom: 40px;
  }
  .detailcart{
      z-index: 999;
      height: 50px;
      border-top: 1px solid #e6e6e6;/*no*/
      padding: 5px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 750px;
      margin: 0 auto;
      background-color: #fff;
      i{
          font-size: 22px;
      }
      button{
          height: 36px;
          width: 135px;
          background-image: linear-gradient(to right ,#25D350,#2EBB5B);
        font-size: 14px;
        color: #fff;
        border: none;
        border-radius: 30px;
      }
      .numtag{
          position: absolute;
          display: block;
          background-color: #EE3E40;
          color: #fff;
          font-size: 8px;
          padding: 0px 5px;
          border-radius: 10px;
          left: 25px;
          top: 8px;
      }
  }
}
</style>