import { DeliveryError } from "@kontent-ai/delivery-sdk";

import HeroImage from "../components/HeroImage";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";
import "../index.css";
import { type LandingPage } from "../model";
import { createClient } from "../utils/client";
import { useSuspenseQueries } from "@tanstack/react-query";
import { FC } from "react";
import { useAppContext } from "../context/AppContext";
import { Replace } from "../utils/types";
import FeaturedContent from "../components/FeaturedContent";
import Layout from "../components/Layout";
import SolutionList from "../components/SolutionListItem";

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();

  const landingPage = useSuspenseQueries({
    queries: [
      {
        queryKey: ["landing_page"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .items()
            .type("landing_page")
            .limitParameter(1)
            .toPromise()
            .then(res =>
              res.data.items[0] as Replace<LandingPage, { elements: Partial<LandingPage["elements"]> }> ?? null
            )
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
    ],
  })[0];

  if (!landingPage.data || !Object.entries(landingPage.data.elements).length) {
    return (
      <Layout>
        <div className="flex-grow" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-grow">
        <PageSection color="bg-creme">
          <HeroImage
            data={{
              headline: landingPage.data.elements.headline,
              subheadline: landingPage.data.elements.subheadline,
              heroImage: landingPage.data.elements.hero_image,
            }}
          />
        </PageSection>
        <PageSection color="bg-white">
          <SolutionList />
        </PageSection>
        {landingPage.data.elements.body_copy && (
          <PageSection color="bg-white">
            <PageContent body={landingPage.data.elements.body_copy} />
          </PageSection>
        )}
        {landingPage.data.elements.featured_content && (
          <FeaturedContent featuredContent={landingPage.data.elements.featured_content} />
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
