import ajax from './ajax'

// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail

//定义基础路径
const Base_url = '/api';

export const getHomeData = ()=>ajax(Base_url+'/api/homeApi');

//分类列表数据
export const getCategoryData = ()=>ajax(Base_url+'/api/homeApi/categories');

//分类产品的数据
export const getCategoryproduct = (params)=>ajax(Base_url+'/api/homeApi/categoriesdetail'+params)

//获取验证码
export const getmessagecode = (phone)=>ajax(Base_url+'/api/send_code',{phone});

//手机验证码登录
export const loginphonecode = (phone,code)=>ajax(Base_url+'/api/login_code',{phone,code},'post')

//退出登录
export const loginout = ()=>ajax(Base_url+'/api/logout')

//自动登录
export const autologin =()=>ajax(Base_url+'/api/userinfo')

//商品详情页
export const detailinfo = (id)=>ajax(Base_url+'/api/detail'+id)

//新增商品到购物车  goods_id: String, goods_name: String, goods_price: Number, small_image:String
export const addproductadd = (user_id,goods_id,goods_name,goods_price,small_image)=>ajax(Base_url+'/api/cart/add',{user_id,goods_id,goods_name,goods_price,small_image},'POST')