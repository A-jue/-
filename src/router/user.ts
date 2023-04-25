import { RouteRecordRaw } from "vue-router";
export const userRouter: RouteRecordRaw = {
  path: "/user",
  component: () => import("@/layout/index.vue"),
  redirect: "/user/list",
  meta: { title: "用户" },
  children: [
    {
      path: "list",
      redirect: "/user/list/userlist",
      component: () => import("@/views/users/index.vue"),
      meta: { title: "用户管理", icon: "MessageBox" },
      children: [
        {
          path: "userlist",
          component: () => import("@/views/users/list/UserList.vue"),
          meta: { title: "用户列表" },
        },
      ],
    },
  ],
};