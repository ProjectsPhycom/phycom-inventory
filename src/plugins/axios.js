import axios from "axios";
import Vue from "vue";

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response.data) {
      if (!error.response.data.message) {
        error.response.data.message =
          "Something's wrong. Please try again later.";
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response);
  },
);

Vue.prototype.$axios = axios;
