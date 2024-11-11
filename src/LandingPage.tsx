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
        .then(res => res.data.item),
  });

  if (landingPage.isPending) {
    return <div>Loading...</div>;
  }

  if (landingPage.isError) {
    return <div>Error {landingPage.error.message}</div>;
  }

  return (
    <div>
      <Header />
      <PageSection color="bg-creme">
        <HeroImage
          data={{
            headline: landingPage.data.elements.headline.value,
            subheadline: landingPage.data.elements.subheadline.value,
            heroImage: landingPage.data.elements.hero_image.value[0].url,
          }}
        />
      </PageSection>
      <PageSection color="bg-white">
        <PageContent body={landingPage.data.elements.body_copy} />
      </PageSection>
      <PageSection color="bg-creme">
        <FeaturedArticle article={landingPage.data.elements.featured_content.linkedItems[0] as Article} />
      </PageSection>
      <Divider />
      <PageSection color="bg-creme">
        <FeaturedEvent event={landingPage.data.elements.featured_content.linkedItems[1] as Event} />
      </PageSection>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
