<template>
  <div class="userLoginView">
    <a-form
      style="max-width: 400px; margin: 0 auto"
      auto-label-width
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      size="large"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码长度大于6" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" long>登录</a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="text"
          long
          class="login-form-register-btn"
          style="background: #eeeeee"
          @click="doRegister"
        >
          注册账号
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { login } from "@/api/user";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单数据
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
});

/**
 * 提交表单
 */
const handleSubmit = async () => {
  login(form).then(async (res) => {
    if (res.code === 0) {
      await store.dispatch("user/getLoginUser");
      message.success("登录成功");
      router.push({
        path: "/",
      });
    } else {
      message.error("登录失败" + res.message);
    }
  });
};
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
<style scoped>
.login-form-register-btn {
  color: var(--color-text-3) !important;
}
</style>
