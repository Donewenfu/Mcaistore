<template>
  <div class="mheader" :style="{borderBottom:(istop?'1px solid #fff':'1px solid #f5f5f5')}">
    <div class="searchbox" :class="{istopsearch:!istop}">
      <i class="iconfont">&#xe647;</i>
      <span>输入商品的名字</span>
    </div>
    <div class="cityname" v-show="istop" v-if="showcity">
      <i class="iconfont">&#xe63e;</i>
      <span>成都</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        istop:true
    };
  },
  methods: {
      istopscroll(e){
         let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 获取窗口滚动条高度
         if(scrollTop<=10){
             this.istop = true
         }else if(scrollTop>100){
             this.istop = false
         } 
      }
  },
  mounted() {
      //监听窗口事件
      document.addEventListener('scroll',this.istopscroll)
  },
  props:{
    showcity:{
      type:Boolean,
      default:true
    }
  }
};
</script>

<style lang="less" scoped>
.mheader {
  box-sizing: border-box;
  padding: 0 10px;
  height: 50px;
  background-color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 750px;
  margin: 0 auto;
  z-index: 999;
  justify-content: space-between;
  .searchbox {
    transition: all 3s;
    width: 80%;
    flex: 1;
    height: 30px;
    border: 2px solid #4cb912;
    border-radius: 40px;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    i {
      color: #999999;
    }
    span {
      margin-left: 10px;
      color: #656565;
      font-size: 14px;
    }
  }
  .istopsearch{
      width: 100%;
      transition: all 3s;
      flex: 1;
  }
  .cityname {
    // flex: 1;
    display: flex;
    align-items: center;
    margin-left: 10px;
    i {
      color: #4cb912;
    }
    span {
      color: #333;
      font-size: 14px;
    }
  }
}

</style>