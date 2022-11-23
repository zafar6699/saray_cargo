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
      <n-breadcrumb-item>Buyurtmalar</n-breadcrumb-item>
    </n-breadcrumb>
    <!-- <n-card size="medium">
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
        </n-card> -->
    <n-spin :show="loading">
      <n-card size="medium">
        <div class="page-header mb-24">
          <div class="page-header__left">
            <back-button></back-button>
            <h4 class="page-header__title">Buyurtmalar</h4>
          </div>

          <div class="page-header__right">
            <n-button
              strong
              type="success"
              @click="showModal = true"
              size="large"
            >
              <template #icon>
                <n-icon>
                  <add-outline></add-outline>
                </n-icon>
              </template>
              Qo'shish
            </n-button>
          </div>
        </div>
        <n-table :single-line="false" class="table-actions mb-24" size="small">
          <thead>
            <tr>
              <th>#</th>
              <th>Mahsulot kodi</th>
              <th>Mahsulot nomi</th>
              <th>Ro'yxatdan o'tgan vaqti</th>
              <th>Holati</th>
              <!-- <th>Role</th>
              <th></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>{{ (page - 1) * limit + index + 1 }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.time }}</td>
              <td>{{ item.status }}</td>
              <!-- <td>
                <n-tag type="success" size="small"> User </n-tag>
              </td> -->

              <!-- <td>
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
                    :positive-button-props="{type: 'error'}"
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
              </td> -->
            </tr>
          </tbody>
        </n-table>
        <n-space
          justify="center"
          class="mb-24"
          v-if="!loading && products.length == 0"
        >
          <n-empty description="Ma'lumot topilmadi"> </n-empty>
        </n-space>

        <n-space justify="end">
          <n-pagination
            show-quick-jumper
            v-model:page="page"
            size="large"
            :page-count="pageSize"
            @update:page="pageChange"
          />
        </n-space>
      </n-card>
    </n-spin>

    <n-modal v-model:show="showModal" :mask-closable="true">
      <n-spin :show="loader">
        <n-card
          style="width: 600px"
          title="Modal"
          :bordered="false"
          role="dialog"
          aria-modal="true"
        >
          <template #header-extra>
            <n-button secondary circle @click="showModal = false">
              <template #icon>
                <n-icon
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </template>
          <n-form ref="formRef" :model="formValue" :rules="rules">
            <n-form-item label="Nomi" path="title">
              <n-input
                v-model:value="formValue.title"
                placeholder="Nomini kiriting"
              />
            </n-form-item>
            <n-form-item label="Faylni yuklang" path="file">
              <n-upload v-model="formValue.file">
                <n-button>Fayl</n-button>
              </n-upload>
            </n-form-item>

            <n-form-item label="Vaqtini tanlang" path="time">
              <n-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model:value="formValue.time"
                type="date"
              />
            </n-form-item>

            <n-form-item label="Holati" path="status">
              <n-input
                v-model:value="formValue.status"
                placeholder="Holatini kiriting"
              />
            </n-form-item>

            <n-button type="success" block size="large" @click="addData">
              Saqlash
            </n-button>
          </n-form>
        </n-card>
      </n-spin>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent, onMounted, ref} from "vue";
import $axios from "@/plugins/api";
import {useMessage} from "naive-ui";
const showModal = ref(true);
const formRef = ref(null);
const message = useMessage();
const formValue = ref({
  title: "",
  file: null,
  time: null,
  status: "",
});
const rules = ref({
  title: {
    required: true,
    trigger: "blur",
    message: "To'ldirilishi shart",
  },

  status: {
    required: true,
    trigger: "blur",
    message: "To'ldirilishi shart",
  },
});
const products = ref([]);
const pageSize = ref(0);
const page = ref(1);
const limit = ref(10);
const loading = ref(false);
const loader = ref(false);
async function getProducts() {
  loading.value = true;
  let response = await $axios.get(
    `api/product?page=${page.value}&show_count=${limit.value}`
  );
  pageSize.value = Math.ceil(response?.data?.total / limit.value);
  products.value = response.data.data;
  loading.value = false;
}

onMounted(() => {
  getProducts();
});
function pageChange(page: number) {
  getProducts();
  let body2 = document.getElementsByClassName("n-scrollbar-container");
  body2[1].scrollTop = 0;
}

function addData() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      loader.value = true;

      let date = new Date(formValue.value.time);

      let year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      let day: any = date.getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;

      const fullDate = `${year}-${month}-${day}`;
      console.log("full", formValue.value);
    } else {
      message.error("Ma'lumotlartni to'liq to'ldiring");
    }
  });
}
</script>

<style></style>
