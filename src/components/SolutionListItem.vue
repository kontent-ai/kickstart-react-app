<template>
  <template v-if="solutions && solutions.length > 0">
    <h2 class="text-azure text-[40px] md:text-[64px] leading-[54px] w-full p-8 text-center">
      Solutions Tailored to You
    </h2>
    <SolutionListItemComponent 
      v-for="solution in solutions" 
      :key="solution.system.id" 
      :solution="solution" 
    />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { createClient } from '../utils/client'
import type { Solution } from '../model/content-types/solution'
import { DeliveryError } from '@kontent-ai/delivery-sdk'
import SolutionListItemComponent from './SolutionListItemComponent.vue'

const appStore = useAppStore()
const solutions = ref<ReadonlyArray<Solution> | null>(null)

onMounted(async () => {
  try {
    const res = await createClient(appStore.environmentId, appStore.apiKey)
      .items<Solution>()
      .type('solution')
      .toPromise()
    solutions.value = res.data.items
  } catch (err) {
    if (err instanceof DeliveryError) {
      solutions.value = null
    } else {
      throw err
    }
  }
})
</script>