<template>
  <div class="menu">
    <el-aside>
      <el-menu
        router
        :collapse="sidebarstore.isCollapse"
        :default-active="$route.path"
        unique-opened
        route
      >
        <a href="/" class="logo"><p>logo</p></a>
        <Sidebaritem
          v-for="route in routes"
          :key="basePath + route.path"
          :item="route"
          :base-path="basePath + '/' + route.path"
        ></Sidebaritem>
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { sidebarStore } from "@/store/sidebar";
import { localGet } from "@/utils/local";
import Sidebaritem from "./Sidebaritem.vue";
let sidebarstore = sidebarStore();
const $route = useRoute();

const routes = ref();
const basePath = computed(() => {
  return sidebarstore.basePath;
});

watch(
  basePath,
  () => {
    const sidebar = localGet("sidebar");
    routes.value = sidebar.children;
  },
  { immediate: true }
);
</script>

<style scoped>
.el-aside {
  width: auto;
  height: 100%;
  background-color: #eee;
}
.el-menu {
  width: 200px;
  height: 100%;
  background-color: #eee;
  border-right: none;
  overflow: hidden;
}
.el-menu.el-menu--collapse {
  width: 60px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  text-decoration: none;
  color: black;
  font-size: 14px;
  border: 1px solid #000;
}
</style>
