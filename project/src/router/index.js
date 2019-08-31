import Vue from 'vue';
import Router from 'vue-router';

import Login from '../page/login/Login.vue'
import Layout from '../page/layout/layout.vue'
import RHome from '../page/admin_page/home/RHome.vue'
import CustManagement from '../page/admin_page/cust/CustManagement'
import CustEdit from '../page/admin_page/cust/CustEdit'
import prodManage from '../page/admin_page/cust/prodManage.vue'
import oweManage from '../page/admin_page/cust/oweManage.vue'
import UserManagement from '../page/admin_page/user/UserManagement'
import UserEdit from '../page/admin_page/user/UserEdit'
import OrderManage from '../page/admin_page/user/OrderManage'


import OrderSearch from '../page/admin_page/orderMgt/OrderSearch'
import OrderUpdate from '../page/admin_page/orderMgt/OrderUpdate'

import UserLayout from '../page/layout/UserLayout'
import Home from '../page/user_page/home/Home'
import Box from '../page/user_page/home/Box'
import Group from '../page/user_page/home/Group'
import ProdIntro from '../page/user_page/home/ProdIntro'
import Order from '../page/user_page/user_order/Order'
import OrderDetail from '../page/user_page/user_order/OrderDetail'
import Visual from '../page/user_page/user_visual/Visual'
import Poto from '../page/admin_page/poto/Poto'
import VisPoto from '../page/admin_page/poto/VisPoto'

Vue.use(Router);
export default new Router({
  routes:[
    {path:'/',redirect:'/layout'},///////////////////////
    {path:'/login',component:Login},
    {path:'/layout',component:Layout,
      children: [
      {
        path: 'orderUpdate',
        name: 'OrderUpdate',
        component: OrderUpdate
      },
      {
        path: 'orderSearch',
        name: 'OrderSearch',
        component: OrderSearch
      },
      {
        path: 'poto',
        name: 'Poto',
        component: Poto
      },
      {
        path: 'vispoto',
        name: 'VisPoto',
        component: VisPoto
      },
      {
        path: 'rhome',
        name: 'RHome',
        component: RHome
      },
      {
        path: 'custManage',
        name: 'CustManagement',
        component: CustManagement
      },
      {
        path: 'prodManage',
        name: 'prodManage',
        component: prodManage
      },
      {
        path: 'oweManage',
        name: 'oweManage',
        component: oweManage
      },
      {
        path: 'custEdit',
        name: 'CustEdit',
        component: CustEdit
      },
      {
        path: 'userManage',
        name: 'UserManagement',
        component: UserManagement
      },
      {
        path: 'userEdit',
        name: 'UserEdit',
        component: UserEdit
      },
      {
        path: 'orderManage',
        name: 'OrderManage',
        component: OrderManage
      }

      ],
      redirect: '/layout/rhome'
    },
    {
      path: '/userlayout',
      name: 'UserLayout',
      component: UserLayout,
      children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      },
      {
        path: 'orderdetail',
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: 'visual',
        name: 'Visual',
        component: Visual
      },
      {
        path: 'box',
        name: 'Box',
        component: Box
      },
      {
        path: 'prodintro',
        name: 'ProdIntro',
        component: ProdIntro
      },
      {
        path: 'group',
        name: 'Group',
        component: Group
      }
      ],
      redirect: '/userlayout/home'
    },

  ]
})
