import { ref } from "vue";

let userInfo = ref({});
let token = ref(localStorage.getItem("token") || "");
export const userStore = () => {
  /**
   * @param {*} newVal
   * @returns {*}
   * */
  const updateUserInfo = (newVal) => {
    console.log(newVal);
    userInfo.value = { ...userInfo.value, ...newVal };
  };
  /**
   * @param {string} token
   * @returns {*}
   * */
  const updateToken = (token) => {
    localStorage.setItem("token", token);
    token.value = token;
  };
  return {
    userInfo,
    token,
    updateUserInfo,
    updateToken,
  };
};
