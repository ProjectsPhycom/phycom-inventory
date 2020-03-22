import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Login from "../views/Login.vue";

import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/panel",
    component: MainLayout,
    children: [
      {
        path: "/panel/materials",
        component: () => import("../views/Items.vue"),
        name: "materials",
      },
    ],
  },
];

const router = new Router({
  routes,
});

export default router;
