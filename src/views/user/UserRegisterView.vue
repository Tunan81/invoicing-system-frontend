<template>
  <div class="register">
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
      <a-form-item
        field="userPassword"
        tooltip="密码长度大于6"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" long> 注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { register } from "@/api/user";

const router = useRouter();

/**
 * 表单数据
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (form.userPassword !== form.checkPassword) {
    message.error("两次密码不一致");
    return;
  }
  const res = await register(form);
  if (res.code === 0) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>
