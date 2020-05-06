

module.exports = {
        devServer: {
                port: '8081',
                open: true,
                proxy: {
                        '/api': {
                                target: 'http://localhost:3000/', // 目标接口的域名
                                // secure: true,  // https 的时候 使用该参数
                                changeOrigin: true,  // 是否跨域
                                pathRewrite: {
                                        '^/api': ''  // 重写路径
                                }
                        }
                }
        }
}