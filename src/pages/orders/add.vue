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
            <n-breadcrumb-item>
                <router-link to="/users"> Buyurtmalar </router-link>
            </n-breadcrumb-item>
            <n-breadcrumb-item>Yangi yaratish</n-breadcrumb-item>
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
