import { DeliveryError } from "@kontent-ai/delivery-sdk";
import Divider from "./components/Divider";
import FeaturedArticle from "./components/FeaturedArticle";
import FeaturedEvent from "./components/FeaturedEvent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import PageContent from "./components/PageContent";
import PageSection from "./components/PageSection";
import "./index.css";
import type { Article, Event, LandingPage } from "./model";
import { createClient } from "./utils/client";
import { useQuery } from "@tanstack/react-query";

const LandingPage = () => {
  const landingPage = useQuery({
    queryKey: ["landing_page"],
    queryFn: () =>
      createClient(
        import.meta.env.VITE_ENVIRONMENT_ID!,
        import.meta.env.VITE_DELIVERY_API_KEY!,
      )
        .item<LandingPage>("landing_page")
        .toPromise()
        .then(res => {
          console.log(res.data.item);
          return res.data.item as LandingPage;
        })
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  });

  const featuredArticle = landingPage.data?.elements.featured_content.linkedItems.find(i =>
    i.system.codename === "featured_article"
  ) as Article;
  const featuredEvent = landingPage.data?.elements.featured_content.linkedItems.find(i =>
    i.system.codename === "featured_event"
  ) as Event;

  if (landingPage.isPending) {
    return <div>Loading...</div>;
  }

  if (landingPage.isError) {
    return <div>Error {landingPage.error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {landingPage.data
        ? (
          <div className="flex-grow">
            {(landingPage.data.elements.headline.value || landingPage.data.elements.subheadline.value
              || landingPage.data.elements.hero_image.value.length)
              && (
                <PageSection color="bg-creme">
                  <HeroImage
                    data={{
                      headline: landingPage.data.elements.headline.value,
                      subheadline: landingPage.data.elements.subheadline.value,
                      heroImage: landingPage.data.elements.hero_image,
                    }}
                  />
                </PageSection>
              )}
            {landingPage.data.elements.body_copy.value !== "<p><br></p>"
              && (
                <PageSection color="bg-white">
                  <PageContent body={landingPage.data.elements.body_copy} />
                </PageSection>
              )}
            {featuredArticle
              && (
                <PageSection color="bg-creme">
                  <FeaturedArticle article={featuredArticle} />
                </PageSection>
              )}

            {featuredArticle && featuredEvent && <Divider />}
            {featuredEvent
              && (
                <PageSection color="bg-creme">
                  <FeaturedEvent event={landingPage.data.elements.featured_content.linkedItems[1] as Event} />
                </PageSection>
              )}
          </div>
        )
        : <div className="flex-grow" />}
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
