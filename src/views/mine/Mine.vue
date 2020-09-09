<template>
  <div id="mine" v-if="acountinfo.token">
    <!-- 用户信息 -->
    <div class="m-userinfo">
      <div class="m-user-img">
        <img
          :src="userinfo.icon_url"
          alt
        />
      </div>
      <div class="m-user-info">
        <span>{{userinfo.real_name}}</span>
        <div class="m-user-phone">
          <i class="iconfont">&#xe671;</i>
          <span>{{userinfo.phone}}</span>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="m-my-order">
      <div class="m-order-title">
        <p>我的订单</p>
        <div class="m-order-arrow">
          <span>查看全部订单</span>
          <i class="iconfont">&#xe628;</i>
        </div>
      </div>
      <!-- 图标区域 我的订单-->
      <div class="m-order-icon">
        <ul>
          <li>
            <i class="iconfont">&#xe63d;</i>
            <p>待支付</p>
          </li>
          <li>
            <i class="iconfont">&#xe7f3;</i>
            <p>待收货</p>
          </li>
          <li>
            <i class="iconfont">&#xe601;</i>
            <p>售后/退款</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 常用功能 -->
    <div class="m-set-icon">
      <div class="m-set-title">
        <p>常用功能</p>
      </div>
      <div class="m-set-list">
        <ul>
          <li>
            <i class="iconfont">&#xe641;</i>
            <p>绿卡会员</p>
            <span class="viptag">开卡立得</span>
          </li>
          <li>
            <i class="iconfont">&#xe645;</i>
            <p>收货地址</p>
          </li>
          <li>
            <i class="iconfont">&#xe654;</i>
            <p>邀请有礼</p>
          </li>
          <li>
            <i class="iconfont">&#xe7e5;</i>
            <p>联系客服</p>
          </li>
          <li>
            <i class="iconfont">&#xe618;</i>
            <p>设置</p>
          </li>
          <li @click="loginout">
            <i class="iconfont">&#xe612;</i>
            <p>退出登录</p>
          </li>
        </ul>
      </div>
    </div>
    <Mlike :MlikeList="MlikeList"></Mlike>
  </div>
  <!-- </div> -->
  <Selectlogin v-else></Selectlogin>
</template>

<script>
//请求首页数据
import { getHomeData } from "@/service/api/index";
//猜你喜欢
import Mlike from "@/views/home/components/Mlike/Mlike";
//引入组件
import Selectlogin from "../login/Selectlogin";
//vuex
import { mapState,mapActions } from "vuex";
//vantUI
import { Dialog } from 'vant';
import {getLocalStorage} from '@/config/global'
export default {
  data() {
    return {
      //猜你喜欢数据
      MlikeList: [],
      userinfo:''
    };
  },
  components: {
    Mlike,
    Selectlogin,
  },
  mounted() {
    //获取首页数据
    this.getIndexData();
    //用户数据获取
    this.userinfo = JSON.parse(getLocalStorage('userinfo'));
  },
  methods: {
    ...mapActions(['loginouts']),
    //获取首页数据
    async getIndexData() {
      let randomnum = parseInt(Math.random() * (4 - 0 + 1) + 0);
      //获取随机数
      let listrandom = [3, 4, 5, 6, 7];
      let data = await getHomeData();
      //猜你喜欢数据
      this.MlikeList = data.data.list[listrandom[randomnum]].product_list;
    },
    //退出登录
    loginout() {
      Dialog.confirm({
        title: "温馨提示",
        message: "您确认退出吗？",
      })
        .then(() => {
          // on confirm
          this.loginouts()
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    ...mapState(["shopCart", "acountinfo"]),
  },
};
</script>

<style lang="less" scoped>
#mine {
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
  /deep/.van-nav-bar {
    background-color: #f5f5f5;
  }
  .mlike {
    padding: 0;
  }
  .m-userinfo {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .m-user-img {
      width: 50px;
      height: 50px;
      border: 3px solid #fff; /*no*/
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      margin-right: 15px;
    }
    .m-user-info {
      display: flex;
      flex-direction: column;
      span {
        font-size: 15px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .m-user-phone {
        display: flex;
        flex-direction: row;
        color: #999999;
        span {
          font-size: 11px;
        }
        i {
          font-size: 10px;
        }
      }
    }
  }
  .m-my-order {
    background-color: #fff;
    margin-top: 14px;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    .m-order-title {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 16px;
        font-weight: bold;
      }
      .m-order-arrow {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          font-size: 13px;
          color: #999999;
        }
        i {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .m-order-icon {
      margin-top: 15px;
      ul {
        display: flex;
        //   justify-content: space-around;
        li {
          width: 33.333%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          p {
            font-size: 13px;
            color: #555;
          }
          i {
            font-size: 28px;
            color: #979797;
          }
        }
      }
    }
  }
  .m-set-icon {
    border-radius: 8px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 14px;
    .m-set-title {
      p {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .m-set-list {
      margin-top: 10px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin: 8px 0;
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          p {
            font-size: 13px;
            color: #555;
          }
          i {
            color: #9d9d9d;
            font-size: 24px;
          }
          .viptag {
            display: block;
            position: absolute;
            background-color: #fc6061;
            font-size: 8px;
            padding: 2px 5px;
            border-radius: 10px;
            color: #fff;
            right: -1px;
            top: -8px;
          }
        }
      }
    }
  }
}
</style>
