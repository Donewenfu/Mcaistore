<template>
  <div id="editaddress">
    <!-- 导航 -->
    <van-nav-bar title="编辑地址" left-arrow :fixed="true" @click-left="onClickLeft" />

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      areaList:{},
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    //返回
    onClickLeft(){
        this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
    #editaddress{
        max-width: 750px;
        margin: 0 auto;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 9999;
        background-color: #f5f5f5;
    }
</style>