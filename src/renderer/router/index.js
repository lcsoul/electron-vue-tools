import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: require('@/router/page/index').default
    },
    // {
    //   path: '/',
    //   name: '首页',
    //   component: require('@/components/Index').default
    // },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
