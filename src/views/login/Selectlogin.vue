<template>
    <div id="selectlogin">
        <div class="inselectlogin">
            <img src="../../images/login/logingo.jpg" alt="">
        <p>您还没有登录哦！</p>
        <button @click="gologin">去登录</button>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        gologin(){
            this.$router.push({
                path:'/login'
            })
        }
    },
}
</script>

<style scoped lang='less'>
    #selectlogin{
        .inselectlogin{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        p{
            color: #999;
            font-size: 14px;
        }
        button{
            width: 120px;
            height: 35px;
            background-color: #2DBE59;
            border: none;
            border-radius: 30px;
            font-size: 14px;
            color: #fff;
            margin-top: 15px;
        }
        img{
            width: 200px;
        }
    }
</style>