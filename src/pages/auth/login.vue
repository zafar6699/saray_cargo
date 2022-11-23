<template>
    <n-spin :show="loader">
        <div class="login-background">
            <div class="login-content">
                <n-row gutter="60">
                    <n-col :span="12">
                        <div class="login-left">
                            <img src="@/assets/image/login-photo.webp" alt="" />
                        </div>
                    </n-col>
                    <n-col :span="12">
                        <div class="login-right">
                            <h2 class="login-title">Kirish</h2>

                            <n-form
                                size="large"
                                ref="formRef"
                                :model="user"
                                :rules="rules"
                            >
                                <n-form-item path="login" label="Login">
                                    <n-input
                                        v-model:value="user.login"
                                        placeholder="Loginni kiriting"
                                        @keydown.enter.prevent
                                    />
                                </n-form-item>
                                <n-form-item path="password" label="Parol">
                                    <n-input
                                        v-model:value="user.password"
                                        type="password"
                                        show-password-on="mousedown"
                                        placeholder="Parolni kiriting"
                                        @keydown.enter.prevent
                                    />
                                </n-form-item>

                                <n-button
                                    type="success"
                                    block
                                    size="large"
                                    @click="handleValidateClick"
                                >
                                    Kirish
                                </n-button>
                            </n-form>
                        </div>
                    </n-col>
                </n-row>
            </div>
        </div>
    </n-spin>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const message = useMessage();
const formRef = ref(null);
const user = ref({
    login: "",
    password: null,
});

const loader = ref(false);

const rules = ref({
    login: [
        {
            required: true,
            validator(rule: any, value: any) {
                if (!value) {
                    return new Error("Loginni kiriting");
                }
                return true;
            },
            trigger: ["input", "blur"],
        },
    ],
    password: [
        {
            required: true,
            trigger: ["input", "blur"],
            message: "Parolni kiriting",
        },
    ],
});

function handleValidateClick() {
    const messageReactive = message.loading("Verifying", {
        duration: 0,
    });
    formRef.value?.validate(async (errors: any): any => {
        if (!errors) {
            loader.value = true;
            authStore.authUser(user.value).then(res => {
                if (res.success) {
                    router.push("/orders");
                } else {
                    message.error("Login yoki parol xato");
                }
                loader.value = false;
            });
        } else {
            message.error("Xatolik");
        }
        messageReactive.destroy();
    });
}
</script>

<style lang="scss">
.login-title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 24px;
    text-align: center;
}
.login-background {
    background: #f5f5f5;
    height: 100vh;
    display: flex;
    align-items: center;
}
.login-content {
    width: 800px;
    margin: 0 auto;
    padding: 30px 60px;
    background-color: #ffffff;
    border-radius: 10px;
}

.login-left {
    img {
        width: 100%;
    }
}
</style>
