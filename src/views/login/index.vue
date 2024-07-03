<template>
  <div class="login-page">
    <div class="login-top-banner" />
    <div class="login-main">
      <template v-if="!isForgetPassword">
        <div
          v-if="loginType === LoginType.Password"
          class="login-main-input-label"
        >
          账号密码登录
        </div>
        <div v-if="loginType === LoginType.Code" class="login-main-input-label">
          注册账号
        </div>

        <div class="login-main-input-account">
          <input
            v-model="loginFormData.phone"
            placeholder="手机号"
            type="text"
          />
        </div>
        <div
          v-if="loginType === LoginType.Code"
          class="login-main-input-account"
        >
          <input v-model="loginFormData.email" placeholder="邮箱" type="text" />
        </div>
        <div class="login-main-input-password">
          <input
            v-model="loginFormData.password"
            placeholder="密码"
            type="password"
          />
        </div>
        <div
          v-if="loginType === LoginType.Code"
          class="login-main-input-password"
        >
          <input
            v-model="loginFormData.newpassword"
            placeholder="密码确认"
            type="password"
          />
        </div>
        <div class="login-main-btn">
          <button @click="handleLogin">登录</button>
        </div>
      </template>
      <template v-else>
        <div class="login-main-input-label">更改密码</div>
        <div class="login-main-input-account">
          <input
            v-model="forgetFormData.phone"
            placeholder="手机号"
            type="text"
          />
        </div>
        <div class="login-main-input-code">
          <input
            v-model="forgetFormData.code"
            placeholder="验证码"
            type="text"
          />
          <button :class="{ sended: codeSended }" @click="handleSendCode">
            {{ !codeSended ? "发送验证码" : `重新发送（${codeSecond}秒）` }}
          </button>
        </div>
        <div class="login-main-input-password">
          <input
            v-model="forgetFormData.password"
            placeholder="新密码"
            type="password"
          />
        </div>
        <div class="login-main-input-password">
          <input
            v-model="forgetFormData.newpassword"
            placeholder="新密码确认"
            type="password"
          />
        </div>
        <div class="login-main-btn">
          <button @click="handleChangePassword">确认更改</button>
        </div>
      </template>
    </div>
    <div v-if="!isForgetPassword" class="login-other">
      <div
        v-if="loginType === LoginType.Code"
        class="login-other-option"
        @click="handleChangeLoginType(LoginType.Password)"
      >
        账号密码登录
      </div>
      <div
        v-if="loginType === LoginType.Password"
        class="login-other-option"
        @click="handleChangeLoginType(LoginType.Code)"
      >
        还没注册？
      </div>
      <div class="login-other-option" @click="handleForgetPassword">
        忘记密码
      </div>
    </div>
    <div class="login-back iconfont" @click="handleBack">&#xe61e;</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LoginType } from "@/constants";
import { useRouter } from "vue-router";
import { apiUserInfo, login, register } from "@/service/user";
import { userStore } from "@/store/user";
import { ElMessage } from "element-plus";

const { updateToken, updateUserInfo } = userStore();
const router = useRouter();
const loginType = ref("password");
const codeSended = ref(false);
const codeSecond = ref(60);
const loginFormData = ref({
  phone: "",
  code: "",
  password: "",
  email: "",
  newpassword: "",
});
const forgetFormData = ref({
  phone: "",
  code: "",
  password: "",
  newpassword: "",
});
const isForgetPassword = ref(false);

const handleLogin = async () => {
  if (loginType.value === LoginType.Code) {
    // 注册
    if (
      !loginFormData.value.phone ||
      !loginFormData.value.password ||
      !loginFormData.value.newpassword
    ) {
      ElMessage.error("请填写完整信息！");
      return;
    }
    if (loginFormData.value.password !== loginFormData.value.newpassword) {
      ElMessage.error("两次填写密码不一致！");
      return;
    }
    updateUserInfo({
      phone: loginFormData.value.phone,
    });
    const token = await register({
      role: 0,
      ...loginFormData.value,
    });
    updateToken(token);
    await router.push("/info");
  } else if (loginType.value === LoginType.Password) {
    // 登录
    if (!loginFormData.value.phone || !loginFormData.value.password) {
      ElMessage.error("请填写完整信息！");
      return;
    }
    const token = await login({
      ...loginFormData.value,
    });
    updateToken(token);
    const userInfo = await apiUserInfo({
      phone: loginFormData.value.phone,
    });
    updateUserInfo(userInfo);
    await router.push("/home");
  }
};
const handleChangePassword = () => {
  console.log(forgetFormData.value);
};
const handleSendCode = () => {
  if (codeSended.value) return;
  // TODO 调用接口
  codeSended.value = true;
  const timer = setInterval(() => {
    codeSecond.value = codeSecond.value - 1;
    if (codeSecond.value === 0) {
      codeSended.value = false;
      codeSecond.value = 60;
    }
  }, 999);
};
const handleChangeLoginType = (type) => {
  loginType.value = type;
};
const handleForgetPassword = () => {
  isForgetPassword.value = true;
};
const handleBack = () => {
  if (!isForgetPassword.value) {
    router.back();
  } else {
    isForgetPassword.value = false;
  }
};
</script>

<style lang="less" scoped>
.login {
  &-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &-back {
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 32px;
    color: #fff;
    font-weight: 700;
  }

  &-top-banner {
    height: 25%;
    width: 100%;
    background-image: url("@/assets/imgs/login-img.jpeg");
    background-size: cover;
  }

  &-main {
    padding: 20px;

    &-input-label {
      font-family: sans-serif;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #333;
    }

    &-input-account,
    &-input-password,
    &-input-code {
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 0;
        outline: none;
        background: rgba(0, 0, 0, 0);
        font-size: 18px;
        line-height: 20px;
        margin: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0);

        &:focus {
          border-bottom: 1px solid rgb(74, 127, 232);
        }
      }
    }

    &-input-code {
      display: flex;
      align-items: center;

      input {
        flex: 1;
      }

      button {
        margin-left: 10px;
        height: 100%;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        background-color: rgb(106, 146, 227);
        color: #fff;
      }

      .sended {
        background-color: rgb(180, 180, 180);
      }
    }

    &-btn {
      button {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #fff;
        border: none;
        background-color: rgb(6, 138, 232);
        border-radius: 5px;

        &:active {
          background-color: rgba(74, 127, 232, 0.64);
        }
      }
    }
  }

  &-other {
    display: flex;
    width: 100%;
    justify-content: center;

    &-option {
      margin: 0 10px;
      position: relative;
      font-size: 15px;
      color: gray;
    }

    &-option + &-option {
      &::after {
        content: "";
        width: 1px;
        height: 10px;
        background-color: gray;
        position: absolute;
        top: 50%;
        left: -10.5px;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
