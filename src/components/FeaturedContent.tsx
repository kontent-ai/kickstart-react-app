import type { FC } from "react";
import { isArticleType, isEventType, type LandingPageType } from "../model/index.ts";
import Divider from "./Divider.tsx";
import FeaturedArticle from "./FeaturedArticle.tsx";
import FeaturedEvent from "./FeaturedEvent.tsx";
import PageSection from "./PageSection.tsx";

type FeaturedContentProps = {
  featuredContent: LandingPageType["elements"]["featured_content"];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const featuredArticle = featuredContent.linkedItems.find(isArticleType);
  const featuredEvent = featuredContent.linkedItems.find(isEventType);

  return (
    <>
      {!!(featuredArticle ?? featuredEvent) && (
        <h2 className="text-6xl text-azure text-center">Featured Content</h2>
      )}
      {featuredArticle && (
        <PageSection color="bg-creme">
          <FeaturedArticle article={featuredArticle} />
        </PageSection>
      )}

      {!!featuredArticle && !!featuredEvent && <Divider />}

      {featuredEvent && (
        <PageSection color="bg-white">
          <FeaturedEvent event={featuredEvent} />
        </PageSection>
      )}
    </>
  );
};

export default FeaturedContent;
