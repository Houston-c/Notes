const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// externals中进行声明，key为引入的包名，value为全局变量名
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  'vant': 'vant',
  'dhtmlx-gantt': 'gantt',
  // 'echarts': 'echarts',
}
const cdnurl = 'http://bim.checc.com.cn/baisha/staticfile/'
const cdn = {
  dev: {
    css: [],
    js: [],
  },
  build: {
    css: [
      cdnurl + 'element/index.css',
      cdnurl + 'vant/index.css',
      cdnurl + 'dhtmlxgantt/dhtmlxgantt.css',
    ],
    js: [
      cdnurl + 'vue/vue.min.js',
      cdnurl + 'vue/vue-router.min.js',
      cdnurl + 'vue/vuex.min.js',
      cdnurl + 'axios/axios.min.js',
      cdnurl + 'element/index.js',
      cdnurl + 'vant/vant.min.js',
      cdnurl + 'dhtmlxgantt/dhtmlxgantt.js',
    ],
  },
}

module.exports = {
  publicPath: isProduction ? '/yhgl/duxiang/' : '/',
  assetsDir: 'static',
  outputDir: 'duxiang',
  transpileDependencies:['vue-pdf'],
  configureWebpack: config => {
    if (isProduction) {
      Object.assign(config, {
        externals: externals,
      })
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'],
            },
            output: {
              comments: false,
            },
          },
          sourceMap: true,
          parallel: true,
        }),
      )
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          //配置参数详解
          // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
          // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
          // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
          // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
          // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
      )
      if (process.env.npm_config_report) {
        config.plugins.push(new BundleAnalyzerPlugin(
          {
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'gzipped',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          },
        ))
      }
    } else {
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  css: {
    // extract: true,
    sourceMap: true,
    modules: false,
    loaderOptions: {},
  },
  lintOnSave: true,
  productionSourceMap: true,
  devServer: {
    disableHostCheck: true,
    port: 8080,
    open: true,
    proxy: {
      // 都香代理
      "/zyplatform/": {
        target: "http://bim.checc.com.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/zyplatform": "/"
        }
      },
      // 广连5标段代理
      // '/phpoa': {
      //   target: 'http://gl5.checcbim.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/phpoa': ''
      //   }
      // },
      // 都香标段
      // '/phpoa': {
      //   target: 'http://duxiang.checcbim.com:8084',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/phpoa': ''
      //   }
      // },
      '/ysy': {
        target: 'https://open.ys7.com',
        changeOrigin: false,
        pathRewrite: {
          '^/ysy': '/',
        },
      },
        '/phpoasafe': {
            target: 'http://duxiang.checcbim.com:11000',
            changeOrigin: true,
            pathRewrite: {
                '^/phpoasafe': '/',
            },
        },
    },
  },
}
