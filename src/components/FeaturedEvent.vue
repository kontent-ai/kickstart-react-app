<template>
  <FeaturedComponentBase
    v-if="shouldRender"
    :image="event.elements.image"
    type="event"
  >
    <div>
      <h2
        v-if="event.elements.name" 
        class="text-center xl:text-left text-5xl font-semibold text-burgundy"
      >
        {{ event.elements.name.value }}
      </h2>
      <p
        v-if="event.elements.start_date" 
        class="text-center xl:text-left text-gray-light mt-6 text-lg"
      >
        {{ dateRange }}
      </p>
      <div class="flex mt-6 gap-2 justify-center xl:justify-normal">
        <div
          v-for="t in event.elements.event_type?.value" 
          :key="t.name" 
          class="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]"
        >
          <p class="text-[#1D1D1B] text-lg">
            {{ t.name.toUpperCase() }}
          </p>
        </div>
        <div
          v-for="t in event.elements.event_topic?.value" 
          :key="t.name" 
          class="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]"
        >
          <p class="text-[#1D1D1B] text-lg">
            {{ t.name.toUpperCase() }}
          </p>
        </div>
      </div>
      <div
        v-if="event.elements.description"
        class="mt-4"
      >
        <PortableText
          :value="transformToPortableText(event.elements.description.value ?? '')"
          :components="defaultPortableRichTextResolvers"
        />
      </div>
    </div>
    <a
      v-if="event.elements.description?.value !== '<p><br></p>'" 
      href="#" 
      class="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline"
    >
      Read more
    </a>
  </FeaturedComponentBase>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FeaturedComponentBase from './FeaturedComponentBase.vue'
import type { Event } from '../model'
import { formatDate } from '../utils/date'
import { transformToPortableText } from '@kontent-ai/rich-text-resolver'
import { defaultPortableRichTextResolvers } from '../utils/richtext'
import type { Replace } from '../utils/types'
import { PortableText } from '@portabletext/vue'

type Props = {
  event: Replace<Event, { elements: Partial<Event['elements']> }>
}

const props = defineProps<Props>()

const shouldRender = computed(() => Object.entries(props.event.elements).length > 0)

const dateRange = computed(() => {
  if (!props.event.elements.start_date?.value?.length) return ''
  
  const startDate = formatDate(props.event.elements.start_date.value as string)
  
  return props.event.elements.end_date?.value?.length
    ? `${startDate} - ${formatDate(props.event.elements.end_date.value as string)}`
    : startDate
})
</script>