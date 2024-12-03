import { DeliveryError } from "@kontent-ai/delivery-sdk";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroImage from "../components/HeroImage";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";
import "../index.css";
import { type LandingPage } from "../model";
import { createClient } from "../utils/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useAppContext } from "../context/AppContext";
import { Replace } from "../utils/types";
import RenderElement from "../components/RenderElement";
import FeaturedContent from "../components/FeaturedContent";
import { contentTypes } from "../model/project";

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();

  const landingPage = useSuspenseQuery({
    queryKey: ["landing_page"],
    queryFn: () =>
      createClient(environmentId, apiKey)
        .items()
        .type(contentTypes.landing_page.codename)
        .limitParameter(1)
        .toPromise()
        .then(res => res.data.items[0] as Replace<LandingPage, { elements: Partial<LandingPage["elements"]> }> ?? null)
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {landingPage.data && Object.entries(landingPage.data.elements).length
        ? (
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
            <RenderElement
              element={landingPage.data.elements.body_copy}
              elementCodename="body_copy"
              requiredElementType="rich_text"
              errorMessageClassName="container"
            >
              <PageSection color="bg-white">
                <PageContent body={landingPage.data.elements.body_copy!} />
              </PageSection>
            </RenderElement>
            <RenderElement
              element={landingPage.data.elements.featured_content}
              elementCodename="featured_content"
              requiredElementType="modular_content"
              errorMessageClassName="container"
            >
              <FeaturedContent featuredContent={landingPage.data.elements.featured_content!}></FeaturedContent>
            </RenderElement>
          </div>
        )
        : <div className="flex-grow" />}
      <Footer />
    </div>
  );
};

export default LandingPage;
