import { FC } from "react";
import { isArticle, isEvent, LandingPage } from "../model";
import PageSection from "./PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "./Divider";

type FeaturedContentProps = {
  featuredContent: LandingPage["elements"]["featured_content"];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const featuredArticle = featuredContent.linkedItems.find(isArticle);
  const featuredEvent = featuredContent.linkedItems.find(isEvent);

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
