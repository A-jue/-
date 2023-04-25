<template>
  <div>
    <el-avatar
      :size="50"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    />
    <el-form
      ref="ruleFormRef"
      :model="fromData"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="姓名：" prop="name">
        <el-row style="width: 100px">
          <el-input v-model="fromData.name" />
        </el-row>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-row style="width: 100px">
          <el-select v-model="fromData.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item label="出生日期: " prop="date">
        <el-row style="width: 200px">
          <el-date-picker
            v-model="fromData.date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          />
        </el-row>
      </el-form-item>
      <el-form-item label="职业：" prop="address"
        ><el-row style="width: 100px">
          <el-select v-model="fromData.address">
            <el-option label="工人" value="工人" />
            <el-option label="学生" value="学生" />
            <el-option label="社会人" value="社会人" />
            <el-option label="农民" value="农民" />
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-row style="width: 150px">
          <el-input v-model="fromData.phone" />
        </el-row>
      </el-form-item>
      <el-form-item label="家庭住址: " prop="site">
        <el-row style="width: 500px">
          <el-input v-model="fromData.site" />
        </el-row>
      </el-form-item>
      <el-form-item label="身份证号: " prop="idNumber">
        <el-row style="width: 300px">
          <el-input v-model="fromData.idNumber" />
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('submit')">提交</el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="UserListDialog">
import { ref, reactive } from "vue";
import { userListRule } from "@/rules";
import type { FormInstance, FormRules } from "element-plus";
import { type } from "os";
const props = defineProps(["personage"]);
const emits = defineEmits(["submit", "cancel"]);
const { id, data, name, address, site, phone, sex, idNumber } = props.personage;
const fromData = reactive({
  id: id,
  date: data,
  name: name,
  address: address,
  site: site,
  phone: phone,
  sex: sex,
  idNumber: idNumber,
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  date: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  address: [{ required: true, message: "请选择职业", trigger: "change" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  site: [{ required: true, message: "请输入家庭住址", trigger: "blur" }],
  idNumber: [{ required: true, message: "请输入身份证号码", trigger: "blur" }],
});
</script>

<style scoped></style>
