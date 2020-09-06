<template>
    <div class="mnav">
        <ul>
            <li v-for="(mnav,index) in MnavList" :key="mnav.cid">
                <img :src="mnav.icon_url" alt="">
                <router-link to=''>{{mnav.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    computed: {
        
    },
    props:{
        MnavList:Array
    }
}
</script>

<style scoped lang='less'>
.mnav{
    background-color: #fff;
    padding: 10px 0;
    margin-top: 10px;
    margin-bottom: 10px;
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        li{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 20%;
            text-align: center;
            margin-top: 10px;
            img{
                width: 70%;
            }
            a{
                font-size: 12px;
                margin-top: 5px;
                color: #4F4F4F;
            }
        }
    }
}
</style>