import { SET_LOGIN_STATE } from '../mutation-type.js';
import LocalStorage from '@utils/storge.js';
import router from '@/router/index';

const user = {
  state: {
    loginState: false,
  },
  mutations: {
    SET_LOGIN_STATE(state, flag) {
      state.loginState = flag;
    },
  },
  actions: {
    setLoginState({ commit }) {
      LocalStorage.setItem('_token', 'bixin' + Math.floor(Date.now() * 1.8));
      commit(SET_LOGIN_STATE, true);
      router.push('/home');
    },
  },
};

export default user;
