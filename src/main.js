import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./registerServiceWorker";

// PLUGINS
import vuetify from "./plugins/vuetify";
import "./plugins/axios";

// GLOBAL COMPONENTS
import ErrorDialog from "./components/ErrorDialog";

Vue.component("error-dialog", ErrorDialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
