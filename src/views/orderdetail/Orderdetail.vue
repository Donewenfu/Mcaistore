<template>
  <div id="orderDetail">
    <!-- 导航 -->
    <van-nav-bar title="我的订单" left-arrow :fixed="true" @click-left="onClickLeft" />

    <div class="tabbar">
      <van-tabs v-model="activeName" @click="changetab">
        <van-tab title="全部" name="a">
           <div v-if="listitem.length>=1">
<OrderItem v-for="(item,index) in listitem" :key="index" :data="item.cart_shop[0]" ></OrderItem>
          </div>
          
          <div class="listnone" v-else>
            <img src="../../images/cart/nonelist.png" alt="">
            <p>暂时还没有相关订单</p>
          </div>
        </van-tab>
        <van-tab title="待支付" name="b">
           <div v-if="listitem.length>=1">
<OrderItem v-for="(item,index) in listitem" :key="index" :data="item.cart_shop[0]" ></OrderItem>
          </div>
          
          <div class="listnone" v-else>
            <img src="../../images/cart/nonelist.png" alt="">
            <p>暂时还没有相关订单</p>
          </div>
        </van-tab>
        <van-tab title="待收货" name="c">
          <div v-if="listitem.length>=1">
<OrderItem v-for="(item,index) in listitem" :key="index" :data="item.cart_shop[0]" ></OrderItem>
          </div>
          
          <div class="listnone" v-else>
            <img src="../../images/cart/nonelist.png" alt="">
            <p>暂时还没有相关订单</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getOrder } from "@/service/api/index";
import { mapState } from "vuex";
import OrderItem from "./components/Orderitem";
export default {
  data() {
    return {
      activeName: "a",
      listitem: "",
    };
  },
  components: {
    OrderItem,
  },
  mounted() {
    this.getdetaillist();
    //获取路由参数
    let routerquery = this.$route.query.target
    this.activeName = routerquery?routerquery:'a'
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //获取数据
    async getdetaillist(paytype) {
      let result = await getOrder(this.acountinfo.token, paytype);
      this.listitem = result.data;
    },
    changetab(name) {
      if (name == "a") {
        this.getdetaillist("");
      } else if (name == "b") {
        this.getdetaillist("will");
      } else if (name == "c") {
        this.getdetaillist("pay");
      }
    },
  },
  computed: {
    ...mapState(["acountinfo"]),
  },
};
</script>

<style scoped lang='less'>
#orderDetail {
  background-color: #f5f5f5;
  .tabbar {
    margin-top: 40px;
  }
  /deep/.van-tab__pane {
    padding: 10px;
  }
  .listnone{
    margin-top: 156px;
    text-align: center;
    img{
      margin: 0 auto;
      width: 200px;
    }
    p{
      font-size: 14px;
      color: #999;
    }
  }
}
</style>