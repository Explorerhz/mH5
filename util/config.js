const BASEURL_DEV = 'http://localhost:8082';//开发接口请求域名
const BASEURL_TEST = 'http://m.test.tiebaobei.com';//测试接口请求域名
const BASEURL_ONLINE = 'https://m.tiebaobei.com';//线上接口请求域名
// const BASEURL_ONLINE_LAN = 'https://m.tiebaobei.com';//线上接口局域网ip

let BASEURL = '';
let ORIGIN = '';
let SC = 'default';
// let BASEIP = '';
//console.log("process.browser=",process.browser);
//console.log("process.env.NODE_ENV=",process.env.NODE_ENV);
// eslint-disable-next-line no-undef
if(process.browser){
    if(window.location.host === 'm.tiebaobei.com'){
        BASEURL = BASEURL_ONLINE;
        ORIGIN = BASEURL_ONLINE;
        SC = 'production';
    }else if(window.location.host === 'm.test.tiebaobei.com'){
        BASEURL = BASEURL_TEST;
        ORIGIN = BASEURL_TEST;
    }else{
        BASEURL = BASEURL_DEV;
        ORIGIN = BASEURL_TEST;
    }
}else{
    // eslint-disable-next-line no-undef
    // if(process.env.NODE_ENV == 'production'){
    //     BASEURL = BASEURL_ONLINE;
    // }else if(process.env.NODE_ENV == 'test'){
    //     BASEURL = BASEURL_TEST;
    // }else{
    //     BASEURL = BASEURL_DEV;
    // }
    BASEURL = "http://api2.test.tiebaobei.com";
}

export default {
    BASEURL:BASEURL,
    SHENCE:SC,
    ORIGIN:ORIGIN,
    TIMEOUT:10000,
    HEADERS: {
        'Content-Type': 'application/json;charset=UTF-8',
        'client':4,
        'timestamp':'',
        'appSource':'esj',
        'appType':'esj',
        'token':'',
        'sign':'',
        'distinctId':'',
        'version':'11'
    }
};