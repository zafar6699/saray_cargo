import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("#"),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/pages/index.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/pages/users/index.vue"),
    },
    {
      path: "/users/add",
      name: "users-add",
      component: () => import("@/pages/users/add.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/auth/login.vue"),
      meta: {
        layout: "empty",
      },
    },
  ],
});

export default router;
