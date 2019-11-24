import Vue from "vue";
import VueDialog from "./dialog";

let instance;

function isInDocument(element) {
    return document.body.contains(element);
  }
  
  function initInstance() {
    if (instance) {
      instance.$destroy();
    }
    instance = new (Vue.extend(VueDialog))({
      el: document.createElement('div'),
    });

    document.body.appendChild(instance.$el);
  }

function Dialog(options){
    return new Promise((resolve, reject) => {
        if (!instance || !isInDocument(instance.$el)) {
          initInstance();
        }
    
        Object.assign(instance, Dialog.defaultOptions, options, {
          resolve,
          reject
        });
      });
}

Dialog.defaultOptions = {
    value: true,
    title: '',
    message: ''
}

Dialog.install = () => {
  Vue.use(VueDialog);
};

Dialog.alert = Dialog;

Dialog.confirm = options => Dialog({
  showCancelButton: true,
  ...options
});

Dialog.close = () => {
    if (instance) {
      instance.value = false;
    }
  };

Vue.prototype.$dialog = Dialog;

export default Dialog;