<template>
  <template v-if="!item.meta.hidden">
    <el-sub-menu :index="basePath" v-if="item.children">
      <template #title>
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="children in item.children"
        :index="basePath + '/' + children.path"
        >{{ children.meta.title }}
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="basePath">
      <template v-if="item.meta.icon">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
    default: {},
  },
  basePath: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<style scoped></style>
