import Vue from 'vue'

Vue.filter('moneyformat',(value)=>{
    return '￥' + value
})