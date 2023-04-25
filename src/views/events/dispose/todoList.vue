<template>
  <el-form :model="todo" label-width="100px">
    <el-form-item label="项目名称：">
      <el-row style="width: 200px">
        <el-input v-model="todo.name" />
      </el-row>
    </el-form-item>
    <el-form-item label="是否启用："
      ><el-row style="width: 100px">
        <el-switch v-model="todo.initiate"></el-switch>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">提交</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
defineProps(["todo"]);
defineEmits(["submit", "cancel"]);
</script>

<style scoped></style>
