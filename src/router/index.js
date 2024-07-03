import { createRouter, createWebHashHistory } from "vue-router";

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
        redirect: "/home/bot",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/home/bot",
        name: "home_bot",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/home/other",
        name: "home_other",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/index.vue"),
      },
    ],
  },
  {
    path: "/bot",
    name: "bot",
    component: () => import("@/views/bot/index.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/info",
    name: "info",
    component: () => import("@/views/info/index.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
