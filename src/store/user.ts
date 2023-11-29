import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    // async getLoginUser({ commit, state }, payload) {
    //   //从后端获取登录用户信息
    //   const res = await UserControllerService.getLoginUserUsingGet();
    //   if (res.code === 0) {
    //     commit("updateUser", res.data);
    //   } else {
    //     commit("updateUser", {
    //       ...state.loginUser,
    //       userRole: AccessEnum.NOT_LOGIN,
    //     });
    //   }
    // },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
