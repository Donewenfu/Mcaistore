<template>
  <div id="cart" v-if="acountinfo.token">
    <!-- 购物车头部 -->
    <div class="mcartheader">
      <p>购物车</p>
      <span @click="checkeddelete">删除</span>
    </div>
    <!-- 购物车中间区域 -->
    <div class="mcartmiddle" v-if="Object.values(shopCart).length>=1">
      <!-- v-for也可以循环对象 -->
      <div class="cartitem" v-for="(item,index) in shopCart" :key="item.id">
        <div class="itemcheck">
          <i class="iconfont istrue" v-if="item.ischecked" @click="selectSingle(item)">&#xe65a;</i>
          <i class="iconfont isfalse" v-else @click="selectSingle(item)">&#xe600;</i>
        </div>
        <div class="itemimg">
          <router-link :to="'/detail/'+item.id">
            <img :src="item.img" alt />
          </router-link>
        </div>
        <div class="iteminfo">
          <p class="cart-p-name">{{item.name}}</p>
          <div class="itempricenum">
            <div class="cartitem-price">
              <span>{{item.price|moneyformat}}</span>
            </div>
            <div class="cartitem-num">
              <i class="iconfont" @click.stop="subcart(item)">&#xe608;</i>
              <input type="text" v-model="item.num" disabled />
              <i class="iconfont" @click.stop="addshopcart(item)">&#xe602;</i>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="listnone" v-else>
            <img src="../../images/cart/nonelist.png" alt="">
            <p>快去把我填满吧！</p>
          </div>
    <!-- 底部结算 -->
    <div class="bottom-cart">
      <div class="cart-b-check">
        <i class="iconfont istrue" v-if="selectAlls" @click="selectAll(selectAlls)">&#xe65a;</i>
        <i class="iconfont isfalse" v-else @click="selectAll(selectAlls)">&#xe600;</i>
        <span>全选</span>
      </div>
      <div class="cart-b-price">
        <div class="cart-b-p-top">
          <span>合计</span>
          <p>{{totalprice|moneyformat}}</p>
        </div>
        <p>已免配送费</p>
      </div>
      <div class="car-b-go" @click="gopay">
        <span>
          去结算
          <span v-if="countnum>0">({{countnum}})</span>
        </span>
      </div>
    </div>
  </div>
  <Selectlogin v-else></Selectlogin>
</template>

<script>
//引入vuex
import { mapState, mapMutations } from "vuex";
//引入vantUI
import { Dialog, Toast } from "vant";
//引入组件
import Selectlogin from "../login/Selectlogin";
//引入网络请求
import { cartnummodif, deletecart,singerGoodsSelect,allGoodsSelect } from "@/service/api/index";
export default {
  data() {
    return {
      selectallvuex: true,
    };
  },
  components: {
    Selectlogin,
  },
  mounted() {

  },
  computed: {
    ...mapState(["shopCart", "acountinfo"]),
    //全选状态
    selectAlls() {
      let seAll = this.countnum > 0;
      Object.values(this.shopCart).forEach((item, index) => {
        if (!item.ischecked) {
          seAll = false;
        }
      });
      return seAll;
    },
    //去结算的数量
    countnum() {
      let pnum = 0;
      let productlist = Object.values(this.shopCart);
      //循环遍历，选中的商品才显示数字
      productlist.forEach((item, index) => {
        if (item.ischecked) {
          pnum += 1;
        }
      });
      return pnum;
    },
    //计算商品总价
    totalprice() {
      let total = 0;
      //对象的值转为数组进行遍历
      let productList = Object.values(this.shopCart);
      //遍历数组 如果选中的商品才去计算总价
      productList.forEach((item, index) => {
        if (item.ischecked) {
          total += item.price * item.num;
        }
      });
      return total.toFixed(2);
    },
  },
  methods: {
    ...mapMutations([
      "SUB_GOODS",
      "SELECT_SINGLE",
      "SELECT_ALL",
      "DELETE_SINGLE",
      "Add_GOODS",
    ]),
    async subcart(item) {
      //判断是否已经删除到1个了
      if (item.num > 1) {
        //发起减去商品的接口
        let result = await cartnummodif(
          this.acountinfo.token,
          item.id,
          "reduce"
        );
        this.SUB_GOODS(item.id);
      } else if (item.num == 1) {
        Dialog.confirm({
          title: "温馨提示",
          message: "您确认要删除吗？",
        })
          .then(async () => {
            //删除接口
            let result = await cartnummodif(
              this.acountinfo.token,
              item.id,
              "reduce"
            );
            // on confirm
            this.SUB_GOODS(item.id);
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //单选
    async selectSingle(item) {
      //接口
      let result = await singerGoodsSelect(this.acountinfo.token,item.id)
      this.SELECT_SINGLE(item.id);
    },
    //全选
    async selectAll(selectall) {
      //接口
      let result = await allGoodsSelect(this.acountinfo.token,selectall)
      //执行vuex mutations 中的全选方法
      this.SELECT_ALL(selectall);
    },
    //去结算
    gopay() {
      if (this.countnum <= 0) {
        this.$toast({
          message: "请选择商品再结算！",
          duration: 1600,
        });
        return;
      }
      //跳转到订单确认页面
      this.$router.push("/order");
    },
    //删除已经选中的商品
    checkeddelete() {
      if (this.countnum <= 0) {
        this.$toast({
          message: "没有要删除的商品！",
          duration: 1600,
        });
        return;
      }
      Dialog.confirm({
        title: "温馨提示",
        message: "您确认要删除选中的吗？",
      })
        .then(async () => {
          let result = await deletecart(this.acountinfo.token);
          if (result.success_code === 200) {
            this.$toast({
              message: "购物车已经清空",
              duration: 1600,
            });
            // on confirm
            this.DELETE_SINGLE();
          }
        })
        .catch(() => {
          // on cancel
        });
      // console.log(1)
    },
    //添加商品数量
    async addshopcart(item) {
      let result = await cartnummodif(this.acountinfo.token, item.id, "add");
      console.log(result);
      this.Add_GOODS({
        goods_id: item.id,
        goods_img: item.img,
        goods_price: item.price,
        good_name: item.name,
      });
    },
  },
};
</script>

<style lang="less" scoped>
#cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .mcartheader {
    display: flex;
    height: 50px;
    background-color: #fff;
    width: 100%;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    box-sizing: border-box;
    p {
      font-size: 16px;
      color: #333;
    }
    span {
      font-size: 14px;
      color: #2faa5c;
    }
  }
  .mcartmiddle {
    margin-bottom: 100px;
    margin-top: 10px;
    .cartitem {
      padding: 8px 0;
      border-bottom: 1px solid #eeeeee; /*no*/
      background-color: #fff;
      height: 95px;
      display: flex;
      .itemcheck {
        width: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 18px;
        }
        .istrue {
          color: #45c46d;
        }
        .isfalse {
          color: #ccc;
        }
      }
      .itemimg {
        height: 100%;
        img {
          height: 100%;
        }
      }
      .iteminfo {
        flex: 1;
        padding: 10px 10px 10px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .cart-p-name {
          font-size: 14px;
        }
        .itempricenum {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .cartitem-price {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              color: #ef5557;
            }
          }
          .cartitem-num {
            display: flex;
            align-items: center;
            input {
              width: 35px;
              height: 22px;
              font-size: 12px;
              text-align: center;
              line-height: 22px;
              background-color: #f6f6f6;
            }
            i {
              font-size: 13px;
              margin: 5px;
            }
          }
        }
      }
    }
  }
  .bottom-cart {
    box-sizing: border-box;
    padding: 8px 5px;
    max-width: 750px;
    margin: 0 auto;
    height: 55px;
    border-top: 1px solid #eeeeee; /*no*/
    position: fixed;
    background-color: #f9f9f9;
    bottom: 50px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .cart-b-check {
      width: 86px;
      display: flex;
      // justify-content: center;
      align-items: center;
      span {
        font-size: 14px;
        padding: 5px;
      }
      i {
        margin-left: 8px;
        font-size: 18px;
      }
      .istrue {
        color: #45c46d;
      }
      .isfalse {
        color: #cccccc;
      }
    }
    .cart-b-price {
      width: 152px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .cart-b-p-top {
        align-self: flex-end;
        display: flex;
        align-items: center;
        span {
          font-size: 13px;
          margin-right: 5px;
        }
        p {
          font-size: 15px;
          font-weight: bold;
          color: #fe6263;
        }
      }
      p {
        font-size: 12px;
        align-self: flex-end;
      }
    }
    .car-b-go {
      flex: 1;
      background:linear-gradient(to right,#ff6034,#ee0a24);
      font-size: 15px;
      color: #fff;
      text-align: center;
      height: 100%;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
    }
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
