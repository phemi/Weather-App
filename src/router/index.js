import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Location from '@/components/Location'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search,
      props: true
    },
    {
      path: '/weather/:woeid',
      name: 'Location',
      component: Location,
      props: true
    }
  ]
})
