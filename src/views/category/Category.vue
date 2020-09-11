<template>
  <div id="category">
    <!-- 搜索导航部分 -->
    <Msearchheader :showcity="false"></Msearchheader>
    <!-- 内容区域 -->
    <div class="category-content" v-show="isshowloding">
      <!-- 左边商品列表区域 -->
      <div class="category-left" ref="catelist">
        <ul class="wraplist">
          <li
            ref="listdom"
            v-for="(catename,index) in cateListData"
            :key="catename.id"
            class="catenameitem"
            :class="{on:index==onnum}"
            @click="clickcatelist(index)"
          >
            <span>{{catename.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边商品区域 -->
      <div class="cautegory-right">
        <Mcateproduct :cateproduct="cateproduct"></Mcateproduct>
      </div>
    </div>
    <van-loading
      size="24px"
      vertical
      v-if="!isshowloding"
      color="#01c150"
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);"
    >加载中...</van-loading>
  </div>
</template>

<script>
//引入组件
import Msearchheader from "@/components/Msearchheader/Msearchheader";
import Mcateproduct from "./components/Mcateproduct/Mcateproduct";
//引入滚动插件better-scroll
import better from "better-scroll";
//网络请求
import {
  getCategoryData,
  getCategoryproduct,
  addproductadd,
} from "@/service/api/index";

//引入消息订阅
import pubsub from "pubsub-js";

//引入vuex
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      cateListData: [],
      //初始化on
      onnum: 0,
      //列表商品数据
      cateproduct: [],
      //是否显示加载
      isshowloding: false,
    };
  },
  components: {
    Msearchheader,
    Mcateproduct,
  },
  methods: {
    ...mapMutations(["Add_GOODS"]),
    //获取分类数据
    async getCateList() {
      let data = await getCategoryData();
      this.cateListData = data.data.cate;
      this.isshowloding = true;
      //获取到外层包裹的dom
      let wrapdom = this.$refs.catelist;
      //当数据请求成功以后初始化 better-scroll

      this.$nextTick(() => {
        const options = {
          click: true,
          taps: true,
        };
        this.scroll = new better(wrapdom, options);
      });
    },
    //点击分类
    clickcatelist(index) {
      let listDom = this.$refs.listdom;
      //   滚动到的目标元素,
      this.scroll.scrollToElement(listDom[index]);
      this.onnum = index;
      this.getcateproduct(index + 1);
    },
    //请求分类商品的数据
    async getcateproduct(catenum = 1) {
      let data = await getCategoryproduct("/lk00" + catenum).catch();
      this.cateproduct = data.data.cate;
    },
  },
  mounted() {
    //获取分类的数据
    this.getCateList();
    //获取商品的数据
    this.getcateproduct();
    //订阅消息的名称
    let addcartsubscription = "cateadd";
    pubsub.subscribe(addcartsubscription, async (msg, value) => {
      //判断是否登录
      if (!this.acountinfo.token) {
        this.$router.push("/login");
        return;
      } else {
        //判断是否是订阅的添加购物车的消息
        if (msg == "cateadd") {
          let result = await addproductadd(
            this.acountinfo.token,
            value.id,
            value.name,
            value.price,
            value.small_image
          );
          if (result.success_code === 200) {
            this.Add_GOODS({
              goods_id: value.id,
              goods_img: value.small_image,
              goods_price: value.price,
              good_name: value.name,
            });
            this.$toast({
              message: "商品添加成功！",
              duration: 1600,
            });
          }
        }
      }
    });
  },
  beforeDestroy() {
    pubsub.unsubscribe("cateadd");
  },
  computed: {
    ...mapState(["acountinfo"]),
  },
};
</script>

<style lang="less" scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .category-content {
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    max-width: 750px;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
    margin-bottom: 50px;
    .category-left {
      position: fixed;
      // left: 0;
      top: 50px;
      bottom: 50px;
      width: 92px;
      ul {
        background-color: #f5f5f5;
        li {
          height: 48px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 14px;
          }
          &.on {
            background-color: #fff;
            border-left: 3px solid red; /*no*/
          }
        }
      }
    }
    .cautegory-right {
      flex: 1;
      margin-left: 92px;
      background-color: #f5f5f5;
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>
