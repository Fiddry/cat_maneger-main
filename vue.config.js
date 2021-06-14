module.exports = {
    devServer: {
        // host = "localhost",
        // port = "8080",
        // https = false,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/catDB/api', //接口域名
                changeOrigin: true,             //是否跨域
                ws: true,                       //是否代理 websockets
                secure: true,                   //是否https接口
                pathRewrite: {                  //路径重置
                    '^/api': ''
                }
            }
        }
    }
};