<template>
  <div>
    <n-breadcrumb>
      <n-breadcrumb-item>
        <router-link to="/">
          <n-icon>
            <home-outline></home-outline>
          </n-icon>
          Bosh sahifa
        </router-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item>Foydalanuvchilar</n-breadcrumb-item>
    </n-breadcrumb>
    <n-card size="medium">
      <div class="sort-content">
        <n-form ref="formRef">
          <n-row :gutter="[24, 16]">
            <n-col :span="4">
              <n-form-item label="Viloyat">
                <n-select
                  v-model:value="selectedValue"
                  :options="options"
                  filterable
                  clearable
                  placeholder="Tanlang"
                />
              </n-form-item>
            </n-col>
            <n-col :span="4">
              <n-form-item label="Tuman">
                <n-select
                  v-model:value="selectedValue"
                  :options="options"
                  filterable
                  clearable
                  placeholder="Tanlang"
                />
              </n-form-item>
            </n-col>
            <n-col :span="8">
              <n-form-item label="Oraliq vaqt">
                <n-date-picker
                  v-model:value="range"
                  type="daterange"
                  clearable
                  start-placeholder="Boshlang'ich vaqt"
                  end-placeholder="Tugash vaqt"
                />
              </n-form-item>
            </n-col>
            <n-col :span="4">
              <n-form-item label="Nomi">
                <n-input type="text" placeholder="" />
              </n-form-item>
            </n-col>

            <n-col :span="4" class="start-bottom">
              <n-button block type="warning"> Saralash </n-button>
            </n-col>
          </n-row>
        </n-form>
      </div>
    </n-card>
    <n-card size="medium">
      <div class="page-header mb-24">
        <div class="page-header__left">
          <back-button></back-button>
          <h4 class="page-header__title">Foydaluvchilar</h4>
        </div>

        <div class="page-header__right">
          <router-link to="/users/add">
            <n-button strong type="success" size="large">
              <template #icon>
                <n-icon>
                  <add-outline></add-outline>
                </n-icon>
              </template>
              Qo'shish
            </n-button>
          </router-link>
        </div>
      </div>

      <n-table :single-line="false" class="table-actions mb-24" size="small">
        <thead>
          <tr>
            <th>#</th>
            <th>Ismi</th>
            <th>Familiyasi</th>
            <th>Telefon nomer</th>
            <th>Manzil</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jhon</td>
            <td>Doe</td>
            <td>+998 90 116 66 99</td>
            <td>Toshkent sh., Yunusobod tumani 14/9Toshkent sh.,</td>
            <td><n-tag type="success" size="small"> User </n-tag></td>
            <td><n-switch size="small" v-model:value="status" /></td>
            <td>
              <n-space size="small" :wrap="false" justify="end">
                <n-button strong quaternary circle>
                  <template #icon>
                    <n-icon>
                      <eye-outline></eye-outline>
                    </n-icon>
                  </template>
                </n-button>
                <n-button strong quaternary type="warning" circle>
                  <template #icon>
                    <n-icon>
                      <create-outline></create-outline>
                    </n-icon>
                  </template>
                </n-button>

                <n-popconfirm
                  negative-text="Yo'q"
                  positive-text="Ha"
                  :positive-button-props="{ type: 'error' }"
                >
                  <template #activator>
                    <n-button strong quaternary circle type="error">
                      <template #icon>
                        <n-icon>
                          <trash-outline></trash-outline>
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  Ma'lumot o'chirilsinmi? Uni qayta tiklash imkoni yo'q!!!
                </n-popconfirm>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-space justify="center" class="mb-24">
        <n-empty description="Ma'lumot topilmadi"> </n-empty>
      </n-space>

      <n-space justify="end">
        <n-pagination
          show-quick-jumper
          v-model:page="page"
          :page-count="10"
          size="large"
        />
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      selectedValue: ref(null),
      selectedArray: ref([]),
      status: ref(false),
      page: ref(1),
      datas: ref([]),
      options: [
        {
          label: "Drive My Car",
          value: "song1",
        },
        {
          label: "Norwegian Wood",
          value: "song2",
        },
        {
          label: "You Won't See",
          value: "song3",
        },
        {
          label: "Nowhere Man",
          value: "song4",
        },
        {
          label: "Think For Yourself",
          value: "song5",
        },
        {
          label: "The Word",
          value: "song6",
        },
        {
          label: "Michelle",
          value: "song7",
        },
        {
          label: "What goes on",
          value: "song8",
        },
        {
          label: "Girl",
          value: "song9",
        },
        {
          label: "I'm looking through you",
          value: "song10",
        },
        {
          label: "In My Life",
          value: "song11",
        },
        {
          label: "Wait",
          value: "song12",
        },
      ],

      range: ref<[number, number]>([1183135260000, Date.now()]),
    };
  },
});
</script>

<style></style>
