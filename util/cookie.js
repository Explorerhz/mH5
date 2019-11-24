import Cookies from "js-cookie";

export const loginSign = "loginSign";
export const mobile = "jishou_mobile";
export const sid = "jishou_sid";
export const uid = "jishou_uid";

export function setCookies(data) {
  data = data.result;
  Cookies.set(loginSign, data.sign, {
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
  Cookies.set(mobile, data.mobile, {
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
  Cookies.set(sid, data.sessionId, {
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
  Cookies.set(uid, data.id, {
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });
}

export function parseCookie(cookie){
    let Cookies = {};
    cookie && cookie.split(';').forEach(function( Cookie ) {
        let parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });

    return Cookies;
}

export function getValue(key){
  let value = Cookies.get(key);
  return value ? value : '';
}
