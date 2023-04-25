import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { localGet, localSet } from "@/utils/local";
import { sidebarStore } from "@/store/sidebar";
import { userRouter } from "./user";
import { eventRouter } from "./event";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/user",
    meta: { hidden: true },
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: { hidden: true },
  },
  userRouter,
  eventRouter,
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

const asyncRouter: Array<RouteRecordRaw> = [
  {
    path: "/back", //自定义
    component: () => import("@/layout/index.vue"),
    redirect: "/back/supreme",
    meta: { title: "权限", role: ["admin"] },
    children: [
      {
        path: "supreme",
        component: () => import("@/views/back/supreme.vue"),
        meta: { title: "超级管理员", role: ["admin"], icon: "Warning" },
      },
    ],
  },
];

export function filerRouter() {
  const role = localGet("role");
  // 如果没有token则不会执行
  if (!role) return;
  // 遍历出有权限的路由
  let r = asyncRouter.filter(
    (v) =>
      v.meta &&
      v.meta.role &&
      (v.meta.role as Array<string>).includes(role.roles)
  );
  // 将有权限的路由添加到router;
  r.forEach((el) => {
    router.addRoute(el);
  });
  // 将所有可以访问的路由添加到本地
  let routers = [...routes, ...r];
  localSet("routes", routers);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
filerRouter();

router.beforeEach((to, from, next) => {
  const token = localGet("token");
  if (to.path === "/login") {
    next();
  } else {
    if (token) {
      let sidebar = sidebarStore();
      let basePath = sidebar.basePath;
      let base = to.matched[0].path;
      let routers = localGet("routes");
      if (basePath != base) {
        routers.forEach((route: any) => {
          if (route.path === base) {
            console.log("存入", route);
            localSet("sidebar", route);
            sidebar.setBasePath(base);
          }
        });
      }
      next();
    } else {
      next("/login");
    }
  }
});
// 暴露路由实例
export default router;
