<template>
  <div class="mitem">
    <div class="mproduct-list" v-for="(item,index) in productlist" :key="item.id">
      <div class="mcate-left-img">
        <img
          :src="item.small_image"
          alt
        />
      </div>
      <div class="mcate-right-info">
        <div class="cate-info-name">
          <p>{{item.product_name}}</p>
        </div>
        <div class="cate-info-desc">
          <span>{{item.spec}}</span>
        </div>
        <div class="cate-info-price">
          <span>{{item.price|moneyformat}}</span>
          <i class="iconfont" @click="addprduct(item)">&#xe7a6;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入消息订阅
import pubsub from 'pubsub-js'
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  props: {
    productlist: Array,
  },
  methods: {
    addprduct(item){
      if(!this.acountinfo.token){
        this.$router.push('/login')
        return
      }
      pubsub.publish('cateadd',item)
    }
  },
  computed:{
    ...mapState(['acountinfo'])
  }
};
</script>

<style scoped lang='less'>
.mproduct-list {
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e6e6e6;/*no*/
  .mcate-left-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .mcate-right-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    div {
      display: block;
      line-height: 20px;
    }
    .cate-info-name {
      p {
        font-size: 14px;
        color: #333;
      }
    }
    .cate-info-desc {
      font-size: 12px;
      color: #999999;
    }
    .cate-info-price {
      margin-top: 8px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-weight: bold;
        color: orangered;
      }
      i {
        font-size: 24px;
        color: #01c150;
      }
    }
  }
}
</style>