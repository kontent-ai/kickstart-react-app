<template>
  <div :class="color">
    <Container>
      <slot />
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from './Container.vue'

type Props = {
  color: string
}

defineProps<Props>()
</script>