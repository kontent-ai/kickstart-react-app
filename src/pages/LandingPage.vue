<template>
  <Layout>
    <div
      v-if="!landingPageData || !Object.entries(landingPageData.elements).length"
      class="grow"
    />
    <div
      v-else
      class="grow"
    >
      <PageSection color="bg-creme">
        <HeroImage
          :data="{
            headline: landingPageData.elements.headline,
            subheadline: landingPageData.elements.subheadline,
            heroImage: landingPageData.elements.hero_image,
          }"
        />
      </PageSection>
      <PageSection color="bg-white">
        <SolutionList />
      </PageSection>
      <PageSection
        v-if="landingPageData.elements.body_copy"
        color="bg-white"
      >
        <PageContent :body="landingPageData.elements.body_copy" />
      </PageSection>
      <FeaturedContent
        v-if="landingPageData.elements.featured_content" 
        :featured-content="landingPageData.elements.featured_content"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { DeliveryError } from '@kontent-ai/delivery-sdk'
import HeroImage from '../components/HeroImage.vue'
import PageContent from '../components/PageContent.vue'
import PageSection from '../components/PageSection.vue'
import type { LandingPage } from '../model'
import { createClient } from '../utils/client'
import { useQuery } from '@tanstack/vue-query'
import { useAppStore } from '../stores/app'
import type { Replace } from '../utils/types'
import FeaturedContent from '../components/FeaturedContent.vue'
import Layout from '../components/Layout.vue'
import SolutionList from '../components/SolutionListItem.vue'

const appStore = useAppStore()

const { data: landingPageData } = useQuery({
  queryKey: ['landing_page'],
  queryFn: async () => {
    try {
      const res = await createClient(appStore.environmentId, appStore.apiKey)
        .items()
        .type('landing_page')
        .limitParameter(1)
        .toPromise()
      return res.data.items[0] as Replace<LandingPage, { elements: Partial<LandingPage['elements']> }> ?? null
    } catch (err) {
      if (err instanceof DeliveryError) {
        return null
      }
      throw err
    }
  },
})
</script>