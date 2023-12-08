import { RouteRecordRaw } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AccessEnum from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: () => import("@/views/user/UserLoginView.vue"),
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: () => import("@/views/user/UserRegisterView.vue"),
      },
    ],
    meta: {
      hideInMenu: true,
      layout: UserLayout,
    },
  },
  {
    path: "/",
    name: "主页",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      layout: BasicLayout,
    },
  },
  {
    path: "/userManage",
    name: "用户管理",
    component: () => import("@/views/user/UserView.vue"),
    meta: {
      layout: BasicLayout,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/purchase",
    name: "采购管理",
    component: () => import("@/views/purchase/purchaseView.vue"),
    meta: {
      layout: BasicLayout,
    },
  },
  {
    path: "/sale",
    name: "销售管理",
    component: () => import("@/views/sale/saleView.vue"),
    meta: {
      layout: BasicLayout,
    },
  },
  {
    path: "/product",
    name: "库存管理",
    component: () => import("@/views/product/productView.vue"),
    meta: {
      layout: BasicLayout,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/notFound/NotFoundView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
