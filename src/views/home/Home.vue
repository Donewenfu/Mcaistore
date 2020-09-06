<template>
  <div id="home" v-if="!showloading">
    <Msearchheader></Msearchheader>
    <Mswiper :MswiperList="MswiperList"></Mswiper>
    <img :src="MtipImage" alt class="indexMtipbanner" />
    <Mnav :MnavList="MnavList"></Mnav>
    <Mflash :MflashList="MflashList"></Mflash>
    <Gotop v-if="isshowtopicon" :clickicon="clicktop"></Gotop>
    <Mlike :MlikeList="MlikeList"></Mlike>
  </div>
  <van-loading
    size="24px"
    vertical
    v-else
    color="#01c150"
    style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"
  >加载中...</van-loading>
</template>

<script>
//请求首页数据
import { getHomeData } from "@/service/api/index";

//引入首页组件
import Msearchheader from "@/components/Msearchheader/Msearchheader";
import Mswiper from "./components/Mswiper/Mswiper";
import Mnav from "./components/Mnav/Mnav";
import Mflash from "./components/Mflash/Mflash";

//返回顶部组件
import Gotop from "@/components/Gotop/Gotop";
import { isshowtop } from "@/config/global";

//猜你喜欢
import Mlike from "./components/Mlike/Mlike";

//消息订阅插件 pubsub-js
import pubsub from "pubsub-js";

//引入vuex
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      //轮播图数据
      MswiperList: [],
      //是否显示加载
      showloading: true,
      //导航数据
      MnavList: [],
      //首页tipbanner
      MtipImage: "",
      //抢购数据
      MflashList: [],
      //是否显示返回顶部icon
      isshowtopicon: false,
      //猜你喜欢数据
      MlikeList: [],
    };
  },
  components: {
    Msearchheader,
    Mswiper,
    Mnav,
    Mflash,
    Gotop,
    Mlike,
  },
  mounted() {
    //获取首页数据
    this.getIndexData();
    //监听页面的滚动事件
    isshowtop((state) => {
      this.isshowtopicon = state;
    });
    //订阅消息(添加到购物车)
    //订阅消息的名称
    let addcartsubscription = "addsubscription";
    pubsub.subscribe(addcartsubscription, (msg, value) => {
      //判断是否是订阅的添加购物车的消息
      if (msg == "addsubscription") {
        this.Add_GOODS({
          goods_id: value.id,
          goods_img: value.small_image,
          goods_price: value.price,
          good_name: value.name,
        });
        this.$toast({
          message:'商品添加成功！',
          duration:1600
        });
      }
    })
  },
  methods: {
    //mutations是方法所以要在此处使用
    ...mapMutations(["Add_GOODS"]),
    //返回顶部
    clicktop() {
      //当用户点击返回按钮的时候回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    //获取首页数据
    async getIndexData() {
      let data = await getHomeData();
      //轮播图数据
      this.MswiperList = data.data.list[0].icon_list;
      //隐藏加载
      this.showloading = false;
      //导航数据
      this.MnavList = data.data.list[2].icon_list;
      //首页tipbanner
      this.MtipImage = data.data.list[1].image_url;
      //抢购数据
      this.MflashList = data.data.list[3].product_list;
      //猜你喜欢数据
      this.MlikeList = data.data.list[4].product_list;
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;
  .indexMtipbanner {
    width: 100%;
  }
}
</style>
