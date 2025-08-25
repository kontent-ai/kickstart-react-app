<template>
  <div class="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-5">
    <div class="xl:basis-1/2">
      <h1
        v-if="data.headline" 
        class="text-center xl:text-left font-family-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]"
      >
        {{ data.headline.value }}
      </h1>
      <p
        v-if="data.subheadline" 
        class="text-center xl:text-left font-family-sans text-xl text-gray"
      >
        {{ data.subheadline.value }}
      </p>
    </div>
    <div class="xl:basis-1/2">
      <img
        v-if="data.heroImage?.value?.[0]?.url"
        class="object-cover mx-auto"
        width="670"
        height="440"
        :src="`${data.heroImage.value[0].url}?auto=format&w=800`"
        :alt="data.heroImage.value[0].description ?? 'image-alt'"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Elements } from '@kontent-ai/delivery-sdk'

type Props = {
  data: {
    headline?: Elements.TextElement
    subheadline?: Elements.TextElement
    heroImage?: Elements.AssetsElement
  }
}

defineProps<Props>()
</script>