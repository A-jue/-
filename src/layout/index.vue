<template>
  <div class="common-layout">
    <el-container>
      <Sidebar />
      <el-container class="header-and-main">
        <Navbar></Navbar>
        <Main></Main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar/Sidebar.vue";
import Navbar from "./Navbar/Navbar.vue";
import Main from "./Main/Main.vue";
</script>

<style scoped>
.common-layout {
  height: 100%;
}
.header-and-main {
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.el-container {
  height: 100%;
  width: 100%;
}
</style>
