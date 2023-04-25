import { defineStore } from "pinia";

export const sidebarStore = defineStore("sidebarStore", {
  state: () => ({
    basePath: "",
    // 折叠状态
    isCollapse: false,
  }),
  actions: {
    setBasePath(basePath: string) {
      this.basePath = basePath;
    },
    isCollapseButton() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
    },
  },
});
