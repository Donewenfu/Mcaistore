<template>
  <div id="order">
    <transition name="router-transtion" mode="in-out">
      <router-view @selectadd="selectaddevent"></router-view>
    </transition>
    <!-- 导航 -->
    <van-nav-bar title="填写订单" left-arrow :fixed="true" @click-left="onClickLeft" />
    <div class="order-content">
      <!-- 添加联系人 -->
      <van-contact-card
        :type="editmode"
        :name="ordernameedit"
        :tel="orderteledit"
        @click="addAddress"
      />
      <!-- 单元格 -->
      <van-cell-group class="v-cell-top">
        <van-cell title="送达时间" :value="`${usertime?usertime:'请选择配送时间'}`" is-link @click="showdatepopup"/>
        <van-cell :value="`共${shopcarunum.length}件`" is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title class="order-li">
            <img
              v-for="(item,index) in shopcartlist"
              :key='item.id'
              :src="item.img"
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
            <input type="text" placeholder="请输入备注信息" style="text-align:right;" v-model="lymsg"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="v-cell-top">
        <van-cell title="商品金额" :value="`￥${producttotal}`" />
        <van-cell title="配送费" :value="`${freightprice}配送费`" />
      </van-cell-group>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="dateshow" round position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择完整时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm='dateok'
        @cancel='dateshow=false'
      />
    </van-popup>
    <van-popup v-model="qrcodeshow" closeable
    @close='closeorder'
  close-icon="close" round position="bottom" :style="{ height: '30%' }" :close-on-click-overlay='false'>
        <qriously ref='showcanvas' :value="qrcodeurl" :size="130" style="position: absolute;left: 50%;top: 20%;transform: translate(-50%, -22px);"></qriously>
        <div class="paywait">
          <i class="iconfont" v-if="ispayicon">&#xe62c;</i>
          <i class="iconfont" v-else>&#xe663;</i>
          <p>{{paytext}}</p>
        </div>
    </van-popup>
    <van-submit-bar :price="producttotal*100+(freightprice*100)" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
import axios from 'axios'
//引入网络请求
import {postOrder,delAllSelectedGoods} from '@/service/api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      //编辑模式
      editmode: "add",
      //选中的订单id
      addid:'',
      //姓名
      ordernameedit: "",
      //电话
      orderteledit: "",
      //时间弹窗
      dateshow: false,
      //最小时间
      minDate: new Date(2020, 0, 1),
      //最大时间
      maxDate: new Date(2021, 10, 1),
      //弹窗层当前的时间
      currentDate: new Date(),
      //用户选中的时间
      usertime:'',
      //用户留言信息
      lymsg:'',
      //支付二维码地址
      qrcodeurl:'',
      //qrcode弹出
      qrcodeshow:false,
      //partext
      paytext:'正在支付中...',
      //支付icon
      ispayicon:true
    };
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
    async onSubmit() {
      //判断是否选了地址
      if(!this.addid){
        Toast({
          message:'请选中地址',
          duration:1600
        })
        return
      }
      //判断是否选中了时间
      if(!this.usertime){
        Toast({
          message:'请选中配送时间',
          duration:1600
        })
        return
      }
      //请填写留言
       if(!this.lymsg){
        Toast({
          message:'请填写留言',
          duration:1600
        })
        return
      }
      let result = await postOrder(this.acountinfo.token,this.addid,this.usertime,this.shopcarunum,this.lymsg,this.producttotal,this.freightprice);
      if(result.success_code==200){//订单创建成功
        //从购物车中删除已经生成订单的商品
        let delresult = await delAllSelectedGoods(this.acountinfo.token)
        if(delresult.success_code==200){
          //生成支付二维码
          let qrcode = await axios.get('/pay/createNative.do',{
            params:{
              outTradeNo:result.data.order_id,
              totalFee:1
            }
          })
          this.qrcodeurl = qrcode.code_url
          this.qrcodeshow = true
          //查询订单是否支付成功
          let successorder = await axios.get('/pay/queryPayStatus.do',{
            params:{
              out_trade_no:result.data.order_id
            }
          })

          if(successorder.success==true){
            this.ispayicon = false
            this.paytext = '支付成功'
            
            setTimeout(()=>{
              // this.convertCanvasToImage()
                //关闭弹窗
                this.qrcodeshow = false
                //tabbaricon
                window.sessionStorage.setItem('tabindex',3)
                //回到我的界面
                this.$router.push('/dashboard/mine')
                
            },2500)
          }
        }
      }
    },
    //选中地址返回
    selectaddevent(item) {
      //选中地址返回后改变编辑模式
      this.editmode = "edit";
      //电话 姓名
      this.ordernameedit = item.name;
      this.orderteledit = item.tel;
      //选中的id
      this.addid = item.add_id
    },
    //选中时间确认
    dateok(value){
      this.usertime = moment(value).format('YYYY-MM-DD HH:mm')
      //隐藏弹窗
      this.dateshow = false
    },
    //显示时间弹窗
    showdatepopup(){
       this.dateshow = true
    },
    //取消支付
    closeorder(){
      Toast({
        message:'支付已经取消',
        duration:1600
      })
      this.$router.back()
    }
  },
  computed:{
    ...mapState(['shopCart','acountinfo']),
    shopcartlist(){
      let checkshopcat = []
      Object.values(this.shopCart).forEach((item,index)=>{
        if(item.ischecked){
            checkshopcat.push(item)
        }
      })
      return checkshopcat.splice(0,3)
    },
    //商品总数
    shopcarunum(){
        let checkshopcat = []
      Object.values(this.shopCart).forEach((item,index)=>{
        if(item.ischecked){
            checkshopcat.push(item)
        }
      })
      return checkshopcat
    },
    //商品总金额
    producttotal(){
      let totalprice = 0
      Object.values(this.shopCart).forEach((item,index)=>{
        if(item.ischecked){
            totalprice+=item.num*item.price
        }
      })
      return totalprice.toFixed(2)
    },
    //计算运费
    freightprice(){
      return this.producttotal>=99?0:6
    }
  }
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
  .paywait{
    position: absolute;
    bottom:10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    i{
      font-size: 30px;
      color: #4cb912;
    }
    p{
      font-size: 16px;
      color: #333;
      margin-left: 10px;
    }
  }
}
</style>
