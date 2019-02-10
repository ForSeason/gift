import Vue from 'vue'
import Router from 'vue-router'
import logchoose from '@/components/login/logchoose.vue'
import firstPage from '@/components/firstpage/page.vue'
import register from '@/components/login/register.vue'
import self from '@/components/self/self.vue'
import assign from '@/components/assign/assign.vue'

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
    
  ]
})
