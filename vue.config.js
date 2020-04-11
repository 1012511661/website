module.exports = {
    // 基本路径
    publicPath: '/',
    outputDir: 'dist',   //输出文件目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        // open: true, //是否自动弹出浏览器页面
        // host: "localhost",
        // port: '9999',
        // https: false,   //是否使用https协议
        // hotOnly: false, //是否开启热更新
        // proxy: {
        //     '/api': {
        //         target: 'http://39.101.203.68:8082/ws', //API服务器的地址 //http://10.0.5.158:8082/ws 39.101.203.68:8082
        //         ws: true,  //代理websockets
        //         changeOrigin: true, // 虚拟的站点需要更管origin
        //         pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //             '^/api': ''
        //         }
        //     }
        // }
    },
    // 输出文件目录
    productionSourceMap: false
}