import { FC } from "react";
import PageSection from "./PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "./Divider";
import { GetLandingPageQueryQuery } from "../graphql/graphql";

type FeaturedContentProps = {
  featuredContent: GetLandingPageQueryQuery['landingPage_All']['items'][0]['featuredContent'];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const featuredArticle = featuredContent.items.find(item => item.__typename === "Article");
  const featuredEvent = featuredContent.items.find(item => item.__typename === "Event");

  return (
    <>
      {(featuredArticle || featuredEvent) && (
        <h2 className="text-6xl text-azure text-center">
          Featured Content
        </h2>
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
          <PageSection color="bg-white">
            <FeaturedEvent event={featuredEvent} />
          </PageSection>
        )}
    </>
  );
};

export default FeaturedContent;
