<template>
  <div id="myaddress">
    <!-- 显示编辑和新增地址子路由 -->
    <router-view @editaddok='editokgetlist'></router-view>
    <!-- 导航 -->
    <van-nav-bar title="我的地址" left-arrow :fixed="true" @click-left="onClickLeft" />
    <!-- 地址列表区域 -->
    <div class="myaddress-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select='selectadd'
      />
    </div>
    <div class="listnone" v-show="list.length<1">
            <img src="../../../images/cart/nonelist.png" alt="">
            <p>暂时还没有地址</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
//引入网络请求
import {getUserAddress} from '@/service/api/index'
import { mapState } from 'vuex';
import pubsub from 'pubsub-js'
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: []
    }
  },
  computed:{
    ...mapState(['acountinfo'])
  },
  mounted(){
    //获取地址接口
    this.getaddresslist(this.acountinfo.token)
    //订阅添加地址成功的消息
    pubsub.subscribe('addressok',(msg)=>{
      if(msg==='addressok'){
        this.getaddresslist(this.acountinfo.token)
      }
    })
    //订阅消息删除成功以后再次请求地址数据
    pubsub.subscribe('addressdelete',(msg)=>{
      if(msg==='addressdelete'){
        this.getaddresslist(this.acountinfo.token)
      }
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push({
        path:'/order/myaddress/addaddress'
      })
    },
    onEdit(item, index) {
      this.$router.push({
        path:'/order/myaddress/editaddress',
        query:{
          user_id:item.user_id,
          addid:item.add_id
        }
      })
    },
    //获取地址列表
    async getaddresslist(userid){
        let result = await getUserAddress(userid);
        let useraddresslist = result.data;
        this.list = []
        useraddresslist.forEach((item,index)=>{
            let listobj = {
              id:(index+1),
              name:item.address_name,
              tel:item.address_phone,
              address:item.address_area_detail,
              user_id:item.user_id,
              add_id:item._id,
              isDefault:true
            }
            this.list.push(listobj)
        })
    },
    //编辑修改成功以后
    editokgetlist(){
      this.getaddresslist(this.acountinfo.token)
    },
    //选中地址
    selectadd(item){
      this.$emit('selectadd',item)
      this.$router.back()
    }
  },
  beforeDestroy(){
    //订阅以后要取消订阅
    pubsub.unsubscribe('addressok');
    pubsub.unsubscribe('addressdelete')
  }
};
</script>

<style scoped lang='less'>
#myaddress {
  max-width: 750px;
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin: 0 auto;
}
 .listnone{
   position: absolute;
   left: 50%;
   top: 30%;
   transform: translate(-50%,-10%);
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
</style>