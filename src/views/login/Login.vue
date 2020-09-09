<template>
  <div id="login">
    <div class="login-bg">
      <div class="login-bg-img"></div>
      <div class="login-logo">
        <img src="../../images/login/logo.png" alt />
      </div>
    </div>
    <div class="login-form">
      <div class="login-form-title">
        <div class="login-phone" :class="{on:loginformactive}" @click="changeform(true)">
          <p>手机登录</p>
        </div>
        <div class="login-pass" :class="{on:!loginformactive}" @click="changeform(false)">
          <p>密码登录</p>
        </div>
      </div>
      <div class="login-form-content">
        <div class="login-form-p" :class="{on:loginformactive}">
          <input type="text" placeholder="请输入手机号" v-model="userphone" />
          <span
            class="authcode"
            :class="{okcode:phoneok}"
            @click="getauthcode"
            v-if="showgetcode"
          >获取验证码</span>
          <span class="authcode" v-else>正在获取({{countdown}})</span>
          <input type="text" placeholder="输入验证码" v-model="messagecode"/>
        </div>
        <div class="login-form-account" :class="{on:!loginformactive}">
          <input type="text" placeholder="请输入用户名" />
          <input :type="isshowpwd?'text':'password'" placeholder="请输入密码" />
          <i class="epsw" @click="showpwd" :class="{on:isshowpwd}"></i>
        </div>
      </div>
      <div class="login-form-btn">
        <button @click="gologin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
//引入网络接口
import { getmessagecode,loginphonecode } from "@/service/api/index";
//引入vuex
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      //登录的类型
      loginformactive: true,
      //显示密码
      isshowpwd: false,
      //手机号
      userphone: "",
      //是否显示倒计时
      showgetcode: true,
      //倒计时数字60
      countdown: 0,
      //验证码
      messagecode:''
    };
  },
  methods: {
    ...mapMutations(['SAVE_USERINFO']),
    changeform(flag) {
      this.loginformactive = flag;
    },
    showpwd() {
      this.isshowpwd = !this.isshowpwd;
    },
    //获取验证码
    async getauthcode() {
      if (this.phoneok) {
        this.showgetcode = false;
        //倒计时数字为60
        this.countdown = 60;
        this.getcode = setInterval(() => {
          if (this.countdown == 0) {
            clearInterval(this.getcode);
            //显示获取短信验证码子
            this.showgetcode = true;
            //结束函数
            return;
          }
          this.countdown--;
        }, 1000);
        //请求短信验证码接口
        let data = await getmessagecode(this.userphone);
        Toast("验证码获取成功测试数据！");
        this.messagecode = data.code
      } else {
        Toast("请输入手机号再获取验证码！");
      }
    },
    //登录
    async gologin() {
      //判断登录的类型
      if (this.loginformactive) {
        //手机验证码登录
        //判断用户是否输入手机
        if (!this.userphone.trim()) {
          Toast("请输入手机号");
          return;
        } else if (!/^1[345786]\d{9}$/.test(this.userphone)) {
          Toast("手机号码位数不正确！");
          return;
        }else if(!this.messagecode.trim()){
           Toast("验证码不正确");
          return;
        }
        //请求短信验证码登录接口
        let data = await loginphonecode(this.userphone,this.messagecode);
        //判断是否登录成功
        if(data.success_code==200){
          //提示用户登录成功
          Toast({
            message:'登录成功',
            duration:500
          })
          this.SAVE_USERINFO(data.data)
          this.$router.back()
        }
      } else {
        //密码登录
      }
    },
  },
  computed: {
    //验证手机号是否输入正确，输入正确获取验证码颜色为绿色
    phoneok() {
      return /^1[345786]\d{9}$/.test(this.userphone);
    },
  },
};
</script>

<style scoped lang='less'>
#login {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .login-bg {
    height: 260px;
    width: 100%;
    position: relative;
    .login-bg-img {
      height: 220px;
      width: 100%;
      background: url(../../images/login/login_bg.png) no-repeat;
      background-size: 100% 100%;
    }
    .login-logo {
      position: absolute;
      top: 180px;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .login-form {
    margin-top: 35px;
    padding: 0 45px;
    box-sizing: border-box;
    .login-form-title {
      display: flex;
      justify-content: space-around;
      div {
        width: 50%;
        &.on {
          border-bottom: 2px solid #2dbe59;
          color: #2dbe59;
          transition: all 0.3s;
        }
        border-bottom: 2px solid #cacaca;
        padding-bottom: 10px;
      }
      p {
        font-size: 16px;
        text-align: center;
      }
    }
    .login-form-content {
      div {
        display: none;
        &.on {
          display: block;
        }
      }
      margin-top: 15px;
      .login-form-p {
        position: relative;
        width: 100%;
        input {
          width: 100%;
          font-size: 14px;
          border-bottom: 1px solid #dfdfdf;
          padding: 10px 0 10px 30px;
          box-sizing: border-box;
          color: #666;
          &:nth-child(1) {
            background: url("../../images/login/phone.png") no-repeat center
              left;
            background-size: 18px 20px;
          }
          &:nth-child(3) {
            background: url("../../images/login/authcode.png") no-repeat center
              left;
            background-size: 22px 25px;
          }
        }
        .authcode {
          position: absolute;
          font-size: 12px;
          color: #999;
          right: 0;
          top: 25px;
          &.okcode {
            color: #2dbe59;
          }
        }
      }
      .login-form-account {
        position: relative;
        width: 100%;
        input {
          width: 100%;
          font-size: 14px;
          border-bottom: 1px solid #dfdfdf;
          padding: 10px 0 10px 30px;
          box-sizing: border-box;
          color: #666;
          &:nth-child(1) {
            background: url("../../images/login/account.png") no-repeat center
              left;
            background-size: 20px 20px;
          }
          &:nth-child(2) {
            background: url("../../images/login/password.png") no-repeat center
              left;
            background-size: 20px 20px;
          }
        }
        .epsw {
          width: 22px;
          height: 18px;
          display: block;
          position: absolute;
          background: url("../../images/login/close.png");
          right: 0;
          bottom: 12px;
          background-size: 22px 18px;
          &.on {
            background-image: url("../../images/login/open.png");
          }
        }
      }
    }
    .login-form-btn {
      width: 100%;
      margin-top: 20px;
      button {
        width: 100%;
        height: 44px;
        background-color: #2dbe59;
        border: none;
        font-size: 14px;
        border-radius: 30px;
        color: #fff;
      }
    }
  }
}
</style>