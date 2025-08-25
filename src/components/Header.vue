<template>
  <Container>
    <div class="py-8 flex flex-col lg:flex-row gap-5 lg:gap-28 xl:gap-32 items-center">
      <Logo />
      <Navigation />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './Container.vue'
import Logo from './Logo.vue'
import Navigation from './Navigation.vue'
</script>