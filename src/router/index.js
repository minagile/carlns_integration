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
import NDetailC from '@/components/NotPass/NDetailC'
import NDetailP from '@/components/NotPass/NDetailP'
import CenDetailC from '@/components/Center/CenDetailC'
import CenDetailP from '@/components/Center/CenDetailP'
import NotThrough from '@/components/NotThrough'
import RetreatCenter from '@/components/RetreatCenter'
import ChannelManagement from '@/components/ChannelManagement'
import DecisionSupport from '@/components/DecisionSupport'
import AccountManagement from '@/components/AccountManagement'
// 后台管理
import Home from '@/managementSystem/HomePage'
import AllChannels from '@/managementSystem/AllChannels'
import Obligations from '@/managementSystem/Obligations'
import Amortized from '@/managementSystem/Amortized'
import Surrender from '@/managementSystem/Surrender'
import SurrenderA from '@/managementSystem/surrender/SurrenderA'
import Trench from '@/managementSystem/Trench'
import Port from '@/managementSystem/Port'
import System from '@/managementSystem/System'
import Rote from '@/managementSystem/System/Rote'
import ChangeFile from '@/managementSystem/System/ChangeFile'
import Jurisdiction from '@/managementSystem/System/Jurisdiction'
import Journal from '@/managementSystem/System/Journal'
import AuditC from '@/managementSystem/home/AuditC'
import AuditP from '@/managementSystem/home/AuditP'
import ObligationsP from '@/managementSystem/home/ObligationsP'
import ObligationsC from '@/managementSystem/home/ObligationsC'
import InsuranceC from '@/managementSystem/home/InsuranceC'
import InsuranceP from '@/managementSystem/home/InsuranceP'
import ChannelDetail from '@/managementSystem/channel/ChannelDetail'
import MLogin from '@/managementSystem/MLogin'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
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
          component: NotThrough,
          children: [
            {
              path: '/NotThrough/NDetailC',
              name: 'NDetailC',
              component: NDetailC
            },
            {
              path: '/NotThrough/NDetailP',
              name: 'NDetailP',
              component: NDetailP
            }
          ]
        },
        // 退保中心
        {
          path: '/RetreatCenter',
          name: 'RetreatCenter',
          component: RetreatCenter,
          children: [
            {
              path: '/RetreatCenter/CenDetailC',
              name: 'CenDetailC',
              component: CenDetailC
            },
            {
              path: '/RetreatCenter/CenDetailP',
              name: 'CenDetailP',
              component: CenDetailP
            }
          ]
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
      path: '/',
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
        // 全部渠道
        {
          path: '/m/AllChannels',
          name: 'AllChannels',
          component: AllChannels
        },
        {
          path: '/m/Obligations',
          name: 'Obligations',
          component: Obligations
        },
        {
          path: '/m/Amortized',
          name: 'Amortized',
          component: Amortized
        },
        {
          path: '/m/Surrender',
          name: 'Surrender',
          component: Surrender
        },
        {
          path: '/m/SurrenderA',
          name: 'SurrenderA',
          component: SurrenderA
        },
        {
          path: '/m/Trench',
          name: 'Trench',
          component: Trench
        },
        {
          path: '/m/Port',
          name: 'Port',
          component: Port
        },
        // 系统
        {
          path: '/m/System',
          name: 'System',
          component: System,
          children: [
            {
              path: '/m/System/Rote',
              name: 'Rote',
              component: Rote
            },
            {
              path: '/m/System/ChangeFile',
              name: 'ChangeFile',
              component: ChangeFile
            },
            {
              path: '/m/System/Jurisdiction',
              name: 'Jurisdiction',
              component: Jurisdiction
            },
            {
              path: '/m/System/Journal',
              name: 'Journal',
              component: Journal
            }
          ]
        },
        // 企业待审核
        {
          path: '/m/AuditC',
          name: 'AuditC',
          component: AuditC
        },
        // 个人待审核
        {
          path: '/m/AuditP',
          name: 'AuditP',
          component: AuditP
        },
        // 个人待付款
        {
          path: '/m/ObligationsP',
          name: 'ObligationsP',
          component: ObligationsP
        },
        // 企业待付款
        {
          path: '/m/ObligationsC',
          name: 'ObligationsC',
          component: ObligationsC
        },
        {
          path: '/m/InsuranceC',
          name: 'InsuranceC',
          component: InsuranceC
        },
        {
          path: '/m/InsuranceP',
          name: 'InsuranceP',
          component: InsuranceP
        },
        {
          path: '/m/ChannelDetail',
          name: 'ChannelDetail',
          component: ChannelDetail
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
