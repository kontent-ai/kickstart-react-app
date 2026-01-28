import { DeliveryError } from "@kontent-ai/delivery-sdk";

import HeroImage from "../components/HeroImage.tsx";
import PageContent from "../components/PageContent.tsx";
import PageSection from "../components/PageSection.tsx";
import "../index.css";
import { useSuspenseQueries } from "@tanstack/react-query";
import type { FC } from "react";
import FeaturedContent from "../components/FeaturedContent.tsx";
import KontentComponentErrorMessage from "../components/KontentComponentErrorMessage.tsx";
import Layout from "../components/Layout.tsx";
import RenderElement from "../components/RenderElement.tsx";
import SolutionList from "../components/SolutionListItem.tsx";
import { landingPageLink } from "../constants/links.ts";
import { useAppContext } from "../context/AppContext.tsx";
import type { LandingPageType } from "../model/index.ts";
import { createClient } from "../utils/client.ts";
import type { Replace } from "../utils/types.ts";

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();

  const [landingPageType, landingPage] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["landing_page_type"],
        queryFn: async () => {
          return await createClient(environmentId, apiKey)
            .type("landing_page")
            .toPromise()
            .then((res) => res.data)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            });
        },
      },
      {
        queryKey: ["landing_page"],
        queryFn: async () => {
          return await createClient(environmentId, apiKey)
            .items()
            .type("landing_page")
            .limitParameter(1)
            .toPromise()
            .then(
              (res) =>
                (res.data.items[0] as Replace<
                  LandingPageType,
                  { elements: Partial<LandingPageType["elements"]> }
                >) ?? null,
            )
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            });
        },
      },
    ],
  });

  if (!landingPageType.data) {
    return (
      <Layout>
        <div className="grow">
          <PageSection color="white">
            <KontentComponentErrorMessage>
              Missing a content type with the codename{"  "}
              <b>
                <i>landing_page</i>
              </b>
              . Please create the{"  "}
              <a
                href="https://kontent.ai/learn/try-kontent-ai/build-the-foundation/create-a-landing-page-structure#a-create-a-landing-page-content-type"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Landing Page content type
              </a>{" "}
              according to the instructions.
            </KontentComponentErrorMessage>
          </PageSection>
        </div>
      </Layout>
    );
  }

  if (!landingPage.data || !Object.entries(landingPage.data.elements).length) {
    return (
      <Layout>
        <div className="grow" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grow">
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
        <RenderElement
          element={landingPage.data.elements.body_copy}
          elementCodename="body_copy"
          requiredElementType="rich_text"
          errorMessageClassName="container"
          typeCodename="landing_page"
          link={landingPageLink}
        >
          <PageSection color="bg-white">
            <PageContent
              // biome-ignore lint/style/noNonNullAssertion: Element guaranteed by RenderElement wrapper
              body={landingPage.data.elements.body_copy!}
            />
          </PageSection>
        </RenderElement>
        <RenderElement
          element={landingPage.data.elements.featured_content}
          elementCodename="featured_content"
          requiredElementType="modular_content"
          errorMessageClassName="container"
          typeCodename="landing_page"
          link={landingPageLink}
        >
          <FeaturedContent
            // biome-ignore lint/style/noNonNullAssertion: Element guaranteed by RenderElement wrapper
            featuredContent={landingPage.data.elements.featured_content!}
          />
        </RenderElement>
      </div>
    </Layout>
  );
};

export default LandingPage;
