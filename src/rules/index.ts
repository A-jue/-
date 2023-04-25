// 登陆页面验证
export const loginFormRule = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 12, message: "长度在4到12之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在6到16之间", trigger: "blur" },
  ],
  captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 6, max: 6, message: "请输入正确的验证码", trigger: "blur" },
  ],
};

// 表单验证
export const userListRule = {
  date: [
    {
      type: "date",
      required: true,
      message: "请填写出生日期",
      trigger: "change",
    },
  ],
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 20, message: "请填写合法的姓名", trigger: "blur" },
  ],
  address: [{ required: true, message: "请选择职业", trigger: "change" }],
  site: [
    { required: true, message: "请填写家庭住址", trigger: "blur" },
    { min: 1, max: 40, trigger: "blur" },
  ],
  phone: [
    {
      required: true,
      message: "请填写电话",
      trigger: "blur",
    },
    { min: 6, max: 12, message: "长度在6到11之间", trigger: "blur" },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  idNumber: [
    {
      required: true,
      message: "请输入身份证号码",
      trigger: "change",
    },
    { min: 18, max: 18, message: "请输入正确的身份证号码", trigger: "blur" },
  ],
};
