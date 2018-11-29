import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/router/page/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
