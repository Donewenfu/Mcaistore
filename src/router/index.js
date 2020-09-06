import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入组件
import Dashboard from '@/views/dashboard/Dashboard'

//路由懒加载
const Cart = ()=> import('@/views/cart/Cart')
const Home = ()=> import('@/views/home/Home')
const Category = ()=> import('@/views/category/Category')
const Mine = ()=> import('@/views/mine/Mine')


const routes = [
  {
    path:'/',
    redirect:'/dashboard'
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component:Dashboard,
    children:[
      {
        path:'/dashboard',
        redirect:'/dashboard/home'
      },
      {
        path:'cart',
        name:'cart',
        component:Cart
      },
      {
        path:'home',
        name:'home',
        component:Home,
        meta:{
          keepAlive:true
        }
      },
      {
        path:'category',
        name:'category',
        component:Category,
        meta:{
          keepAlive:true
        }
      },
      {
        path:'mine',
        name:'mine',
        component:Mine
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
