import Layout from '../layout/Index.vue';
import Login from '@pages/Login/Index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LocalStorage from '@utils/storge.js';
import store from '@store/index';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@pages/Home/Index.vue'),
        name: 'Home',
        meta: { title: '主页', icon: 'dashboard', affix: true, url: '/home' },
      },
    ],
  },
  {
    path: '/currency',
    component: Layout,
    meta: {
      title: '公共数据',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'index',
        component: () => import('@pages/Currency/Index.vue'),
        name: 'Currency',
        meta: { title: '币种', icon: 'documentation', affix: true, url: '/currency/index' },
      },
      {
        path: 'enumeration',
        component: () => import('@pages/Enumeration/Index.vue'),
        name: 'Enumeration',
        meta: { title: '枚举', icon: 'documentation', affix: true, url: '/currency/enumeration' },
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // 不再登陆页面
    if (LocalStorage.getItem('_token')) {
      if (store.state.user.loginState) {
        next();
      } else {
        store.commit('SET_LOGIN_STATE', true);
        next({ path: to.path });
      }
    } else {
      router.push({ path: '/login' });
    }
  } else {
    LocalStorage.clear();
    next();
  }
});

export default router;
