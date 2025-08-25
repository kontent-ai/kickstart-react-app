<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue'
import Header from './Header.vue'
</script>