<template>
  <div id="editaddress">
    <!-- 导航 -->
    <van-nav-bar title="编辑地址" left-arrow :fixed="true" @click-left="onClickLeft" />

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete='onDelete'
      :address-info='editinfo'
    />
  </div>
</template>

<script>
import { Toast } from "vant";
//引入网络请求
import {getCurrentUserAddress,delUserAddress,changeUserAddress} from '@/service/api/index'
//引入城市区域
import areajs from '@/config/area'
//pubsub通知与订阅
import pubsub from 'pubsub-js'
//引入vuex
import {mapState} from 'vuex'

export default {
  data() {
    return {
      areaList:areajs,
      searchResult: [],
      editinfo:{}
    };
  },
  methods: {
    async onSave(content) {
      let result = await changeUserAddress(content.id,this.acountinfo.token, content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
      if(result.success_code===200){
        this.$emit('editaddok')
        this.$router.back()
      }
    },
    //删除用户地址
    async onDelete(content) {
      let result = await delUserAddress(content.id);
      if(result.success_code==200){
        Toast("地址删除成功");
        //通知地址列表 已经删除完成了
        pubsub.publish('addressdelete')
        this.$router.back()
      }
    },
    //返回
    onClickLeft(){
        this.$router.back()
    },
    //单条数据的查询
    async getsingleadd(uid,aid){
      let results = await getCurrentUserAddress(uid,aid);
      let result = results.data;
      this.editinfo = {
        id:result._id,
        name:result.address_name,
        tel:result.address_phone,
        province:result.province,
        city:result.city,
        county:result.county,
        addressDetail:result.address_area_detail,
        areaCode:result.areaCode,
        postalCode:result.address_post_code,
        isDefault:result.address_tag
      }
    }
  },
  mounted(){
    //获取地址列表传来的用户id和地址id
    let queryid = this.$route.query;
    this.getsingleadd(queryid.user_id,queryid.addid)
  },
  computed:{
    ...mapState(['acountinfo'])
  }
};
</script>

<style lang="less" scoped>
    #editaddress{
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
        overflow-y: hidden;
    }
</style>