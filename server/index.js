const express = require('express')
const consola = require('consola')
//const compression =require('compression');
const { Nuxt, Builder } = require('nuxt')
const app = express()
const proxyMiddleWare = require("http-proxy-middleware");
const os = require('os');
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
// consola.log(process)
config.dev = process.env.NODE_ENV === 'development'
config.env.NODE_ENV = process.env.NODE_ENV;
console.log("process.browser=",process.browser);
console.log("process.env.NODE_ENV===",process.env.NODE_ENV);

const routerExp = /^\/ue\/.+\.html$/;
const router_ = [
  '/',
  '/m_static'
];

function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}


async function start() {

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  //gzip
  //app.use(compression());

  let proxyPath = '';
  let proxyPathOld = '';
  // Build only in dev mode
  if (config.dev) {
    proxyPath = 'https://api2.tiebaobei.com';
    // proxyPath = 'http://api2.test.tiebaobei.com';
    // proxyPath = 'http://api2.tiebaobei.com';
    //proxyPath = 'http://192.168.55.108:8081';
    proxyPathOld = 'http://oldmtest.tiebaobei.com/';
    const builder = new Builder(nuxt)
    await builder.build()
  } else if(process.env.NODE_ENV === "test") {
    proxyPath = "http://api2.test.tiebaobei.com";
    proxyPathOld = 'http://oldmtest.tiebaobei.com/';
    await nuxt.ready()
  } else {
    proxyPath = 'https://api2.tiebaobei.com';
    proxyPathOld = 'http://oldm.tiebaobei.com/';
    //proxyPath = 'http://www.tiebaobei.com';
    await nuxt.ready()
  }

//   app.use(function(req, res, next) {
//     // console.log(req.url);
//     if (req.url == '/abc') {
//       req.url = '/ue/parameter/1139046-5681';
//       // req.pathname = '/ue/parameter/1139046-5681';
//       req.originalUrl = '/ue/parameter/1139046-5681';
//       req.path = '/ue/parameter/1139046-5681';
//       req.route = '/ue/parameter/1139046-5681';
//       req.baseUrl = '/ue/parameter/1139046-5681';

//       // req.url = '/html/member.html'
//     }
//     next();
//  });

  // app.use('/abc', (req, res, next) => {
  //   // console.log(req.url);
  //   req.url = '/abc1';
  //   console.log("ok1");
  //   next();
  //   // res.redirect(301, '/abc1');
  // });

  // app.use('/bbc1', (req, res, next) => {
  //   console.log("ok2");
  //   res.send("ok");
  // });


  app.use('/', (req, res, next) => {
  //   // 添加响应头
  //   res.setHeader("Access-Control-Allow-Origin", "*");
    req.url = req.url.replace(/\/{2,}/g,'/');
    //consola.log("req.url=",req.url);
    next();
  });


  const proxyOption0 ={target:'https://m.cehome.com', changeOrigin: true};
  app.use("/zhengji",proxyMiddleWare(proxyOption0));//http://h5.biebaobei.com/api/....


  const proxyOption ={target:proxyPath, changeOrigin: true};
  app.use("/api",proxyMiddleWare(proxyOption));//http://h5.biebaobei.com/api/....

  // app.use("/gobd", (req, res) => {
  //   res.redirect('http://www.baidu.com');
  // });

  const filter = function(pathname, req) {
      // console.log("pathname=", pathname, req.path, req.headers['referer']);
      // console.log("pathname==", pathname);
      // console.log(req.originalUrl); // '/admin/new'
      // console.log(req.baseUrl); // '/admin'
      // console.log(req.path); // '/new'
      // console.log(req.params.name);

      // let name = pathname;
      if(pathname == '/favicon.ico'){
        return false;
      }
      if(pathname.includes('m_static')){
        // console.log("m_static ok");
        return false;
      }
      if(pathname==="/"){
        // console.log("/ ok");
        return false;
      }
      if(/^\/abc\/\d+/.test(pathname)){
        // console.log("/ ok");
        return false;
      }
      if(/^\/abc\/[A-Za-z]+/.test(pathname)){
        // console.log("/ ok");
        return false;
      }
      // if(pathname.includes('/ue')){
      //   // console.log("/ ok");
      //   return false;
      // }
      if(pathname.includes('/ue/preview')){
        // console.log("/ ok");
        return false;
      }
      if(pathname.includes('/ue/parameter')){
        // console.log("/ ok");
        return false;
      }
      if(pathname.includes('/ue/complaint')){
        // console.log("/ ok");
        return false;
      }
      if(routerExp.test(pathname)){
        // console.log("详情页 ok");
        return false;
      }
      if(pathname.includes('__webpack_hmr')){
        // console.log("__webpack_hmr ok");
        return false;
      }
      return true;
  }

  app.use("*", proxyMiddleWare(filter,{ target: proxyPathOld, changeOrigin: true }))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)

  // console.log("process.env.NODE_ENV=", process.env.NODE_ENV);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  if (config.dev) {
    consola.ready({
      message: `Server listening on http://${getIPAdress()}:${port}`,
      badge: true
    })
  }
}

start();
