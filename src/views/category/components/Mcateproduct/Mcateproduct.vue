<template>
    <div class="mcateproduct">
        <div class="inner-mproduct" v-for="(pitem,index) in cateproduct" :key="pitem.id">
            <div class="mproduct-title">
            <p>{{pitem.name}}</p>
        </div>
        <Mitem :productlist='pitem.products'></Mitem>
        </div>
        
    </div>
</template>

<script>
//引入单个商品的组件
import Mitem from '../Mitem/Mitem'
export default {
    data(){
        return{

        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    props:{
        cateproduct:Array
    },
    components:{
        Mitem
    }
}
</script>

<style scoped lang='less'>
    .mcateproduct{
        width: 100%;
        border-bottom: 1px solid #E6E6E6;/*no*/
        background-color: #fff;
        // padding: 8px;
        box-sizing: border-box;
        .mproduct-title{
            p{
                font-size: 14px;
                color: #666;
                background-color: #f6f6f4;
                padding: 3px 3px 3px 10px;
            }
        }
       
        
    }
</style>