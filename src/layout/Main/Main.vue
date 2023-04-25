<template>
  <div>
    <el-main>
      <Breadcrumb class="breadcrumb" />

      <el-card class="card">
        <RouterView></RouterView>
      </el-card>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./Breadcrumb.vue";
</script>

<style scoped>
.el-main {
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
}

.card {
  height: 750px;
}
</style>
