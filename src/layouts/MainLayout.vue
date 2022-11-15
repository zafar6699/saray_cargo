<template>
  <div>
    <Navbar>
      <template #view>
        <router-view></router-view>
      </template>
    </Navbar>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<style></style>
