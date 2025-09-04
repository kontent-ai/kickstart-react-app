import HeroImage from "../components/HeroImage";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";
import "../index.css";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import FeaturedContent from "../components/FeaturedContent";
import Layout from "../components/Layout";
import SolutionList from "../components/SolutionListItem";
import { execute } from "../graphql/execute";
import { GetLandingPageQuery } from "../queries/getLandingPage";


const LandingPage: FC = () => {
  // const { environmentId, apiKey } = useAppContext();

  const landingPage = useQuery({
    queryKey: ["landing_page"],
    queryFn: () =>
      execute(GetLandingPageQuery).then(res => {
        return res.data.landingPage_All.items[0];
      }),
  })


  if (!landingPage.data) {
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
              headline: landingPage.data.headline,
              subheadline: landingPage.data.subheadline,
              heroImage: landingPage.data.heroImage.items[0],
            }}
          />
        </PageSection>
        <PageSection color="bg-white">
          <SolutionList />
        </PageSection>
        {landingPage.data.bodyCopy && (
          <PageSection color="bg-white">
            <PageContent body={landingPage.data.bodyCopy} />
          </PageSection>
        )}
        {landingPage.data.featuredContent && (
          <FeaturedContent featuredContent={landingPage.data.featuredContent} />
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
