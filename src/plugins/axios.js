import axios from "axios";
import Vue from "vue";
import StorageService from "../services/storage.service";

axios.interceptors.request.use(request => {
  const isImgur = request.url.includes("imgur");
  if (isImgur) {
    delete request.headers.common["x-access-token"];
  } else {
    const token = StorageService.getToken();
    if (token) {
      request.headers.common["x-access-token"] = token;
    }
  }
  return request;
});

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
