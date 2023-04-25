import { defineStore } from "pinia";
import { checkLogin } from "@/api/login";
import { localRemove, localSet } from "@/utils/local";
export const loginStore = defineStore("loginStore", {
  state: () => ({
    token: "",
    role: "",
  }),
  actions: {
    A_login({ username, password, captcha }: any) {
      return checkLogin({ username, password, captcha }).then((res) => {
        const { data } = res;
        localSet("role", data.role);
        localSet("token", data.token);
        return res;
      });
    },
    logOut() {
      localRemove("token");
      localRemove("role");
      localRemove("routes");
      localRemove("sidebar");
    },
  },
});
