import instance from "@/utils/request";

export const checkLogin = (data: any) =>
  instance({
    method: "post",
    url: "/users/checkLogin",
    data,
  });
