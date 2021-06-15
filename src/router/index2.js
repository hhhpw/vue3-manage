import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layout/Index.vue';
import Login from '@pages/Login/Index.vue';

import routes from './index.js';
// import Layout from '../layout/Index.vue';
import store from '@store/index';
import LocalStorage from '@utils/storge.js';
// import { Store } from 'vuex'
// const routes = [
//   {
//     path: '/',
//     component: Layout,
//     name: 'Layout',
//     children: [],
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     children: [],
//   },
// ];
// export const initRouter = (routers, path) => {
//   routers.forEach(route => {
//     if (route.meta && route.meta.component) {
//       route.component = loadPage(route.meta.component);
//     } else {
//       route.component = Layout;
//     }
//     if (path) {
//       path === '/'
//         ? (route.meta.url = path + route.path)
//         : (route.meta.url = path + '/' + route.path);
//     }
//     if (route.children != undefined && route.children.length > 0) {
//       initRouter(route.children, route.path);
//     }
//   });
// };
// const loadPage = page => {
//   return () => import(`@pages/${page}.vue`);
// };

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     next();
//     // 不再登陆页面
//     if (LocalStorage.getItem('_token')) {
//       if (store.state.user.loginState) {
//         next();
//       } else {
//         router.push({ path: '/login' });
//       }
//     } else {
//       router.push({ path: '/login' });
//     }
//   } else {
//     LocalStorage.clear();
//     next();
//   }
// });
// router.beforeEach((to, form, next) => {

//   next({ path: to.path });
//   if (to.path !== '/login') {
//     // 不在登录页面时
//     if () {

// console.log('=====router=====', router);

export default router;
