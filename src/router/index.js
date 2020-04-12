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
        component: () => import("../views/Materials/Items.vue"),
        name: "materials",
      },
      {
        path: "/panel/materials/register",
        component: () => import("../views/Materials/NewItem.vue"),
        name: "newMaterial",
      },
      {
        path: "/panel/materials/edit",
        component: () => import("../views/Materials/EditItem.vue"),
        name: "editMaterial",
      },
      {
        path: "/panel/materials/check",
        component: () => import("../views/Materials/CheckItem.vue"),
        name: "checkMaterial",
      },
    ],
  },
];

const router = new Router({
  routes,
});

export default router;
