<template>
    <div class="mgotop" @click="clickicon">
        <i class="iconfont">&#xe614;</i>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        clickicon:{
            type:Function,
            required:true
        }
    }
}
</script>

<style scoped lang='less'>
.mgotop{
    position: fixed;
    right: 20px;
    z-index: 999;
    bottom: 80px;
    width: 30px;
    height: 30px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #ccc;
    i{
        color: #fff;
        font-size: 20px;
        color: #999;
    }
}
</style>