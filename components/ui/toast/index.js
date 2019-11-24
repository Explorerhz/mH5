import Vue from "vue";
import VueToast from "./toast";

let queue = [];
let multiple = false;

function createInstance() {
  if (!queue.length || multiple) {
    const toast = new (Vue.extend(VueToast))({
      el: document.createElement("div")
    });
    document.body.appendChild(toast.$el);
    queue.push(toast);
  }

  return queue[queue.length - 1];
}

function Toast(options = {}) {
  const toast = createInstance();
  Object.assign(toast, {
      ...options,
      clear(){
        toast.value = false;
        clearTimeout(toast.timer);
        queue = queue.filter(item => item !== toast);
        const parent = toast.$el.parentNode;
          if (parent) {
            parent.removeChild(toast.$el);
          }

          toast.$destroy();
      }
  });
  clearTimeout(toast.timer);
  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
    }, options.duration);
  }
  return toast;
}

Toast.show = options => {
  Toast(options);
};

Toast.hide = all => {
  if (all) {
    queue.forEach(toast => {
      toast.clear();
    });
    queue = [];
  } else if (!multiple) {
    queue[0].clear();
  } else {
    queue.shift().clear();
  }
};

Toast.install = () => {
  Vue.use(VueToast);
};

Vue.prototype.$toast = Toast;

export default Toast;
