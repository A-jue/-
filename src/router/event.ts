import { RouteRecordRaw } from "vue-router";

export const eventRouter: RouteRecordRaw = {
  path: "/event",
  redirect: "/event/dispose",
  component: () => import("@/layout/index.vue"),
  meta: { title: "事件" },
  children: [
    {
      path: "dispose",
      redirect: "/event/dispose/eventlist",
      component: () => import("@/views/events/index.vue"),
      meta: { title: "管理列表", icon: "MessageBox" },
      children: [
        {
          path: "eventlist",
          component: () => import("@/views/events/dispose/eventlist.vue"),
          meta: { title: "事件列表" },
        },
        {
          path: "itemlist",
          component: () =>
            import("@/views/events/dispose/ItemList.vue"),
          meta: { title: "项目列表" },
        },
      ],
    },
  ],
};
