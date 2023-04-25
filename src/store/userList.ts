import { defineStore } from "pinia";
import { UserList } from "@/api/user/userList";
export const userListStore = defineStore("userListStore", {
  state: () => ({
    // 数据列表
    userList: [] as UserList[],
  }),
  actions: {
    // 存储列表数据
    storage(data: UserList[]) {
      this.userList = data;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
