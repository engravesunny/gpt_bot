import service from "./index";

const baseUser = "/edu-ai/ai/user/";
const baseStu = "/edu-ai/ai/stu/";
const api = {
  login: `${baseUser}login`,
  logout: `${baseUser}logout`,
  register: `${baseUser}register`,
  info: `${baseUser}info`,
};
/**
 * 登录
 * @param {{phone: String, password: String}} payload
 * @return {Promise<string>}
 */
export const login = (payload) => {
  return service({
    method: "post",
    url: api.login,
    data: payload,
  });
};
/**
 * 注册
 * @param {{role: String, phone: String, password: string, email?: string}} payload
 * @return {Promise<string>}
 */
export const register = (payload) => {
  return service({
    method: "post",
    url: api.register,
    data: payload,
  });
};
/**
 * 注销
 * @param {{id: String, role: String}} payload
 * @return {Promise<{}>}
 */
export const logout = (payload) => {
  return service({
    method: "get",
    url: api.logout,
    params: payload,
  });
};
/**
 * 获取学生信息
 * @param {{phone: String}} payload
 * @return {Promise<{}>}
 */
export const apiUserInfo = (payload) => {
  return service({
    method: "get",
    url: api.info,
    params: payload,
  });
};
/**
 * 更新学生信息
 * @param {{id: String, role: String}} payload
 * @return {Promise<{}>}
 */
export const updateUserInfo = (payload) => {
  return service({
    method: "put",
    url: api.info,
    data: payload,
  });
};
/**
 * 手机号获取用户id
 * @param {{phone: string}} payload
 * @return {Promise<{}>}
 */
export const getUserIdByPhone = (payload) => {
  return service({
    method: "get",
    url: api.info,
    params: payload,
  });
};
