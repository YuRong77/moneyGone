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
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/index.vue"),
    children: [
      {
        path: "lobby",
        name: "Lobby",
        component: () =>
          import(
            /* webpackChunkName: "lobby" */ "@/components/lobby/lobby.vue"
          ),
      },
      {
        path: "record",
        name: "Record",
        component: () =>
          import(
            /* webpackChunkName: "record" */ "@/components/record/record.vue"
          ),
      },
      {
        path: "chart",
        name: "Chart",
        component: () =>
          import(
            /* webpackChunkName: "chart" */ "@/components/chart/chart.vue"
          ),
      },
      {
        path: "setting",
        name: "Setting",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/components/setting/setting.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const uid = sessionStorage.getItem("Authorization");
    return uid
      ? next({ replace: true })
      : next({ path: "/login", replace: true });
  } else {
    next();
  }
});

export default router;
