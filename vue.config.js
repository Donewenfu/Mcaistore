module.exports = {
    devServer: {
        open: true,
        proxy: {  //配置跨域
            // '/api': {
            //   target: 'http://api.wenfu814.xyz/web/xlmc',  
            //   changOrigin: true,  //允许跨域
            //   pathRewrite: {
            //     /* 重写路径，/api  http://demo.itlike.com/
            //      */
            //     '^/api': '' 
            //   }
            // },
            '/pay':{
                target:'http://47.98.157.152/WXPayProject/pay',
                changeOrigin:true,
                pathRewrite:{
                    '^/pay':'' 
                }
            }
          }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
                args[0].title = 'Mcaishop';
                return args;
            });
        //生产模式
        config.when(process.env.NODE_ENV === 'production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals',{
                vue:'Vue',
                'vue-router':'VueRouter',
                axios:'axios',
                moment:'moment'
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    }
}