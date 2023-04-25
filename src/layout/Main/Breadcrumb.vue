<template>
  <div>
    <el-card>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="route in (matched as any)" :key="route.path">{{ route.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
const $route = useRoute();
const matched = computed(() => {
  return $route.matched;
});
</script>

<style scoped>
.el-breadcrumb {
  height: 20px;
  display: flex;
  align-items: center;
}
</style>
