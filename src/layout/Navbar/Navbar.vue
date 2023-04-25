<template>
  <el-header>
    <el-icon class="icon" @click="isCollapseButton()">
      <Fold v-show="!isCollapse" />
      <Expand v-show="isCollapse" />
    </el-icon>
    <el-menu mode="horizontal" :default-active="$route.matched[0].path" router>
      <el-menu-item v-for="item in menu" :index="item.path">{{
        item.meta.title
      }}</el-menu-item>
    </el-menu>
    <el-dropdown trigger="hover">
      <el-avatar :size="40" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      <template #dropdown>
        <el-dropdown-item @click="handelLogout">退出登录</el-dropdown-item>
      </template>
    </el-dropdown>
  </el-header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { localGet } from "@/utils/local";
import { sidebarStore } from "@/store/sidebar";
import { loginStore } from "@/store/login";
import { useRouter } from "vue-router";
const $router = useRouter();
let { logOut } = loginStore();
let { isCollapse, isCollapseButton } = sidebarStore();

const menu: any = ref([]);
(function () {
  const routes: any = localGet("routes");
  for (let i of routes) {
    if (!i.meta.hidden) {
      menu.value.push(i);
    }
  }
})();

const handelLogout = () => {
  logOut();
  $router.push("/login");
  // 退出刷新
  location.reload();
};
</script>

<style scoped>
.el-header {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
}

.icon {
  margin-right: 10px;
  cursor: pointer;
}

.el-menu {
  width: 95%;
  border-bottom: none;
}

.item {
  margin-left: 30px;
}
</style>
