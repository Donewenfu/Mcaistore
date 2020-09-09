import axios from 'axios'


axios.interceptors.response.use((response)=>{
    return response.data
})



export default function ajax(url='',params={},type='GET'){
    let promise = ''
    return new Promise((resolve,reject)=>{//get请求
        //请求方法的类型判断
        if(type.toUpperCase() == 'GET'){
            //拼接字符串name=1&age=2
            let paramsStr = ''
            //Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
            Object.keys(params).forEach((item,index)=>{
                paramsStr+=item+'='+params[item]+'&'
            })
            //截取字符串 去除最后多加的&
            if(paramsStr){
                paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'));
            }
            let gettime = new Date().getTime();
            //拼接完整路径
            url=url+'?'+paramsStr+'&itlike='+gettime
            //发起get请求
            promise = axios.get(url);

        }else if(type.toUpperCase() == 'POST'){//post请求

            promise = axios.post(url,params)
        }
        promise.then((response)=>{
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}