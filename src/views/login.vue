<template>
  <div class="login">
    <div class="login-container">
      <h3 class="login-title">登陆</h3>
      <el-form class="login-form" :model="form" label-position="right" label-width="70px" style="max-width: 260px"
        ref="formRef" :rules="loginFormRule">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" :prefix-icon="User" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input show-password v-model="form.password" :prefix-icon="Lock" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="验证码:" prop="captcha">
          <el-input v-model="form.captcha" @keyup.enter="submit" />
        </el-form-item>
      </el-form>
      <div class="dy-cz">
        <el-checkbox v-model="rememberPass" label="记住密码" size="large" />
        <span style="color: #0072ff; font-size: 14px; cursor: pointer" @click="show = 1">忘记密码？</span>
      </div>
      <el-button type="primary" size="large" class="login-btn" @click="submit">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { loginFormRule } from "@/rules";
import { User, Lock } from "@element-plus/icons-vue";
import cookies from "@/utils/cookies";
import { loginStore } from "@/store/login";
import { useRouter } from "vue-router";
import { filerRouter } from "@/router";
const $router = useRouter();
const loginstore = loginStore();
// 获取表单标签
const formRef = ref();

// 账号密码验证码数据
const form = reactive({
  username: "",
  password: "",
  captcha: "",
});

// 是否记住密码
const rememberPass = ref<boolean>(false);

// 忘记密码
const show = ref<number>(1);

const submit = async () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      const { username, password } = form;
      loginstore.A_login(form).then((res) => {
        // 存储密码
        cookies.set("rememberPass", rememberPass.value);
        if (rememberPass.value) {
          cookies.set("username", username);
          cookies.set("password", password);
        } else {
          cookies.remove("username");
          cookies.remove("password");
        }
        $router.push("/");
        filerRouter();
      });
    }
  });
};
// 获取密码
const created = () => {
  if (cookies.get("rememberPass"))
    rememberPass.value = cookies.get("rememberPass");
  if (rememberPass.value) {
    form.password = cookies.get("password") || "";
    form.username = cookies.get("username") || "";
  }
};
created();
</script>

<style scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -170px;
}

.login-container {
  height: 340px;
  width: 300px;
  border: 1px solid;
  padding: 20px;
}

.login-title {
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.dy-cz {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-btn {
  margin-top: 15px;
  width: 100%;
  border-bottom: solid 2px #ffffff;
  box-shadow: 0px 6px 7px 0px rgb(192 108 18 / 39%);
  letter-spacing: 1rem;
  font-weight: bold;
}
</style>
