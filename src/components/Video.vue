<template>
  <div class="flex flex-col items-center">
    <h2
      v-if="video.elements.headline" 
      class="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center"
    >
      {{ video.elements.headline.value }}
    </h2>
    <p
      v-if="video.elements.description" 
      class="w-4/6 text-center text-xl pt-6 text-gray"
    >
      {{ video.elements.description.value }}
    </p>
    <figure
      v-if="video.elements.video_link?.value"
      class="pt-20"
    >
      <iframe
        class="m-auto w-full lg:w-[900px]"
        :title="video.elements.headline?.value ?? 'Video Title'"
        width="900"
        height="590"
        :src="`${video.elements.video_link.value}${
          video.elements.autoplay?.value[0]?.codename === 'true' ? '&autoplay=1&mute=1' : ''
        }`"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="autoplay"
      />
      <figcaption
        v-if="video.elements.caption" 
        class="text-gray-light block m-auto w-fit text-xl pt-6"
      >
        {{ video.elements.caption.value }}
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { Video as VideoType } from '../model'
import type { Replace } from '../utils/types'

type Props = {
  video: Replace<VideoType, { elements: Partial<VideoType['elements']> }>
}

defineProps<Props>()
</script>