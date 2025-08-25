<template>
  <div class="pt-[104px] pb-40 flex flex-col gap-8">
    <PortableText
      :value="portableText"
      :components="portableTextComponents"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import type { LandingPage } from '../model'
import Video from './Video.vue'
import { transformToPortableText, PortableTextComponentOrItem } from '@kontent-ai/rich-text-resolver'
import { defaultPortableRichTextResolvers } from '../utils/richtext'
import { PortableText } from '@portabletext/vue'
import type { PortableTextComponents } from '@portabletext/vue'

type Props = {
  body: LandingPage['elements']['body_copy']
}

const props = defineProps<Props>()

const portableText = computed(() => transformToPortableText(props.body.value))

const portableTextComponents = computed<PortableTextComponents>(() => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value }: { value: PortableTextComponentOrItem }) => {
      const item = props.body.linkedItems.find((item) => item.system.codename === value.componentOrItem._ref)
      if (!item) {
        return h('div', `Did not find any item with codename ${value.componentOrItem._ref}`)
      }
      return h(Video, { video: item })
    },
  },
}))
</script>