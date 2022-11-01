import { defineStore } from "pinia";
import api from "@/plugins/api";
export const useAuthStore = defineStore("authStore", {
  id: "auth",
  state: () => ({
    user: null,
  }),
  getters: {
    isAuth: (state) => {
      return state.user ? true : false;
    },
  },
  actions: {
    async getUser() {
      if (localStorage.getItem("access_token")) {
        await api.get("api/v1/profile/info").then((res) => {
          this.user = res.data;
          return {
            success: true,
            user: this.user,
          };
        });
      }
    },

    async authUser(data) {
      await api
        .post("api/v1/user/login", {
          username: data.login,
          password: data.password,
        })
        .then(async (res) => {
          if (res.success) {
            localStorage.setItem("access_token", res.data.token);
            await this.getUser();
          } else {
            return {
              success: false,
            };
          }
        });
    },

    logOut() {
      this.user = null;
      localStorage.removeItem("access_token");
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
