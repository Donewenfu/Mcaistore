import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



//引入组件
import Dashboard from '@/views/dashboard/Dashboard'

//引入vuex 
import store from '@/store/index'

//因为个人中心要添加商品 使用到了发布和订阅 所以不能使用懒加载
import Home from '@/views/home/Home'

//路由懒加载
const Cart = ()=> import('@/views/cart/Cart')
// const Home = ()=> import('@/views/home/Home')
const Category = ()=> import('@/views/category/Category')
const Mine = ()=> import('@/views/mine/Mine')

//订单页面路由懒加载
const Order = ()=>import('@/views/order/Order')
//订单子路由
const Myaddrss = ()=>import('@/views/order/childrenrouter/Myaddress')
//添加地址子路由
const Addaddress = ()=>import('@/views/order/childrenrouter/sonrouter/Addaddress')
//编辑地址子路由
const Editaddress = ()=>import('@/views/order/childrenrouter/sonrouter/EditAddress')
//登录页面
const Login = ()=>import('@/views/login/Login')

//详情页面
const Detail = ()=>import('@/views/detail/Detail')

//订单详情页面
const OrderDetail = ()=>import('@/views/orderdetail/Orderdetail')


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
  },
  {
    path:'/order',
    name:'order',
    component:Order,
    children:[
      {
        path:'myaddress',
        name:'myaddress',
        component:Myaddrss,
        children:[
          {
            path:'addaddress',
            name:'addaddress',
            component:Addaddress
          },
          {
            path:'editaddress',
            name:'editaddress',
            component:Editaddress
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:Detail
  },
  {
    path:'/orderdetail',
    name:'orderdetail',
    component:OrderDetail
  }
]



const router = new VueRouter({
  routes
})


export default router


