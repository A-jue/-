import { MockMethod } from "vite-plugin-mock";

// 账号
const tokens: { [index: string]: string } = {
  admin: "admin-token",
  editor: "editor-token",
};

// 角色
const users: { [index: string]: any } = {
  "admin-token": {
    roles: "admin",
    name: "Admin",
  },
  "editor-token": {
    roles: "editor",
    name: "Editor",
  },
};
let rememberPassword = "";
export default [
  {
    url: "/yym.0905/users/checkLogin",
    method: "post",
    response: ({ body }: any) => {
      const { username, password } = body;
      const token = tokens[username];
      if (token) {
        const role = users[token];
        rememberPassword = password;
        return {
          code: 200,
          data: {
            token,
            role,
          },
        };
      } else {
        return {
          code: 400,
          message: "用户名或密码错误",
        };
      }
    },
  },
] as MockMethod[];
