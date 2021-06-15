import { GET_CURRENCY_DATA_LIST } from '../mutation-type.js';

import { fetchList } from '@api/currency.js';
const user = {
  state: {
    // loginState: false,
    dataSource: [],
  },
  mutations: {
    SET_LOGIN_STATE(state, flag) {
      state.loginState = flag;
    },
  },
  actions: {
    getTableList({ commit }) {
      fetchList().then(res => {
        console.log('res', res);
      });
    },
  },
};

export default user;
