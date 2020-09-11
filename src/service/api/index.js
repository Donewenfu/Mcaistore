import ajax from './ajax'



//定义基础路径
const Base_url = 'http://api.wenfu814.xyz/web/xlmc';

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

//获取购物车数据
export const getcartData = (id)=>ajax(Base_url+'/api/cart/search/'+id)

//修改购物车数量
export const cartnummodif = (user_id,goods_id,type)=>ajax(Base_url+'/api/cart/num',{user_id,goods_id,type},'POST')

//删除购物车数据
export const deletecart  = (user_id)=>ajax(Base_url+'/api/cart/clear/'+user_id)

//单个商品的选中和取消选中
export const singerGoodsSelect = (user_id, goods_id)=>ajax(Base_url + '/api/cart/singer_select', {user_id, goods_id}, 'POST');

// 所有商品的选中和取消选中
export const allGoodsSelect = (user_id, flag)=>ajax(Base_url + '/api/cart/all_select', {user_id, flag}, 'POST');

// 删除已经生成订单的商品
export const delAllSelectedGoods = (user_id) => ajax(Base_url+ '/api/cart/del_checked/'+ user_id);

// 4. 地址接口

// 4.1 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(Base_url+ '/api/address/search/'+ user_id);

// 4.2 添加新的地址
export const addUserAddress = ( user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(Base_url + '/api/address/add', {user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

// 4.3 编辑用户的地址
export const changeUserAddress = ( address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(Base_url + '/api/address/edit', {address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

// 4.4 删除用户的地址
export const delUserAddress = (address_id) => ajax(Base_url+ '/api/address/del/'+ address_id);

// 4.5 获取单条地址
export const getCurrentUserAddress = ( user_id, address_id)=>ajax(Base_url + '/api/address/one', {user_id, address_id}, 'POST');

// 5.1 提交订单
export const postOrder = ( user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price)=>ajax(Base_url + '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST');

// 5.3 查询订单
export const getOrder = (user_id, status)=>ajax(Base_url + '/api/order/get', {user_id, status}, 'POST'); // pay will