import ajax from './ajax'

// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail

//定义基础路径
const Base_url = 'http://demo.itlike.com/web/xlmc';

export const getHomeData = ()=>ajax(Base_url+'/api/homeApi');

//分类列表数据
export const getCategoryData = ()=>ajax(Base_url+'/api/homeApi/categories');

//分类产品的数据
export const getCategoryproduct = (params)=>ajax(Base_url+'/api/homeApi/categoriesdetail'+params)