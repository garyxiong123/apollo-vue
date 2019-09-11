'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf') // vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css,less,sass之类的和样式有关的loader
// 返回到dir为止的绝对路径

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css,less,sass之类的和样式有关的loader
module.exports = {
  context: path.resolve(__dirname, '../'),
  //入口类，  //entry告诉Webpack哪些文件是应用程序的入口点;主要文件;
  entry: {
    app: './src/main.js'
  },
  //导出地址// 配置webpack输出路径和命名规则
  output: {
    //path代表我们要输出的路径，config.build.assetsRoot里是assetsRoot: path.resolve(__dirname, '../dist')，这个是想把打包出来的文件路径放在根目录的dist目录下。
    path: config.build.assetsRoot,
    //filename: '[name].js'文件名，这个是用来打包后出的文件名，name就是入口文件前面的key值，此处是index和admin.为什么用name，因为会打包出来三个文件，第一个是源代码文件，第二个是runtime文件，第三个是ventor文件，所以每个文件打包出来的名字就跟定义的chunkname一致。
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // resolve是webpack的内置选项，也就是说当使用 import "jquery"，该如何去执行这件事
// 情就是resolve配置项要做的，import jQuery from "./additional/dist/js/jquery" 这样会很麻烦，可以起个别名简化操作
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {  //alias是配置别名，什么是别名呢，如果你在一个很深的文件引入其他文件中又一个很深的文件，
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '#': resolve('src/components'),
      /*
      相对路径会写到吐血，那用别名我们定入一个入口位置，我们用@来代替src目录的绝对路径，此时就,
      用到了上面function resolve封装的函数，此时绝对路径就定位到了src目录，因为我们所有文件
      都放在src目录下，就可以通过src目录直接定位到你想要找的文件。
      */
    }
  },
  // module配置不同类型模块的处理规则

  module: {
    rules: [
      // 对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，专门用来解析.vue文件的
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
      /*
      对图片相关的文件使用 url-loader 插件，这个插件的作用是将一个足够小的文件生成一个64位的DataURL
      可能有些老铁还不知道 DataURL 是啥，当一个图片足够小，为了避免单独请求可以把图片的二进制代码变成64位的
      */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
