import axios from "axios";
// import { useStore } from "@/store/login";
import { ElMessage } from "element-plus";

const instance = axios.create({
  baseURL: "/yym.0905",
  timeout: 6000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // const store = useStore();
    // if (store.token) config.headers.Authorization = "bearer" + store.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code !== 200) {
    ElMessage({
      message: res.message || "Error",
      type: "error",
      duration: 2000,
    });
    return Promise.reject(new Error(res.message || "Error"));
  }
  return res;
});
export default instance;
