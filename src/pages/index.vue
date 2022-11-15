<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <main>
    <pre> {{ authStore.user }} </pre>
  </main>
</template>
