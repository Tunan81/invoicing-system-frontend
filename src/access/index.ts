import router from "@/router";
import store from "@/store";
import AccessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);

  // 如果之前没登录过，自动登录
  let loginUser = store.state.user.loginUser;
  if (!loginUser || !loginUser.userRole) {
    // 加上await，等待登录成功后再跳转
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // 要跳转的页面需要登录
  if (needAccess !== AccessEnum.NOT_LOGIN) {
    // 如果没有登录，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AccessEnum.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      // 如果没有权限，跳转到无权限页面
      next("/noAuth");
      return;
    }
  }
  next();
});
