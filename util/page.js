import { gps } from "../api/index";
import { getValue } from "./cookie";
export const pubDate = "2019-10-2500:00:00";

function showPosition(position) {
  console.log(
    "showPosition",
    position.coords.latitude,
    position.coords.longitude
  );
  const distinctId = sa.store.getDistinctId();
  gps({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    time: Date.now(),
    tid: getValue("jishou_uid"),
    distinct_id: distinctId,
    coordinateType: "5",
    source: "5"
  });
}
const geolocatday = "GEOLOCATION_DAY";
const geolocatstate = "GEOLOCATION_STATE"
export function gps_() {
  const day_ = localStorage.getItem(geolocatday);
  const state_ = localStorage.getItem(geolocatstate);
  const m_date = new Date();
  const geolocation_now_time = m_date.getFullYear()+""+m_date.getMonth()+""+m_date.getDate();

  if (navigator.geolocation && (day_ != geolocation_now_time || state_)) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      function(e) {
        localStorage.setItem(geolocatstate, 0);
        console.log(e.code);
      },
      {
        //超时未获取到经纬度信息  执行失败回调  (默认为5秒)
        timeout: 10000
      }
    );
  }
  localStorage.setItem(geolocatday, geolocation_now_time);
}

export function pageBack() {
  // alert('back='+window.history.length);
  if (window.history.length > 0) {
    window.history.back(-1);
  } else {
    // this.$router.push("/");
    window.location.href = "/";
  }
}

export function scrollRestoration(){
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'auto'
    })
  }
}
