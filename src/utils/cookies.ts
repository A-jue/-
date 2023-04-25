import cookies from "js-cookie";

// 将token存入cookie中
class Cookies {
  get(name: string) {
    let value = cookies.get(name);
    // 如果值等于'false:boolean'则将它作为false处理
    if (value === "false:boolean") {
      value = false;
    } else if (value === "true:boolean") {
      value = true;
    }
    return value;
  }
  getAll() {
    cookies.get();
  }
  set(name: string, value: any) {
    // 默认有效期一天
    const defaultOptions = {
      expires: 1,
    };
    // 如果要存入的是布尔值则加上':boolean'类型标识，方便取出的时候转换
    if (typeof value == "boolean") {
      value = value + ":boolean";
    }
    cookies.set(name, value, defaultOptions);
  }
  remove(name: string) {
    return cookies.remove(name);
  }
}
export default new Cookies();
