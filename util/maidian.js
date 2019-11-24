//E4	首页点击	channel	App下载渠道			点击首页上的按钮时			
export function E4(page, name, cb_) {
  sa.track("E4", {
    page_name: page,
    button_name: name
  }, cb_);
}
//E5	活动点击	channel	App下载渠道	字符串		点击活动页上的按钮时			
export function E5( action_id, action_url) {
    sa.track("E5", {
        page_name: '首页',
        page_url: window.location.href,
        action_id: action_id,
        action_url: action_url
    })
}

//E4	首页点击	channel	App下载渠道			点击首页上的按钮时			
export function E124(page_name, cb_) {
  console.log(page_name);
  sa.track("E124", {
    channel: 'App下载渠道',
    page_name: page_name,
    button_name: '立即下载'
  }, cb_);
}

//E25	设备详情页点击事件											
export function E25(eq_id, page_name, button_name, cb_) {
  sa.track("E25", {
    eq_id: eq_id,
    page_name: page_name,
    button_name: button_name
  }, cb_);
}

//E26	设备详情页-点击图片											
export function E26(image_id, image_type, image_name, cb_) {
  sa.track("E26", {
    image_id: image_id,
    image_type: image_type,
    image_name: image_name
  }, cb_);
}