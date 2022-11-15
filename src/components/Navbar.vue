<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px" bordered>
        <div class="header">
          <div class="header-left">
            <img src="@/assets/image/logo.svg" alt="" />
          </div>
          <div class="header-right">
            <h2></h2>
            <div>
              <n-dropdown :options="options" @select="selectUserDropdown">
                <n-button size="large">
                  <template #icon>
                    <span>
                      <n-avatar
                        round
                        size="small"
                        src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png?w=360"
                      />
                    </span>
                  </template>
                  <span style="margin-left: 10px">
                    {{ authStore.user.name }}
                  </span>
                </n-button>
              </n-dropdown>
            </div>
          </div>
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 0px">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="260"
          show-trigger
          :inverted="inverted"
          :native-scrollbar="false"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="20"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout
          content-style="padding: 24px; background-color: #FCFCFC; height: 100%"
          :native-scrollbar="false"
        >
          <slot name="view"></slot>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  HomeOutline,
  PeopleOutline,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import { useAuthStore } from "@/stores/auth";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "index",
          },
        },
        { default: () => "Dashboard" }
      ),
    key: "login",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "users",
          },
        },
        { default: () => "Foydalanuvchilar" }
      ),
    key: "users",
    icon: renderIcon(PeopleOutline),
  },
  {
    label: "Dance Dance Dance",
    key: "Dance Dance Dance",
    icon: renderIcon(BookIcon),
    children: [
      {
        key: "people",
        label: "Beverage",
      },
      {
        label: "Beverage",
        key: "beverage",
      },
      {
        label: "Food",
        key: "food",
      },
      {
        label: "The past increases. The future recedes.",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];
export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    function selectUserDropdown(item) {
      console.log("item", item);
      switch (item) {
        case "logout":
          authStore.logOut();
          router.push("/login");
      }
    }
    return {
      authStore,
      inverted: ref(false),
      menuOptions,
      selectUserDropdown,
      options: [
        {
          label: "Profil",
          key: "profile",
          icon: renderIcon(UserIcon),
        },
        {
          label: "Profilni o'zgartirish",
          key: "editProfile",
          icon: renderIcon(EditIcon),
        },
        {
          label: "Chiqish",
          key: "logout",
          icon: renderIcon(LogoutIcon),
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  &-left {
    width: 260px;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-right {
    padding: 10px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 260px);
  }
}
</style>
