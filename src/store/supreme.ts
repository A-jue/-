import { defineStore } from "pinia";

export const supreme = defineStore("supreme", {
  state: () => ({
    userlist: {
      add: true,
      del: true,
      put: true,
    },
  }),
    actions: {
      
  },
});
