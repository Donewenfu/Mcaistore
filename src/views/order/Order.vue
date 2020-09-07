<template>
  <div id="order">
    <transition name="router-transtion" mode="in-out">
      <router-view></router-view>
    </transition>
    <!-- 导航 -->
    <van-nav-bar title="填写订单" left-arrow :fixed="true" @click-left="onClickLeft" />
    <div class="order-content">
      <!-- 添加联系人 -->
      <van-contact-card type="add" @click="addAddress" />
      <!-- 单元格 -->
      <van-cell-group class="v-cell-top">
        <van-cell title="送达时间" value="请选择送达时间" is-link />
        <van-cell value="共4件" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title class="order-li">
            <img
              src="https://img.ddimg.mobi/product/99525c1c2a9ad1548473873455.jpg!deliver.product.list"
              alt
              class="order-img"
            />
            <img
              src="https://img.ddimg.mobi/product/99525c1c2a9ad1548473873455.jpg!deliver.product.list"
              alt
              class="order-img"
            />
            <img
              src="https://img.ddimg.mobi/product/99525c1c2a9ad1548473873455.jpg!deliver.product.list"
              alt
              class="order-img"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="v-cell-top">
        <van-cell title="支付方式" value="微信" />
      </van-cell-group>
      <van-cell-group class="v-cell-top">
        <van-cell title="备注">
          <!-- 使用 title 插槽来自定义标题 -->
          <template>
            <input type="text" placeholder="请输入备注信息" style="text-align:right;">
          </template>
        </van-cell>
      </van-cell-group>
       <van-cell-group class="v-cell-top">
        <van-cell title="商品金额" value="￥58.00" />
         <van-cell title="配送费" value="￥6.00" />
      </van-cell-group>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //跳转到联系人列表
    addAddress() {
      this.$router.push("/order/myaddress");
    },
    //提交订单  
    onSubmit(){
      alert(1)
    }
  },
};
</script>

<style scoped lang='less'>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  /deep/.van-nav-bar__left {
    display: flex;
    align-items: center;
  }
  /deep/.van-nav-bar__text {
    color: #333;
    font-size: 16px;
  }
  /deep/.van-nav-bar .van-icon {
    color: #81838f;
    font-size: 18px;
  }
  .order-content {
    margin-top: 60px;
  }
  .router-transtion-enter-active,
  .router-transtion-leave-active {
    transition: all 0.4s;
  }
  //   进入和离开时候的效果
  .router-transtion-enter,
  .router-transtion-leave-active {
    transform: translate3d(100px, 0, 0);
    opacity: 0;
  }
  .v-cell-top {
    margin-top: 10px;
  }
  /deep/.van-cell__title {
    display: flex;
  }
  .order-img {
    width: 70px;
    height: 70px;
  }
}
</style>
