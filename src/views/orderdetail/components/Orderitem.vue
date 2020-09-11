<template>
    <div class="orderitem">
        <div class="orderimg">
            <img :src="data.img" alt="">
        </div>
        <div class="order-title">
            <span>{{data.name}}</span>
        </div>
        <div class="order-price">
            <span>{{data.price|moneyformat}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        data:{
            type:Object,
            default(){
                return{}
            }
        }
    }
}
</script>

<style scoped lang='less'>
.orderitem{
    margin-bottom: 10px;
    background-color: #fff;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    .orderimg{
        img{
            width: 90px;
            height: 90px;

        }
    }
    .order-title{
        font-size: 14px;
        width: 80%;
        margin-left: 15px;
    }
    .order-price{
        width: 20%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: red;
    }
}
</style>