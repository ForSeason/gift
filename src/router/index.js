import Vue from 'vue'
import Router from 'vue-router'
const logchoose = () => import( '@/components/login/logchoose.vue')
//import firstPage from '@/components/firstpage/page.vue'
const firstPage = () => import('@/components/firstpage/page.vue')
const register = () => import('@/components/login/register.vue')
const self = () => import('@/components/self/self.vue')
const detail = () => import('@/components/self/detail.vue')
const assign = () => import('@/components/assign/assign.vue')
const result = () => import('@/components/firstpage/result.vue')
const chat = () => import('@/components/chat/chat.vue')
const chatList = () => import('@/components/chat/chatlist.vue')
// import register from '@/components/login/register.vue'
// import self from '@/components/self/self.vue'
// import detail from '@/components/self/detail.vue'
// import assign from '@/components/assign/assign.vue'
// import result from '@/components/firstpage/result.vue'
// import chat from '@/components/chat/chat.vue'
// import chatList from '@/components/chat/chatlist.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: firstPage
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/log',
      name: 'logchoose',
      component: logchoose
    },
    {
      path: '/self',
      name: 'self',
      component: self,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/assign',
      name: 'assign',
      component: assign,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/result',
      name: 'result',
      component: result
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/chatList',
      name: 'chatList',
      component: chatList,
      meta: {
        requireLogin: true,
      },
    }
    
  ]
})
