import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import ChannelApplication from '@/components/ApplicationChannel/ChannelApplication'
import Tips from '@/components/ApplicationChannel/Tips'
import ApplicationEntrance from '@/components/ApplicationEntrance'
import HomePage from '@/components/HomePage'
import Enterprise from '@/components/Entrance/Enterprise'
import Personal from '@/components/Entrance/Personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/ApplicationEntrance',
          name: 'ApplicationEntrance',
          component: ApplicationEntrance,
          children: [
            {
              path: '/ApplicationEntrance/Enterprise',
              name: 'Enterprise',
              component: Enterprise
            },
            {
              path: '/ApplicationEntrance/Personal',
              name: 'Personal',
              component: Personal
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ChannelApplication',
      name: 'ChannelApplication',
      component: ChannelApplication
    },
    {
      path: '/Tips',
      name: 'Tips',
      component: Tips
    }
    // {
    //   path: '/ApplicationEntrance',
    //   name: 'ApplicationEntrance',
    //   component: ApplicationEntrance
    // }
  ]
})
