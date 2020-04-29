import Vue from "vue";
import Router from "vue-router";
import AuthGuard from "./authGuards";

Vue.use(Router);

import Login from "../views/Login.vue";

import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      public: true,
    },
  },
  {
    path: "/panel",
    component: MainLayout,
    children: [
      {
        path: "/panel/materials",
        component: () => import("../views/Materials/Items.vue"),
        name: "materials",
        meta: {
          requiresLogin: true,
        },
      },
      {
        path: "/panel/materials/register",
        component: () => import("../views/Materials/NewItem.vue"),
        name: "newMaterial",
        meta: {
          requiresLogin: true,
        },
      },
      {
        path: "/panel/materials/edit",
        component: () => import("../views/Materials/EditItem.vue"),
        name: "editMaterial",
        meta: {
          requiresLogin: true,
        },
      },
      {
        path: "/panel/materials/check",
        component: () => import("../views/Materials/CheckItem.vue"),
        name: "checkMaterial",
        meta: {
          requiresLogin: true,
        },
      },
    ],
  },
];

const router = new Router({
  routes,
});

// router.beforeEach(AuthGuard.generalGuard);

export default router;
