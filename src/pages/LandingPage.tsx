import { DeliveryError } from "@kontent-ai/delivery-sdk";

import HeroImage from "../components/HeroImage";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";
import "../index.css";
import { type LandingPage } from "../model";
import { createClient } from "../utils/client";
import { createQuery } from "@tanstack/solid-query";
import { Component, Show, Suspense } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { Replace } from "../utils/types";
import FeaturedContent from "../components/FeaturedContent";
import Layout from "../components/Layout";
import SolutionList from "../components/SolutionListItem";

const LandingPageContent: Component = () => {
  const { environmentId, apiKey } = useAppContext();

  const landingPageQuery = createQuery(() => ({
    queryKey: ["landing_page"],
    queryFn: () =>
      createClient(environmentId, apiKey)
        .items()
        .type("landing_page")
        .limitParameter(1)
        .toPromise()
        .then(res => res.data.items[0] as Replace<LandingPage, { elements: Partial<LandingPage["elements"]> }> ?? null)
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  }));

  return (
    <Show
      when={landingPageQuery.data && Object.entries(landingPageQuery.data.elements).length}
      fallback={<div class="grow" />}
    >
      <div class="grow">
        <PageSection color="bg-creme">
          <HeroImage
            data={{
              headline: landingPageQuery.data!.elements.headline,
              subheadline: landingPageQuery.data!.elements.subheadline,
              heroImage: landingPageQuery.data!.elements.hero_image,
            }}
          />
        </PageSection>
        <PageSection color="bg-white">
          <SolutionList />
        </PageSection>
        <Show when={landingPageQuery.data!.elements.body_copy}>
          <PageSection color="bg-white">
            <PageContent body={landingPageQuery.data!.elements.body_copy!} />
          </PageSection>
        </Show>
        <Show when={landingPageQuery.data!.elements.featured_content}>
          <FeaturedContent featuredContent={landingPageQuery.data!.elements.featured_content!} />
        </Show>
      </div>
    </Show>
  );
};

const LandingPage: Component = () => {
  return (
    <Layout>
      <Suspense fallback={<div class="grow" />}>
        <LandingPageContent />
      </Suspense>
    </Layout>
  );
};

export default LandingPage;
