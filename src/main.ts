import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 路由
import router from "./router";
// pinia
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate"; //导入持久化插件
// element-plus
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const pinia = createPinia();
pinia.use(persist);
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
app.use(pinia);
app.mount("#app");
