module.exports = {
    devServer: {
        open: true,
        proxy: {  //配置跨域
            '/api': {
              target: 'http://api.wenfu814.xyz/web/xlmc',  
              changOrigin: true,  //允许跨域
              pathRewrite: {
                /* 重写路径，/api
                 */
                '^/api': '' 
              }
            },
          }
    },
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = 'Mcaishop';
                return args;
            });
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