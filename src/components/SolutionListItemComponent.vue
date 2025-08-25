<template>
  <div
    v-if="shouldRender"
    class="flex flex-col xl:flex-row pt-4 pb-4 gap-10 justify-center items-center"
  >
    <div class="pr-4">
      <img
        v-if="solution.elements.image && solution.elements.image.value[0]?.url"
        width="640"
        height="420"
        :src="`${solution.elements.image.value[0].url}?auto=format&w=800`"
        :alt="solution.elements.image.value[0].description ?? 'image alt'"
        class="object-cover rounded-lg static"
      >
    </div>
    <div class="xl:w-1/2">
      <h2
        v-if="solution.elements.headline"
        class="text-left text-5xl font-semibold text-burgundy"
      >
        {{ solution.elements.headline.value }}
      </h2>
      <div
        v-if="solution.elements.introduction"
        class="text-left text-gray-700 mt-4 text-xl"
      >
        {{ solution.elements.introduction.value }}
        <p>
          <a
            href="#"
            class="text-burgundy text-xl mt-6 font-semibold underline"
          >
            Read more
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Solution } from '../model/content-types/solution'
import type { Replace } from '../utils/types'

type Props = {
  solution: Replace<Solution, { elements: Partial<Solution['elements']> }>
}

const props = defineProps<Props>()

const shouldRender = computed(() => Object.entries(props.solution).length > 0)
</script>