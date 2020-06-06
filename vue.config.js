const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'client/main.js'
        }
    },
    chainWebpack: (config) => {
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('client'))
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8081",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^api': ''
                }
            }
        }
    }
}
