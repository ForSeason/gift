// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Vuex from 'vuex'
import MintUI from 'mint-ui'   //ui界面
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import Viewer from 'v-viewer'   //图片预览插件
import 'viewerjs/dist/viewer.css'

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    defalutPic:'../../../static/img/default.jpg',
    logState:0,
    userinfo :{
      id:'',
      name:'',
      sex:'',
      address:'',
      pic:'',
      phone:'',
      intro:''
    },
  },
  mutations:{
    setLogState(state,logState){
      state.logState = logState;
    },
    setId(state,id){
      state.userinfo.id = id;
    },
    setName(state,name){
      state.userinfo.name = name;
    },
    setSex(state,sex){
      state.userinfo.sex = sex
    },
    setAddress(state,address){
      state.userinfo.address = address;
    },
    setPic(state,pic){
      state.userinfo.pic = pic;
    },
    setPhone(state,phone){
      state.userinfo.phone = phone;
    },
    setIntro(state,intro){
      state.userinfo.intro = intro;
    }
  }
})
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
Vue.use(MintUI);
window.Toast= Toast;
window.qs = qs;
/* eslint-disable no-new */

var app =new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if(app.$store.state.logState === 0 && to.meta.requireLogin){
    router.push("/log");
  } else {
    next();
  }
})