<template>
  <div id="myaddress">
    <!-- 显示编辑和新增地址子路由 -->
    <router-view></router-view>
    <!-- 导航 -->
    <van-nav-bar title="我的地址" left-arrow :fixed="true" @click-left="onClickLeft" />
    <!-- 地址列表区域 -->
    <div class="myaddress-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ]
    }
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
        path:'/order/myaddress/editaddress'
      })
    },
  },
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
</style>