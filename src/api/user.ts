import service from "@/plugins/axios";

//登录
export function login(data: object) {
  return service({
    url: "/user/login",
    method: "post",
    data,
  });
}

//注册
export function register(data: object) {
  return service({
    url: "/user/register",
    method: "post",
    data,
  });
}

// 删除用户
export function deleteUser(data: object) {
  return service({
    url: "/user/delete",
    method: "post",
    data,
  });
}

// 分页获取用户列表
export function getUserList(data: object) {
  return service({
    url: "/user/list/page",
    method: "post",
    data,
  });
}

// 获取当前登录用户
export function getLoginUser() {
  return service({
    url: "/user/get/login",
    method: "get",
  });
}

// 修改用户信息
export function updateUser(data: object) {
  return service({
    url: "/user/update",
    method: "post",
    data,
  });
}
