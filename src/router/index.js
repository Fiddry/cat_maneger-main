import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "",
        meta: {
          title: "首页",
        },
        component: () => import("../views/default/index.vue"),
      },
      {
        path: "/costom",
        name: "costom",
        meta: {
          title: "顾客",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "../views/costom/index.vue"
          ),
      },
      {
        path: "/admin",
        name: "admin",
        meta: {
          title: "仓库管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "admin" */
            "../views/admintor/index.vue"
          ),
      },
      {
        path: "/cat",
        name: "cat",
        meta: {
          title: "猫咪",
        },
        component: () =>
          import(
            /* webpackChunkName: "cat" */
            "../views/cat/index.vue"
          ),
      },
      {
        path: "/worker",
        name: "worker",
        meta: {
          title: "员工",
        },
        component: () =>
          import(
            /* webpackChunkName: "workers" */
            "../views/workers/index.vue"
          ),
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "预约信息",
        },
        component: () =>
          import(
            /* webpackChunkName: "预约信息" */
            "../views/foreHeadComformation.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(
        /* webpackChunkName: "login" */
        "../views/Login.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    next();
  }
});

export default router;
