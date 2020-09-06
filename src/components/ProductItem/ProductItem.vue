<template>
    <div :class="{'mproductitem':typeclass === 'small','mproductitem_big':typeclass === 'big'}" :style="{borderRadius:(isradius?'10px':'0px')}">
        <div class="mp-img">
            <img :src="data.small_image" alt="">
        </div>
        <div class="mp-title">
            <p class="ellipsis2">{{data.name}}</p>
        </div>
        <div class="mp-bottom-price">
            <div class="mp-origin-price">{{data.origin_price|moneyformat}}</div>
            <div class="mp-now-price">{{data.price|moneyformat}}</div>
            <i class="iconfont" @click="addcart(data)">&#xe7a6;</i>
        </div>
    </div>
</template>

<script>
//引入消息订阅
import pubsub from 'pubsub-js'

export default {
    data(){
        return{

        }
    },
    props:{
        data:{
            type:Object,
            default(){
                return {}
            }
        },
        typeclass:{
            type:String,
            default:'small'
        },
        width:{
            type:Number,
            default:28
        },
        isradius:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
       
    },
    methods: {
        //添加到购物车
        addcart(product){
            //发布消息
            pubsub.publish('addsubscription',product)
        }
    },
}
</script>

<style lang="less" scoped>
    .mproductitem{
        padding: 10px;
        // width: 28%;
        background-color: #fff;
        .mp-img{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .mp-title{
            height: 40px;
            font-size: 13px;
            color: #333;
            margin: 5px 0;
        }
        .mp-bottom-price{
            margin-top: 10px;
            display: flex;
            font-size: 12px;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            .mp-origin-price{
                width: 100%;
                text-decoration: line-through;
                font-size: 12px;
                color: #999;
            }
            .mp-now-price{
                color: #fe6263;
                font-weight: bold;
            }
            i{
                font-size: 26px;
                color: #01c150;
            }
        }
    }
    .mproductitem_big{
        padding: 10px;
        width: 47%;
        background-color: #fff;
        box-sizing: border-box;
        margin: 5px;
        .mp-img{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .mp-title{
            height: 40px;
            font-size: 13px;
            color: #333;
            margin: 5px 0;
        }
        .mp-bottom-price{
            display: flex;
            font-size: 12px;
            flex-wrap: wrap;
            align-items: center;
            flex-direction: row;
            width: 100%;
            .mp-origin-price{
                order: 2;
                // width: 100%;
                text-decoration: line-through;
                font-size: 12px;
                color: #999;
                margin-left: 10px;
                flex: 1;
            }
            .mp-now-price{
                order: -6;
                color: #fe6263;
                font-weight: bold;
                flex: 1;
            }
            i{
                flex: 2;
                align-self: flex-end;
                order: 3;
                font-size: 25px;
                color: #01c150;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>