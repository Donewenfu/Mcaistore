import {LOGIN_OUT,INIT_USERINFO} from './mutations-type'
import {loginout,autologin} from '@/service/api/index'
//引入本地存储
import {getLocalStorage} from '@/config/global'
export default{
    //退出登录
    async loginouts(contxt){
        let result = await loginout()
        if(result.success_code==200){
            //派发事件 清空用户数据
        contxt.commit('LOGIN_OUT')
            //清空购物车数据
            contxt.commit('CLEAR_CART')
        }
        
    },
    //自动登录
    async autologins(contxt){
        //从本地获取数据，如果没有 就调用自动登录接口
        let userinfo = JSON.parse(getLocalStorage('userinfo'))
        if(userinfo){
            contxt.commit('SAVE_USERINFO',userinfo)
        }else{
         //调用自动登录的接口 再提交mutations
         let result = await autologin();
            if(result.success_code==200){
                contxt.commit('SAVE_USERINFO',result.data)
            }
        }
    }
}