import { defineStore } from "pinia";
import api from "@/plugins/api";
export const useAuthStore = defineStore("authStore", {
    state: () => ({
        user: null,
    }),
    getters: {
        isAuth: state => {
            return state.user ? true : false;
        },
    },
    actions: {
        async getUser() {
            let response;
            if (localStorage.getItem("access_token")) {
                await api.get("api/auth/me").then(res => {
                    this.user = res.data.user;
                    response = {
                        success: true,
                        user: this.user,
                    };
                });
            }

            return response;
        },

        async authUser(data: object) {
            let response = null;
            await api
                .post("api/auth/login", {
                    username: data.login,
                    password: data.password,
                })
                .then(async (res: any) => {
                    localStorage.setItem("access_token", res.data.token);
                    response = await this.getUser();
                });
            return response;
        },

        logOut() {
            this.user = null;
            localStorage.removeItem("access_token");
        },
    },
    persist: {
        enabled: true,
    },
});
