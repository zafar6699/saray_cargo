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

              <n-form size="large" ref="formRef" :model="user" :rules="rules">
                <n-form-item path="phone" label="Login">
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
import { useAuthStore } from "@/stores/auth.js";
const authStore = useAuthStore();
authStore.$onAction(callback, true);
const router = useRouter();
const $axios = inject("$axios");
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
          return new Error("Telefon raqamni kiriting");
        } else if (value.length < 17) {
          return new Error("To'liq to'ldiring");
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

      let response = await authStore.authUser(user.value);
      console.log(response);

      // authStore.authUser(user.value).then((res) => {
      //   console.log(res);
      //   if (res.success) {
      //     router.push("/");
      //   } else {
      //     message.error("Login yoki parol xato");
      //   }
      // });
    } else {
      message.error("Invalid");
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
