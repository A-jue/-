<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名"
          @input="find"
        />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="find" class="primary-button-style"
          >查询</el-button
        >
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="reset" class="primary-button-style"
          >重置</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="adduser()"
          class="primary-button-style"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <el-scrollbar height="610px">
      <el-table :data="comData" border style="width: 100%" height="610px">
        <el-table-column
          prop="id"
          label="编号"
          width="100"
          :fixed="true"
          sortable
        />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="sex" label="性别" width="100" sortable />
        <el-table-column prop="date" label="出生日期" width="200" sortable />
        <el-table-column prop="address" label="职业" width="150" sortable />
        <el-table-column prop="phone" label="联系电话" width="200" />
        <el-table-column prop="site" label="家庭住址" width="300" />
        <el-table-column label="操作" fixed="right" min-width="200">
          <template #default="scope">
            <el-button
              size="small"
              @click="look(scope.$index, scope.row)"
              class="default-button-style"
              >查看</el-button
            >
            <el-button
              size="small"
              @click="delList(scope.$index, scope.row)"
              class="default-button-style"
              >删除</el-button
            >
            <el-button
              size="small"
              @click="amend(scope.$index, scope.row)"
              class="default-button-style"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-config-provider>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 30, total]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-config-provider>
    <!-- 查看弹窗 -->
    <el-dialog v-model="dialogLook" title="个人信息">
      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
      <el-row :gutter="24">
        <el-col :span="7">姓名：{{ personage.name }}</el-col>
        <el-col :span="7">性别：{{ personage.sex }}</el-col>
        <el-col :span="7">出生日期：{{ personage.date }}</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="7">职业：{{ personage.address }}</el-col>
        <el-col :span="7">联系电话：{{ personage.phone }}</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">家庭住址: {{ personage.site }}</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">身份证号: {{ personage.idNumber }}</el-col>
      </el-row>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog
      v-model="dialogPut"
      title="修改信息"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <UserListDialog
        @submit="onSubmit"
        @cancel="cancel"
        :personage="personage"
      ></UserListDialog>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      v-model="dialogAdd"
      title="添加用户"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <UserListDialog
        @submit="onAdd"
        @cancel="noAdd"
        :personage="personage"
      ></UserListDialog>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import UserListDialog from "./UserListDialog.vue";
import {
  userListGet,
  userListDelete,
  userListPost,
  userListPut,
  UserList,
} from "@/api/user/userlist";
// 数据持久化
import { userListStore } from "@/store/userList";
const listStore = userListStore();

// 用户列表数据
const userData = ref<UserList[]>([]);

// 用户个人数据
const personage = ref<UserList>({
  id: null,
  date: "",
  name: "",
  address: "",
  site: "",
  phone: null,
  sex: "",
  idNumber: null,
});

// 数据获取
const getDate = async () => {
  await userListGet().then((res: any) => {
    userData.value = res.list;
    listStore.storage(userData.value);
  });
};
getDate();

// 分页
const currentPage = ref(1); // 当前页数
const pageSize = ref(10); // 每页显示条数
const total = ref(0); // 总页数，监视数据变化
watch(userData, () => {
  total.value = userData.value.length;
}); // 总条数
const comData = computed(() => {
  return userData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
}); // 当前页数据

// 增
const dialogAdd = ref(false);
const adduser = () => {
  personage.value = {
    id: null,
    date: "",
    name: "",
    address: "",
    site: "",
    phone: null,
    sex: "",
    idNumber: null,
  };
  dialogAdd.value = true;
};
const onAdd = () => {
  userListPost(personage.value).then((res: any) => {
    userData.value = res.list;
    listStore.storage(userData.value);
    dialogAdd.value = false;
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  });
};
const noAdd = () => {
  dialogAdd.value = false;
  ElMessage({
    message: "取消添加",
  });
};

// 删
const delList = async (index: any, row: any) => {
  await ElMessageBox.confirm("你确定要删除该数据?", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userListDelete(row).then((res: any) => {
        userData.value = res.list;
        listStore.storage(userData.value);
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        find();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

// 改
const dialogPut = ref(false);
const amend = (index: any, row: any) => {
  dialogPut.value = true;
  personage.value = row;
};
const onSubmit = () => {
  userListPut(personage.value).then((res: any) => {
    userData.value = res.list;
    listStore.storage(userData.value);
    dialogPut.value = false;
    ElMessage({
      message: "修改成功",
      type: "success",
    });
    find();
  });
};

const cancel = () => {
  dialogPut.value = false;
  userData.value = listStore.userList;
  ElMessage({
    message: "取消修改",
  });
};

// 查
const dialogLook = ref(false);
const look = (index: any, row: any) => {
  dialogLook.value = true;
  personage.value = row;
};

// 查询 取消查询
const formInline = ref({
  name: "",
});
const find = () => {
  if (formInline.value.name !== "") {
    userData.value = userData.value.filter((item) =>
      item.name.toLowerCase().includes(formInline.value.name.toLowerCase())
    );
  } else {
    userData.value = listStore.userList;
  }
};
const reset = () => {
  formInline.value.name = "";
  userData.value = listStore.userList;
};
</script>

<style scoped></style>
