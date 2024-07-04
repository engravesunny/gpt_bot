import { ref } from "vue";

/**
 * @type {import('vue').Ref<{  id: number;userId: number;academy: string;grade: string;major: string;gender: string;age: string;username: string;email: string;createdAt: Date;updatedAt: Date;}>} userInfo
 */
let userInfo = ref({});
let token = ref(localStorage.getItem("token") || "");
const phone = ref(localStorage.getItem("phone") || "");
export const userStore = () => {
  /**
   * @param {*} newVal
   * @returns {*}
   * */
  const updateUserInfo = (newVal) => {
    if(newVal === 'remove') {
      userInfo.value = {};
      return
    }
    userInfo.value = { ...userInfo.value, ...newVal };
  };
  /**
   * @param {string} token
   * @returns {*}
   * */
  const updateToken = (tokenVal) => {
    localStorage.setItem("token", tokenVal);
    token.value = tokenVal;
  };
  /**
   * @param {string} phone
   * @returns {*}
   * */
  const updatePhone = (phoneVal) => {
    localStorage.setItem("phone", phoneVal);
    phone.value = phoneVal;
  };
  return {
    userInfo,
    token,
    updateUserInfo,
    updateToken,
    updatePhone,
    phone,
  };
};
