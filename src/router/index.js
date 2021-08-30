import Vue from 'vue'
import Router from 'vue-router'
import Core from '@/components/Core'
import System from '@/components/System'
import Master from '@/components/Master'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '*',
    component: Core.Login
  },
  {
    path: '/Core/LoginFailed',
    name: 'LoginFailed',
    component: Core.LoginFailed
  },
  {
    path: '/Core/Login',
    name: 'Login',
    component: Core.Login
  },
  {
    path: '/Core/Home',
    name: 'Home',
    component: Core.Home
  },
  {
    path: '/Master/CustomField',
    name: 'CustomField',
    component: Master.CustomField
  },
  {
    path: '/Master/Flow',
    name: 'Flow',
    component: Master.Flow
  },
  {
    path: '/Master/FlowStep',
    name: 'FlowStep',
    component: Master.FlowStep
  },
  {
    path: '/Master/RegisterAdd',
    name: 'RegisterAdd',
    component: Master.RegisterAdd
  },
  {
    path: '/Master/JobQrCode',
    name: 'JobQrCode',
    component: Master.JobQrCode
  },
  {
    path: '/System/User',
    name: 'User',
    component: System.User
  },
  {
    path: '/System/UserTypeGroup',
    name: 'UserTypeGroup',
    component: System.UserTypeGroup
  },
  {
    path: '/System/Menu',
    name: 'Menu',
    component: System.Menu
  },
  {
    path: '/System/Privacy',
    name: 'Privacy',
    component: System.Privacy
  },
  {
    path: '/System/PrivacyCheck',
    name: 'PrivacyCheck',
    component: System.PrivacyCheck
  },
  {
    path: '/System/Running',
    name: 'Running',
    component: System.Running
  },
  {
    path: '/System/Token',
    name: 'Token',
    component: System.Token
  }
  ]
})
