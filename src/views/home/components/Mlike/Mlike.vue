<template>
    <div class="mlike">
        <div class="mlike-title">
            <div class="line-title"></div>
            <h3>猜你喜欢</h3>
        </div>
        <div class="mlike-content">
            <ProductItem v-for="(product,index) in MlikeList" :key='product.id' :data='product' :typeclass='"big"' :isradius='true'></ProductItem>
        </div>
    </div>
</template>

<script>
import ProductItem from '@/components/ProductItem/ProductItem'
export default {
    data(){
        return{

        }
    },
    components:{
        ProductItem
    },
    props:{
        MlikeList:Array
    }
}
</script>

<style scoped lang='less'>
.mlike{
    padding: 8px;
    .mlike-content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .mlike-title{
        text-align: center;
        font-size: 16px;
        padding: 30px 0;
        position: relative;
       .line-title{
           width: 100%;
           height: 1px;/*no*/
           background-color: #ccc;
       }
       h3{
           background-color: #f5f5f5;
           display: inline-block;
           padding: 0 10px;
           position: absolute;
           left: 50%;
           transform: translateX(-50%);
           top: 30%;
       }
    }
}
</style>