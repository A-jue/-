import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/mock/", // 解析，路径可根据实际变动
      localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
      supportTs: false,
      logger: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
