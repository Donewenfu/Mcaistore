//引入mutations-type名字限制
import {Add_GOODS,INIT_SHOP_CART,SUB_GOODS,SELECT_SINGLE,SELECT_ALL,DELETE_SINGLE,SAVE_USERINFO,INIT_USERINFO,LOGIN_OUT,CLEAR_CART} from './mutations-type'
//引入本地存储
import {setLocalStorage,getLocalStorage,removeLocalStorage} from '@/config/global'

import Vue from 'vue'

export default{
    [Add_GOODS](state,{goods_id,goods_img,goods_price,good_name}){
        //state.shopCart 赋值
        let shopCart = state.shopCart;
        //判断是否重复添加，如果重复添加商品的数量+1，否则那么就添加一个商品到state
        if(state.shopCart[goods_id]){
            //如果有的话在vuex商品中+1
            state.shopCart[goods_id]['num']++
        }else{
           //没有的话就新添加一个对象
           shopCart[goods_id]={
               'id':goods_id,
               'num':1,
               'price':goods_price,
               'img':goods_img,
               'ischecked':true,
               'name':good_name
           }
        }
        //产生新对象 属于浅拷贝
        state.shopCart = {...shopCart}
        //把添加的数据存入本地
        setLocalStorage('shopCart',shopCart)
    },
    //初始化购物车的数据(本地) 把数据存储到vuex中
    [INIT_SHOP_CART](state){
        let initShopCart = getLocalStorage('shopCart');
        //判断是否有值
        if(initShopCart){
            state.shopCart=JSON.parse(initShopCart)
        }
    },
    //减去购物车的数据
    [SUB_GOODS](state,goodsid){
        let shopCart = state.shopCart;
        //判断是否有这个商品
        if(shopCart[goodsid]){//如果有个商品
            if(shopCart[goodsid]['num']>0){
                shopCart[goodsid]['num']--
                //如果vuex中的shopCart数据==0 那么就把商品删除
                if(shopCart[goodsid]['num']==0){
                    //删除对象
                    delete shopCart[goodsid]
                }
            }
        }
        //浅拷贝新对象
        state.shopCart = {...shopCart}
        //再存储数据
        setLocalStorage('shopCart',shopCart)
    },
    //商品的单选
    [SELECT_SINGLE](state,goodsid){
        let shopCart = state.shopCart;
        //判断是否选中
        if(shopCart[goodsid]){
            shopCart[goodsid]['ischecked'] = !shopCart[goodsid]['ischecked']
        }
        //拷贝对象
        state.shopCart = {...shopCart}
        //本地存储
         setLocalStorage('shopCart',shopCart)
    },
    //商品的全选
    [SELECT_ALL](state,selectall){
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((item,index)=>{
             if(item.ischecked){
                 item.ischecked = !selectall
             }else{
                 Vue.set(item,'ischecked',true)
             }
        })
        //拷贝对象
        state.shopCart = {...shopCart}
    },
    //删除单个商品
    [DELETE_SINGLE](state){
        let shopCart = state.shopCart;
        let deleteindex = []
        let productList = Object.values(shopCart);

        let newarr = productList.filter((item,index)=>{
            return !item.ischecked
        })

        let newobj = {};
        newarr.forEach((item,index)=>{
            newobj[item.id] = item
        })

        state.shopCart = {...newobj}
        //本地存储
        setLocalStorage('shopCart',newobj)
    },
    //保存用户信息
    [SAVE_USERINFO](state,userinfo){
        //把用户信息保存到vuex中
        state.acountinfo = userinfo;
        //把用户信息保存到本地
        setLocalStorage('userinfo',state.acountinfo)
    },
    //初始化用户信息
    [INIT_USERINFO](state){
        
        //获取本地存储的用户信息
        let userinfo = getLocalStorage('userinfo');
        //判断是否有值
        if(userinfo){
            state.acountinfo = JSON.parse(userinfo)
        }
    },
    //退出登录
    [LOGIN_OUT](state){
        //退出登录
        //清空vuex用户的信息
        state.acountinfo = {};
        //清除本地存储的用户信息
        removeLocalStorage('userinfo')
    },
    //清空购物车数据
    [CLEAR_CART](state){
        //清空本地数据
        removeLocalStorage('shopCart');
        //清空vuex的购物车数据
        state.shopCart = {}
    }

}