import Vue from "vue";

const ApiService = {
  getApi(url, queryData, options = {}) {
    return Vue.prototype.$axios.get(url, queryData, options);
  },
  postApi(url, payloadData, options = {}) {
    return Vue.prototype.$axios.post(url, payloadData, options);
  },
  putApi(url, payloadData, options = {}) {
    return Vue.prototype.$axios.put(url, payloadData, options);
  },
  deleteApi(url, payloadData, options = {}) {
    return Vue.prototype.$axios.delete(url, payloadData, options);
  },
};

export default ApiService;
