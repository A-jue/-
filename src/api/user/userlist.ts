import request from "@/utils/request";

// 列表接口
export interface UserList {
  id: number | null; // id
  date: string; // 出生日期
  name: string; // 姓名
  address: string; // 职业
  site: string; // 家庭住址
  phone: number | null; // 联系电话
  sex: string; // 性别
  idNumber: number | null; // 身份证号
}

export const userListGet = () => {
  return request({
    url: "/userlist",
    method: "get",
  });
};

export const userListDelete = (data: UserList) => {
  return request({
    url: "/userlist/delete",
    method: "delete",
    data,
  });
};
export const userListPut = (data: UserList) => {
  return request({
    url: "/userlist/put",
    method: "put",
    data,
  });
};
export const userListPost = (data: UserList) => {
  return request({
    url: "/userlist/post",
    method: "post",
    data,
  });
};
