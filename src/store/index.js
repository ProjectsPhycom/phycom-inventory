import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import items from "./modules/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    items,
  },
  state: {
    error: {
      active: false,
      title: "",
      text: "",
    },
  },
  getters: {
    error: state => state.error,
  },
  mutations: {
    setError: (state, payload) => {
      state.error = payload;
    },
  },
});
