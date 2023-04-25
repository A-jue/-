// 本地存储工具
// 存数据
export const localSet = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
// 取数据
export const localGet = (key: string) => {
  return JSON.parse(localStorage.getItem(key)!);
};
// 删除
export const localRemove = (key: string) => {
  localStorage.removeItem(key);
};
