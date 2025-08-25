<template>
  <footer class="w-full">
    <div class="flex flex-col items-center gap-10 py-20">
      <Logo />
      <Navigation />
    </div>
    <Divider />
    <p class="text-[16px] text-gray-light mx-auto w-fit py-[60px]">
      ©2024 Karma Health, LLC. All Rights Reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import Navigation from './Navigation.vue'
import Divider from './Divider.vue'
</script>