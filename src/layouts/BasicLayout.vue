<template>
  <div id="basicLayout">
    <a-layout class="layout-demo" style="height: 100vh">
      <a-layout-sider collapsible breakpoint="xl">
        <div class="logo">
          <span>进销存管理系统</span>
        </div>
        <a-menu
          :style="{ width: '100%' }"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item v-for="item in visibleRoutes" :key="item.path"
            >{{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-row class="grid-demo">
            <a-col flex="150px" style="flex-direction: column-reverse">
              <div
                v-if="store.state.user?.loginUser.userName !== '未登录'"
                style="min-width: 200px"
              >
                <a-dropdown :trigger="['click', 'hover', 'focus']">
                  <div>
                    <a-avatar
                      :size="36"
                      :style="{ marginRight: '8px', cursor: 'pointer' }"
                    >
                      <img alt="avatar" src="@/assets/fufu.jpg" />
                      {{ store.state.user?.loginUser?.userName ?? "未登录" }}
                    </a-avatar>
                    <a>{{ store.state.user?.loginUser.userName }}</a>
                    <icon-caret-down />
                  </div>
                  <template #content>
                    <a-doption>
                      <a-space @click="$router.push({ name: '用户中心' })">
                        <icon-user />
                        <span> 用户中心 </span>
                      </a-space>
                    </a-doption>
                    <a-doption>
                      <a-space @click="$router.push({ name: '用户设置' })">
                        <icon-settings />
                        <span> 用户设置 </span>
                      </a-space>
                    </a-doption>
                    <a-doption>
                      <a-space @click="handleLogout">
                        <icon-export />
                        <span> 退出登录 </span>
                      </a-space>
                    </a-doption>
                  </template>
                </a-dropdown>
              </div>
              <div
                v-else
                style="cursor: pointer; display: flex"
                class="text-text-secondary"
              >
                <a @click="doLogin"> 登录</a>
                <span class="mx-3">或</span>
                <a @click="doRegister">注册</a>
              </div>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout style="padding: 0 24px">
          <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>主页</a-breadcrumb-item>
            <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content>
            <router-view />
          </a-layout-content>
          <a-layout-footer>版权所有© 2023-2023 TuNan</a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import checkAccess from "@/access/checkAccess";
import { routes } from "@/router/routes";

const router = useRouter();
const store = useStore();

const user = store.state.user;

// 过滤掉隐藏的菜单项
const visibleRoutes = computed(() => {
  const loginUser = user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return checkAccess(loginUser, item.meta?.access);
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failuere) => {
  selectedKeys.value = [to.path];
});

// 菜单点击事件
const doMenuClick = (key) => {
  router.push({
    path: key,
  });
};

// 登录
const doLogin = () => {
  console.log(store.state.user?.loginUser);
  if (store.state.user?.loginUser?.userName === "未登录") {
    router.push({
      path: "/user/login",
    });
  }
};

// 注册
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};

const handleLogout = () => {
  //UserControllerService.userLogoutUsingPost();
  location.reload();
};
</script>

<style scoped>
#basicLayout {
}

.layout-demo {
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-stretch: condensed;
  text-align: center;
}

.text-text-secondary {
  color: #c1c1c1;
  font-size: 15px;
}

.mx-3 {
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}
</style>
