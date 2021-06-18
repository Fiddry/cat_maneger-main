import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { ElMessage } from "element-plus";
const routes = [
  {
    path: "/",
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
  {
    path: "/Home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index",
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
        path: "/catInfo",
        name: "catInfo",
        meta: {
          title: "猫咪信息",
        },
        component: () =>
          import(
            /* webpackChunkName: "catInfo" */
            "../views/catInfo/index.vue"
          ),
      },
      {
        path: "/worker",
        name: "worker",
        meta: {
          title: "员工",
        },
        beforeEnter: (to, from, next) => {
          const role = localStorage.getItem("ms_username");
          if (role == "admin") {
            next();
          } else {
            ElMessage.error("对不起，不是管理员能进去");
            // next("worker")
          }
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  if (!role && to.path !== "/") {
    next("/");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/");
  } else {
    next();
  }
});

export default router;
