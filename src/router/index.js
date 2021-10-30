import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: () => import("@/views/home.vue"),
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
  if (to.meta.requiresAuth) {
    const uid = sessionStorage.getItem("uid");
    return uid ? next() : next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
