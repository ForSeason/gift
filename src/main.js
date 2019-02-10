// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import global from './components/global.vue'
import qs from 'qs'
import MintUI from 'mint-ui'   //ui界面
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import Viewer from 'v-viewer'   //图片预览插件
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    inline:false,
    button:false,
    navbar:false,
    title:false,
    toolbar:false,
    tooltip:true,
    movable:true,
    zoomable:true,
    rotatable:false,
    scalable:false,
    transition:true,
    fullscreen:true,
    keyboard:false,
    loop:false,
  }
})
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
Vue.prototype.global =global;
Vue.use(MintUI);
window.Toast= Toast;
window.qs = qs;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if(global.logState === 0 && to.meta.requireLogin){
    router.push("/log");
  } else {
    next();
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
