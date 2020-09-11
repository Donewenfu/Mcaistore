<template>
  <div id="addaddress">
    <!-- 导航 -->
    <van-nav-bar title="新增地址" left-arrow :fixed="true" @click-left="onClickLeft" />

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import areajs from '@/config/area'
import {mapState} from 'vuex'
//引入网络请求
import {addUserAddress} from '@/service/api/index'
//通知与订阅
import pubsub from 'pubsub-js'
export default {
  data() {
    return {
      areaList:areajs,
      searchResult: [],
    };
  },
  methods: {
    async onSave(content) {
      console.log(content)
       let result = await addUserAddress(this.acountinfo.token, content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
       if(result.success_code===200){
         //添加成功以后提示地址列表请求接口
         pubsub.publish('addressok')
         //返回地址列表
         this.$router.back()
       }
    },
    //返回
    onClickLeft(){
        this.$router.back()
    }
  },
  computed:{
    ...mapState(['acountinfo'])
  }
};
</script>

<style lang="less" scoped>
    #addaddress{
        max-width: 750px;
        margin: 0 auto;
        height: 100%;
        position: fixed;
        left: 0;
        top: 40px;
        bottom: 0;
        right: 0;
        z-index: 9999;
        background-color: #f5f5f5;
    }
</style>