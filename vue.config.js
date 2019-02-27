const path = require('path')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: process.env.VUE_APP_my || 'html',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  productionSourceMap: false,

  // 是否生成.map文件
  configureWebpack: config => { 
    config.devtool = 'source-map' // 调试 时需要开启
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'viser-vue': 'ViserVue',
        'ant-design-vue': 'antd',
        'moment': 'moment'
      }
      config.plugins.push(new BundleAnalyzerPlugin())// 打包显示模块依赖关系
      // config.plugins.push(new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //   threshold: 10240,
      //   minRatio: 0.8
      // }))
    }
  },
  devServer: {
    port: 8080,
    // 设置代理
    proxy: {
      '/rest': {
        target: 'http://192.168.7.174:8884/rest',
        changeOrigin: true,
        pathRewrite: {
          '^/rest': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('c', resolve('src/components'))
      .set('v', resolve('src/views'))
      .set('u', resolve('src/utils'))
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}
