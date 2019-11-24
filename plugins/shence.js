import config from "@/util/config";

(function(para) {
  var p = para.sdk_url,
    n = para.name,
    w = window,
    d = document,
    s = "script",
    x = null,
    y = null;
  w["sensorsDataAnalytic201505"] = n;
  w[n] =
    w[n] ||
    function(a) {
      return function() {
        (w[n]._q = w[n]._q || []).push([a, arguments]);
      };
    };
  // var ifs = [ 'track', 'quick', 'register', 'registerPage', 'registerOnce',
  // 		'clearAllRegister', 'trackSignup', 'trackAbtest', 'setProfile',
  // 		'setOnceProfile', 'appendProfile', 'incrementProfile',
  // 		'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout' ];

  var ifs = [
    "track",
    "quick",
    "register",
    "registerPage",
    "registerOnce",
    "clearAllRegister",
    "trackSignup",
    "trackAbtest",
    "setProfile",
    "setOnceProfile",
    "appendProfile",
    "incrementProfile",
    "deleteProfile",
    "unsetProfile",
    "identify",
    "login",
    "logout",
    "trackLink",
    "clearAllRegister",
    "getAppStatus"
  ];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    (x = d.createElement(s)), (y = d.getElementsByTagName(s)[0]);
    x.async = 1;
    x.src = p;
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }
})({
  sdk_url: "https://static.sensorsdata.cn/sdk/1.8.1.5/sensorsdata.min.js",
  // sdk_url : window.location.protocol+"//"+window.location.host+'/js/sensorsdata.min.js',
  name: "sa",
  show_log: config.SHENCE == "default",
  // server_url : 'http://shenceapi.tiebaobei.com/sa?project=default'
  server_url: "https://shenceapi.tiebaobei.com/sa?project=" + config.SHENCE
  //max_referrer_string_length: 1000
});

console.log("config.SHENCE=", config.SHENCE, config.SHENCE == "default");

// sa.quick('autoTrack');

//获取url中key对应的value值（解析中文）
function getQueryStringBack(name, b) {
  //var url = decodeURIComponent(document.referrer);
  var url = decodeURIComponent(b);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (url.split("?")[1]) {
    var r = url.split("?")[1].match(reg);
    if (r != null) return unescape(r[2]);
  }
  return null;
}
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
function ajaxJsonp(params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : json(params);
  // jsonp请求
  function jsonp(params) {
    //创建script标签并加入到页面中
    var callbackName = params.jsonp;
    var head = document.getElementsByTagName("head")[0];
    // 设置传递给后台的回调参数名
    params.data["callback"] = callbackName;
    var data = formatParams(params.data);
    var script = document.createElement("script");
    head.appendChild(script);
    //创建jsonp回调函数
    window[callbackName] = function(json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };
    //发送请求
    script.src = params.url + "?" + data;
    //为了得知此次请求是否成功，设置超时处理
    if (params.time) {
      script.timer = setTimeout(function() {
        window[callbackName] = null;
        head.removeChild(script);
        params.error &&
          params.error({
            message: "超时"
          });
      }, time);
    }
  }
  //格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    // 添加一个随机数，防止缓存
    arr.push("v=" + random());
    return arr.join("&");
  }
  // 获取随机数
  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}

if (window.location.host == "m.tiebaobei.com") {
  var apihost = "https://api2.tiebaobei.com/api/app/";
} else {
  var apihost = "http://api2.test.tiebaobei.com/api/app/";
}

if (
  document.referrer.indexOf("baidu") != -1 &&
  document.referrer.indexOf("wd=") != -1 &&
  document.referrer.indexOf("eqid=") != -1
) {
  if (
    !(
      window.location.href == config.ORIGIN + "/" ||
      window.location.href.indexOf("/ue/") != -1 ||
      window.location.href.indexOf("/uesearch/") != -1 ||
      window.location.href.indexOf("/zhuanti/") != -1 ||
      window.location.href.indexOf("/similarity") != -1 ||
      window.location.href.indexOf("/baike.html") != -1 ||
      window.location.href.indexOf("/baikeDetail.html") != -1 ||
      window.location.href.indexOf("/message.html") != -1
    )
  ) {
    ajaxJsonp({
      url: apihost + "baiduyun/decode", // 请求地址
      jsonp: "jsonpCallback", // 采用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串
      data: { eqid: getQueryStringBack("eqid", document.referrer) }, // 传输数据
      success: function(res) {
        //请求成功的回调函数
        //console.log(document.referrer.split('wd=')[0]+'wd='+JSON.stringify(res).split('wd=')[1].replace('}','').replace('"','')+document.referrer.split('wd=')[1])
        //console.log('hhh:'+JSON.stringify(res).split('wd=')[1].replace('}','').replace('"',''))
        //JSON.parse(result).wd
        //console.log(JSON.parse(res).wd)
        //var referrerKeyWord = document.referrer.split('wd=')[0]+'wd='+JSON.parse(res).wd+document.referrer.split('wd=')[1];
        //var referrerKeyWord = 'https://m.baidu.com/?wd='+JSON.parse(res).wd+'&eqid='+JSON.parse(res).eqid;
        var referrerKeyWord = JSON.parse(res).wd;
        if (!referrerKeyWord) {
          referrerKeyWord = "";
        }
        sa.registerPage({
          version_number: "1.0",
          app_type: "m站",
          back_url: document.referrer,
          query: referrerKeyWord,
          latest_query: referrerKeyWord
        });
        try {
          sessionStorage.setItem("ScLatestQuery", referrerKeyWord);
        } catch (e) {}
		sa.quick("autoTrack");
		console.log("autoTrack1")
      },
      error: function(error) {
        sa.registerPage({
          version_number: "1.0",
          app_type: "m站",
          back_url: document.referrer
        });
		sa.quick("autoTrack");
		console.log("autoTrack2")
      } // 请求失败的回调函数
    });
  }
} else {
  //console.log(decodeURIComponent(getCookie('sensorsdata2015jssdkcross')).split('$latest_referrer":')[1].split(',')[0] == '""')
  try {
    if (
      sessionStorage.getItem("ScLatestQuery") != null &&
      decodeURIComponent(getCookie("sensorsdata2015jssdkcross"))
        .split('$latest_referrer":')[1]
        .split(",")[0] != '""'
    ) {
      if (
        !(
          window.location.href == config.ORIGIN + "/" ||
          window.location.href.indexOf("/ue/") != -1 ||
          window.location.href.indexOf("/uesearch/") != -1 ||
          window.location.href.indexOf("/zhuanti/") != -1 ||
          window.location.href.indexOf("/similarity") != -1 ||
          window.location.href.indexOf("/baike.html") != -1 ||
          window.location.href.indexOf("/baikeDetail.html") != -1 ||
          window.location.href.indexOf("/message.html") != -1
        )
      ) {
        sa.registerPage({
          version_number: "1.0",
          app_type: "m站",
          back_url: document.referrer,
          query: "",
          latest_query: sessionStorage.getItem("ScLatestQuery")
        });
		sa.quick("autoTrack");
		console.log("autoTrack3")
      }
    } else {
      sa.registerPage({
        version_number: "1.0",
        app_type: "m站",
        back_url: document.referrer
      });
      if (
        !(
          window.location.href == config.ORIGIN + "/" ||
          window.location.href.indexOf("/ue/") != -1 ||
          window.location.href.indexOf("/uesearch/") != -1 ||
          window.location.href.indexOf("/zhuanti/") != -1 ||
          window.location.href.indexOf("/similarity") != -1 ||
          window.location.href.indexOf("/baike.html") != -1 ||
          window.location.href.indexOf("/baikeDetail.html") != -1 ||
          window.location.href.indexOf("/message.html") != -1
        )
      ) {
		sa.quick("autoTrack");
		console.log("autoTrack4")
      }
    }
  } catch (e) {
    sa.registerPage({
      version_number: "1.0",
      app_type: "m站",
      back_url: document.referrer
    });
    if (
      !(
        window.location.href == config.ORIGIN + "/" ||
        window.location.href.indexOf("/ue/") != -1 ||
        window.location.href.indexOf("/uesearch/") != -1 ||
        window.location.href.indexOf("/zhuanti/") != -1 ||
        window.location.href.indexOf("/similarity") != -1 ||
        window.location.href.indexOf("/baike.html") != -1 ||
        window.location.href.indexOf("/baikeDetail.html") != -1 ||
        window.location.href.indexOf("/message.html") != -1
      )
    ) {
	  sa.quick("autoTrack");
	  console.log("autoTrack5")
    }
  }
}

//判断微信浏览器
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function saQuickPublic(code) {
  var iswec = "";
  if (!isWeiXin()) {
    iswec = "否";
  } else {
    iswec = "是";
  }
  sa.track(code, {
    is_wechar: iswec
  });
}
