import { getValue, uid } from "./cookie";
import md5 from "js-md5";
import aesjs from "aes-js";

const KEY = "tiebaobei12345678";

export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export function timestamp() {
  let timestamp = new Date().getTime();
  return Number(timestamp / 1000).toFixed(0) + "";
}

export function token(distinctId, timestamp) {
  return md5(KEY + distinctId + timestamp.substring(6, 10));
}

export function sign(timestamp) {
  let uid_ = getValue(uid);
  let sign_ = "";
  if (uid_) {
    let textBytes = aesjs.utils.utf8.toBytes(uid_ + "&" + timestamp);
    let aesEcb = new aesjs.ModeOfOperation.ecb(KEY);
    sign_ = aesEcb.encrypt(textBytes);
  }

  return sign_;
}

export function getRandomNum(t, e) {
  var a = e - t,
    o = Math.random();
  return t + Math.round(o * a);
}

export function downApp() {
  var u = navigator.userAgent;
  if (
    u.indexOf("Android") > -1 ||
    u.indexOf("iPhone") > -1 ||
    u.indexOf("iPad") > -1 ||
    u.indexOf("iPod") > -1
  ) {
    var loadDateTime = new Date();
    window.setTimeout(() => {
      var timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime < 5000) {
        dowFn();
      } else {
        window.close();
      }
    }, 25);
    applink();
  } else {
    dowFn();
  }
}

function dowFn() {
  var u = navigator.userAgent;
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    window.location.href = "https://at.umeng.com/9TXnGD";
  } else if (u.indexOf("Android") > -1) {
    window.location.href = "https://at.umeng.com/uKvSnq";
  } else {
    window.location.href =
      "http://a.app.qq.com/o/simple.jsp?pkgname=com.cehome.tiebaobei";
  }
}
function applink() {
  // 更新进来的不走这一步
  var applinktag = "";
  if (applinktag && applinktag == "1") return;
  var ifr = document.createElement("iframe");
  var url = "tiebaobeiapp://home";
  var eqid = getQueryString("eqid");
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var appXy = "";
  var isList = getQueryString("isList") || "";
  //   var b = new Base64();
  if (
    (document.referrer.indexOf("/ue/") &&
      document.referrer.indexOf(".html") == -1) ||
    isList
  ) {
    //是列表页
    appXy = "deviceList?";
  } else {
    appXy = "home";
  }
  if (isiOS) {
    url = "tbburl://" + appXy;
  } else {
    url = "tiebaobeiapp://" + appXy;
  }
  if (eqid != null) {
    if (isiOS) {
      url =
        "tbburl://threadDetail?threadurl=" +
        h5baseUrl +
        "res/hweb/detail.html?eqId@" +
        eqid;
    } else {
      url =
        "tiebaobeiapp://threadDetail?threadurl=" +
        h5baseUrl +
        "res/hweb/detail.html?eqId=" +
        eqid +
        "&tid=0";
    }
  }
  ifr.src = url;
  //ifr.src = 'tiebaobeiapp://threadDetail?threadurl=https://m.test.tiebaobei.com/ue/wajueji/doosan_s130w-3_605322.html';
  ifr.style.display = "none";
  document.body.appendChild(ifr);
  window.setTimeout(function() {
    document.body.removeChild(ifr);
  }, 3000);
}
function getQueryString(name) {
  var url = decodeURIComponent(window.location.href);
  var reg = new RegExp("(^|&)" + name + "[=@]([^&]*)(&|$)", "i");
  if (url.split("?")[1]) {
    var r = url.split("?")[1].match(reg);
    if (r != null) return unescape(r[2]);
  }
  return null;
}
