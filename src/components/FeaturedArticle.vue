<template>
  <FeaturedComponentBase
    v-if="shouldRender"
    type="article"
    :image="article.elements?.image"
  >
    <div>
      <h2
        v-if="article.elements.title" 
        class="text-center xl:text-left text-5xl font-semibold text-burgundy"
      >
        {{ article.elements.title.value }}
      </h2>
      <p
        v-if="article.elements.publish_date?.value" 
        class="text-center xl:text-left text-gray-light mt-6 text-lg"
      >
        {{ publishedDateFormatted }}
      </p>
      <p
        v-if="article.elements.introduction" 
        class="text-left text-gray-700 mt-4 text-xl"
      >
        {{ article.elements.introduction.value }}
      </p>
    </div>
    <a
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
import type { Article } from '../model'
import type { Replace } from '../utils/types'

type Props = {
  article: Replace<Article, { elements: Partial<Article['elements']> }>
}

const props = defineProps<Props>()

const shouldRender = computed(() => Object.entries(props.article.elements).length > 0)

const publishedDateFormatted = computed(() => {
  if (!props.article.elements.publish_date?.value) return ''
  return `Published on ${new Date(props.article.elements.publish_date.value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })}`
})
</script>