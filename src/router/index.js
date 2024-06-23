import { createWebHashHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/bot",
        name: "bot",
        component: () => import("@/views/bot/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
