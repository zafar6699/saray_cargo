<script lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
export default {
  components: {
    "main-layout": MainLayout,
    "empty-layout": EmptyLayout,
  },

  computed: {
    layout() {
      return this.$route.meta.layout
        ? `${this.$route.meta.layout}-layout`
        : "main-layout";
    },
  },
};
</script>

<template>
  <n-message-provider>
    <component :is="layout"></component>
  </n-message-provider>
</template>

<style></style>
