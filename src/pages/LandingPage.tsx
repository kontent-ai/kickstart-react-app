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
import RenderElement from "../components/RenderElement";
import FeaturedContent from "../components/FeaturedContent";
import { contentTypes } from "../model/project";
import KontentComponentErrorMessage from "../components/KontentComponentErrorMessage";
import Layout from "../components/Layout";

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();

  const [landingPageType, landingPage] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["landing_page_type"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .type(contentTypes.landing_page.codename)
            .toPromise()
            .then(res => res.data)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
      {
        queryKey: ["landing_page"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .items()
            .type(contentTypes.landing_page.codename)
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
  });

  if (!landingPageType.data) {
    return (
      <Layout>
        <div className="flex-grow">
          <PageSection color="white">
            <KontentComponentErrorMessage>
              Missing or invalid content type codename{" "}
              <b>
                <i>{contentTypes.landing_page.codename}</i>
              </b>. To learn more about codenames refer to the{" "}
              <a
                href="https://kontent.ai/learn/docs/content-model/content-types#a-edit-codenames"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Kontent.ai documentation
              </a>.
            </KontentComponentErrorMessage>
          </PageSection>
        </div>
      </Layout>
    );
  }

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
    </Layout>
  );
};

export default LandingPage;
