import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import ChannelApplication from '@/components/ApplicationChannel/ChannelApplication'
import Tips from '@/components/ApplicationChannel/Tips'
import HomePage from '@/components/HomePage'
import ApplicationEntrance from '@/components/ApplicationEntrance'
import Enterprise from '@/components/Entrance/Enterprise'
import Personal from '@/components/Entrance/Personal'
import StayByStage from '@/components/StayByStage'
import DetailC from '@/components/Stay/DetailC'
import DetailP from '@/components/Stay/DetailP'
import AlreadyByStage from '@/components/AlreadyByStage'
import ADetailC from '@/components/Already/ADetailC'
import ADetailP from '@/components/Already/ADetailP'
import NotThrough from '@/components/NotThrough'
import RetreatCenter from '@/components/RetreatCenter'
import ChannelManagement from '@/components/ChannelManagement'
import DecisionSupport from '@/components/DecisionSupport'
import AccountManagement from '@/components/AccountManagement'
import Home from '@/managementSystem/HomePage'
import System from '@/managementSystem/System'
import AllChannels from '@/managementSystem/AllChannels'
import AuditC from '@/managementSystem/home/AuditC'
import AuditP from '@/managementSystem/home/AuditP'
import ObligationsP from '@/managementSystem/home/ObligationsP'
import ObligationsC from '@/managementSystem/home/ObligationsC'
import MLogin from '@/managementSystem/MLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        // 首页
        {
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage
        },
        // 申请入口
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
        },
        // 待分期
        {
          path: '/StayByStage',
          name: 'StayByStage',
          component: StayByStage,
          children: [
            {
              path: '/StayByStage/DetailC',
              name: 'DetailC',
              component: DetailC
            },
            {
              path: '/StayByStage/DetailP',
              name: 'DetailP',
              component: DetailP
            }
          ]
        },
        // 已分期
        {
          path: '/AlreadyByStage',
          name: 'AlreadyByStage',
          component: AlreadyByStage,
          children: [
            {
              path: '/AlreadyByStage/ADetailC',
              name: 'ADetailC',
              component: ADetailC
            },
            {
              path: '/AlreadyByStage/ADetailP',
              name: 'ADetailP',
              component: ADetailP
            }
          ]
        },
        // 未通过
        {
          path: '/NotThrough',
          name: 'NotThrough',
          component: NotThrough
        },
        // 退保中心
        {
          path: '/RetreatCenter',
          name: 'RetreatCenter',
          component: RetreatCenter
        },
        // 渠道管理
        {
          path: '/ChannelManagement',
          name: 'ChannelManagement',
          component: ChannelManagement
        },
        // 决策支持
        {
          path: '/DecisionSupport',
          name: 'DecisionSupport',
          component: DecisionSupport
        },
        // 账号管理
        {
          path: '/AccountManagement',
          name: 'AccountManagement',
          component: AccountManagement
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
    },
    {
      path: '/m',
      name: 'Home',
      component: Home,
      children: [
        // 系统
        {
          path: '/m/System',
          name: 'System',
          component: System
        },
        // 全部渠道
        {
          path: '/m/AllChannels',
          name: 'AllChannels',
          component: AllChannels
        },
        // 企业待审核
        {
          path: '/m/AuditC',
          name: 'AuditC',
          component: AuditC
        },
        {
          path: '/m/AuditP',
          name: 'AuditP',
          component: AuditP
        },
        {
          path: '/m/ObligationsP',
          name: 'ObligationsP',
          component: ObligationsP
        },
        {
          path: '/m/ObligationsC',
          name: 'ObligationsC',
          component: ObligationsC
        }
      ]
    },
    {
      path: '/MLogin',
      name: 'MLogin',
      component: MLogin
    }
  ]
})
