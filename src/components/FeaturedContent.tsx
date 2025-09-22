import { FC } from "react";
import { isArticleType, isEventType, LandingPageType } from "../model";
import PageSection from "./PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "./Divider";

type FeaturedContentProps = {
  featuredContent: LandingPageType["elements"]["featured_content"];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const featuredArticle = featuredContent.linkedItems.find(isArticleType);
  const featuredEvent = featuredContent.linkedItems.find(isEventType);

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
