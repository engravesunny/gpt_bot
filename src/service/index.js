import axios from "axios";
import { ElMessage } from "element-plus";
import { userStore } from "@/store/user.js";

const { token } = userStore();
//创建axios实例
const service = axios.create({
  baseURL: "http://localhost:8888/v3/api-docs/default",
  headers: {
    //编译语言
    "Content-type": "application/json;charset=utf-8",
  },
});
//请求拦截
//就是你请求接口的时候，我会先拦截下来，对你的数据做一个判断，或者携带个token给你
service.interceptors.request.use(
  (config) => {
    //请求的数据
    config.headers = config.headers || {}; // 没有数据的话就设置为空设置为数据
    config.headers.Authorization = `Bearer ${token.value}`;
    if (localStorage.getItem("token")) {
      //先确保登录
      config.headers.Authorization = localStorage.getItem("token") || "";
    }
    if (config.url.includes("v-dlg")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config; //必须返回出去，不然请求发不出去
  },
  (error) => {
    //处理错误请求
    return ElMessage(error.message);
  },
);
//响应拦截：后端返回来的结果
service.interceptors.response.use(
  (res) => {
    const code = res.data.code; //code是后端的状态码
    if (code !== 0) {
      //请求失败（包括token失效，302，404...根据和后端约定好的状态码做出不同的处理）
      return Promise.reject(res);
    } else {
      //请求成功
      console.log(res, "成功----");
      return Promise.resolve(res.data);
    }
  },
  (err) => {
    console.log(err, "错误信息的处理"); //错误信息的处理
    //处理错误响应
    return ElMessage(err.message);
  },
);
//因为别的地方要用，所以就把实例暴露出去，导出
export default service;
