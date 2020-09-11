<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#01c150" border>
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? homeicon.active : homeicon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <template #icon="props">
          <img :src="props.active ? cateicon.active : cateicon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/cart" :badge="productnum?productnum:''">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? carticon.active : carticon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mineicon.active : mineicon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import {getcartData} from '@/service/api/index'
import {setLocalStorage} from '@/config/global'
export default {
  data() {
    return {
      active: parseInt(sessionStorage.getItem('tabindex'))||0,
      homeicon: {
        active: require("@/images/tabicon/home-a.png"),
        inactive: require("@/images/tabicon/home-d.png"),
      },
      cateicon: {
        active: require("@/images/tabicon/category-a.png"),
        inactive: require("@/images/tabicon/category-d.png"),
      },
      carticon: {
        active: require("@/images/tabicon/cart-a.png"),
        inactive: require("@/images/tabicon/cart-d.png"),
      },
      mineicon: {
        active: require("@/images/tabicon/mine-a.png"),
        inactive: require("@/images/tabicon/mine-d.png"),
      },
    };
  },
  watch: {
    //监听数据active的数据
    active(value){
      //把监听的数据存储在sessionStorage
      let tabvalue = value
      sessionStorage.setItem('tabindex',tabvalue)
    }
  },
  mounted() {
    //调用vuex 获取本地数据的方法
    this.INIT_SHOP_CART()
    //初始化用户数据
    this.autologins();
    //判断activeicon
    if(this.$route.name=='cart'){
      this.active = 2
    }
    //如果有用户信息 那么就请求购物车数据
    if(this.acountinfo.token){
      //初始化购物车数据
      this.initshopcart(this.acountinfo.token)
    }
  },
  methods: {
    ...mapActions(['autologins']),
    ...mapMutations(['INIT_SHOP_CART','INIT_USERINFO']),
    //初始化购物车
    async initshopcart(id){
      let result = await getcartData(id)
      let cartdata = result.data;
      let shopCart = {}
      cartdata.forEach((item,index)=>{
        shopCart[item.goods_id] = {
          id:item.goods_id,
          img:item.small_image,
          ischecked:item.checked,
          name:item.goods_name,
          num:item.num,
          price:item.goods_price
        }
      })
      //把数据同步到本地
      setLocalStorage('shopCart',shopCart);
      //初始化数据 同步到vuex中
      this.INIT_SHOP_CART()
    }
  },
  computed: {
    ...mapState(['shopCart','acountinfo']),
    //product num 
    productnum(){
      let num = 0
      Object.values(this.shopCart).forEach((item,index)=>{
          num+=item.num
      })
      return num
    }
  },
};
</script>

<style lang="less" scoped>
#dashboard {
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;
  margin-bottom: 60px;
  /deep/.van-tabbar{
    z-index: 99;
  }
}
</style>
