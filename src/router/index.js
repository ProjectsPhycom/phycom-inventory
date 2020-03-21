import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new Router({
  routes,
});

export default router;
