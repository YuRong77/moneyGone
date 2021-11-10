import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/index/lobby",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "lobby",
        name: "Lobby",
        component: () => import("@/components/lobby/lobby.vue"),
      },
      {
        path: "record",
        name: "Record",
        component: () => import("@/components/record/record.vue"),
      },
      {
        path: "chart",
        name: "Chart",
        component: () => import("@/components/chart/chart.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/components/setting/setting.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const uid = sessionStorage.getItem("uid");
    return uid ? next() : next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
