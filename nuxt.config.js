const config = require("./util/serverConfig");
const nuxtPageCache = require("./util/pageCache");
const LRU = require("lru-cache");
const publicPath = "/m_static/";
module.exports = {
  mode: "universal",
  server: {
    port: config.PORT, // default: 3000
    host: config.HOST // default: localhost
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "【铁甲二手机】-买卖二手挖掘机、二手工程车及二手工程机械交易平台",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, height=device-height, maximum-scale=1.0,initial-scale=1.0, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: "铁甲二手机包括二手挖掘机、二手装载机、二手泵车交易信息，并涵盖二手挖掘机价格、个人买卖、市场行情、出售、转让、求购等交易信息，更多二手工程车交易信息尽在铁甲二手机"
      },
      {
        name:"format-detection",
        content:"telephone=no"
      },
      {
        'http-equiv':"x-rim-auto-match",
        content:"telephone=none"
      },
      {
        name:"applicable-device",
        content:"mobile"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // {
      //   rel: "apple-touch-icon-precomposed",
      //   sizes: "57x57",
      //   href: "https://m.tiebaobei.com/res/img/apple-touch-icon-57.png"
      // },
      // {
      //   rel: "apple-touch-icon-precomposed",
      //   sizes: "72x72",
      //   href: "https://m.tiebaobei.com/res/img/apple-touch-icon-72.png"
      // },
      // {
      //   rel: "apple-touch-icon-precomposed",
      //   sizes: "114x114",
      //   href: "https://m.tiebaobei.com/res/img/apple-touch-icon-114.png"
      // }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#486cdc" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/global/common.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/shence.js",
      ssr: false
    },
    {
      src: "~/plugins/lazyload.js",
      ssr: false
    },
    {
      src: "~/plugins/global.js",
      ssr: false
    }
    // {
    //   src: '~/plugins/vant.js',
    //   ssr: false,
    // },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/component-cache",
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],
  render: {
    bundleRenderer: {
      cache: new LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    },
    resourceHints: false
  },
  serverMiddleware: [
    nuxtPageCache.cacheSeconds()
  ],
  /*
   ** Build configuration
   */
  build: {
    publicPath: publicPath,
    // cache: true,
    // parallel: true,//禁用并行计算，会影响css抽离
    cache: false,
    parallel: false,//禁用并行计算，会影响css抽离
    extractCSS: { allChunks: true },
    //optimizeCSS: true,
    // optimization: {
    //   // runtimeChunk: "single",
    //   splitChunks: {
    //     chunks: 'all',
    //     automaticNameDelimiter: '.',
    //     cacheGroups: {
    //       //公用模块抽离
    //       common: {
    //         chunks: 'initial',
    //         minSize: 0, //大于0个字节
    //         minChunks: 2 //抽离公共代码时，这个代码块最小被引用的次数
    //       }
    //     }

    //   }
    // },
    // splitChunks: {
    //   layouts: false,
    //   pages: true,
    //   commons: true
    // },

    //   babel: {
    //     "plugins": [
    //       ['import', {
    //         libraryName: 'vant',
    //         libraryDirectory: 'es',
    //         style: true
    //       }, 'vant']
    //     ]
    // },

    // postcss: {
    //   // 添加插件名称作为键，参数作为值
    //   // 使用npm或yarn安装它们
    //   plugins: {
    //     // 通过传递 false 来禁用插件
    //     'postcss-url': false,
    //     // 'postcss-nested': {},
    //     // 'postcss-responsive-type': {},
    //     // 'postcss-hexrgba': {},
    //     // 'postcss-cssnext': {
    //     //   browsers: ['last 2 versions', '> 5%'],
    //     // }
    //   },
    //   preset: {
    //     // 更改postcss-preset-env 设置
    //     'autoprefixer': {
    //       grid: true
    //     },
    //     'postcss-pxtorem': {
    //       rootValue: 32,//结果为：设计稿元素尺寸/32，比如元素宽750px,最终页面会换算成 23.4375rem
    //       unitPrecision: 5,
    //       propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    //       selectorBlackList: [],
    //       replace: true,
    //       mediaQuery: false,
    //       minPixelValue: 0
    //     }
    //   }
    // },
    postcss: {
      plugins: {
        autoprefixer: {
          overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"]
        },
        "postcss-pxtorem": {
          rootValue: 50, //结果为：设计稿元素尺寸50，比如元素宽375px,最终页面会换算成 7.5rem
          unitPrecision: 5,
          propList: [
            "line-height",
            "letter-spacing",
            "height",
            "max-height",
            "width",
            "max-width",
            "padding",
            "padding-left",
            "padding-right",
            "padding-top",
            "padding-bottom",
            "margin",
            "margin-left",
            "margin-right",
            "margin-top",
            "margin-bottom",
            "left",
            "top",
            "right",
            "bottom",
            "background-size",
            "background",
            "font",
            "font-size",
            "text-indent"
          ],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        }
      },
      preset: {
        grid: true,
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ]
      }
    },
    loaders: {
      fontUrl: { limit: 1000 },
      imgUrl: { limit: 1000 }
    },
    router: {
      prefetchLinks: false //要全局禁用所有链接上的预取
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //     enforce: 'pre',
        //     test: /\.(js|vue)$/,
        //     loader: 'eslint-loader',
        //     exclude: /(node_modules)/,
        // })
        // config.module.rules.push({
        //     enforce: 'pre',
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        //     exclude: /(node_modules)/,
        // })
        // config.module.rules.push(
        //   {
        //     enforce: 'pre',
        //     test: /\.(png|jpe?g|gif|svg)$/,
        //     loader: 'url-loader',
        //     query: {
        //       limit: 5000, // 5KB
        //       name: 'img/[name].[hash:7].[ext]'
        //     }
        //   }
        // )
      }
    }
  }
};
