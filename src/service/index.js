import axios from "axios";
import { ElMessage } from "element-plus";
import { userStore } from "@/store/user.js";
import router from "@/router";

const { token } = userStore();
//创建axios实例
const service = axios.create({
  baseURL: "http://kecat.top:8888",
  headers: {
    //编译语言
    "Content-type": "application/json;charset=utf-8",
  },
});
//请求拦截
//就是你请求接口的时候，我会先拦截下来，对你的数据做一个判断，或者携带个token给你
const noAuthUrl = ['/login', '/register'];
service.interceptors.request.use(
  (config) => {
    //请求的数据
    config.headers = config.headers || {}; // 没有数据的话就设置为空设置为数据
    noAuthUrl.every((item) => !config?.url?.includes(item)) && token.value && (config.headers.Authorization = `Bearer ${token.value}`);
    if (config.url.includes("v-dlg") || config.url.includes("upload")) {
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
  (config) => {
    const res = config.data || {}; //res是后端返回的数据
    const { code, msg, message } = res; //code是后端的状态码
    if (code !== 200) {
      if(code === 401) {
        ElMessage.error('请登录')
        router.push('/login');
        return;
      }
      //请求失败（包括token失效，302，404...根据和后端约定好的状态码做出不同的处理）
      ElMessage.error(msg || message);
      return Promise.resolve('');
    } else {
      //请求成功
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
