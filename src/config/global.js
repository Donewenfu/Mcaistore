export const isshowtop = (callback) => {
    // 2. 监听滚动
    document.addEventListener('scroll', () => {
        showTopicon();
    }, false);

    //判断滚动到哪一个距离，考虑是否显示和隐藏返回按钮
    const showTopicon = () => {
        //获取屏幕滚动高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //判断
        if (scrollTop > 200) {
            callback(true)
        } else {
            callback(false)
        }
    }

}

//本地存储
export const setLocalStorage=(name,value)=>{
    //如果没有名字就结束函数
    if(!name) return;
    //判断是否是字符串，如果不是字符串类型那么就json.stringify 
    if(typeof value !=String){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name,value)
}

//本地获取数据
export const getLocalStorage = (name)=>{
    //判断是否填入了name~key
    if(!name) return
    //通过name获取本地数据
    return window.localStorage.getItem(name)
}

//本地删除数据
export const removeLocalStorage = (name)=>{
    //判断是否有name
    if(!name) return
    //通过name删除本地数据
    window.localStorage.removeItem(name)
}