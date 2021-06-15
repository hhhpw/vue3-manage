import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router/index.js';
import store from './store/index.js';
import '@styles/index.scss'; // global css
import moment from 'moment';

// console.log('moment', moment);
// 加载icon
const req = require.context('./icons/svg/', true, /\.svg$/);

const map = {};

for (const key of req.keys()) {
  map[key] = req(key);
  // const keyArr = key.split('/');
  // keyArr.shift(); // 移除.
  // map[keyArr.join('.').replace(/\.svg$/g, '')] = context(key);
}

// console.log('req', req.keys());
// const requireAll = requireContext => {
//   // console.log('requireContext===>', requireContext, requireContext.keys());
//   requireContext.keys().map(requireContext);
// };
// requireAll(req);

// console.log('requireAll', importAll(req));

import SvgIcon from '@components/SvgIcon/index.vue';

const app = createApp(App);

app
  .use(ElementPlus)
  .use(router)
  .use(store);

// app.config.globalProperties.$moment = () => moment;
app.provide('$moment', moment);
app.component('svg-icon', SvgIcon);

app.mount('#app');
