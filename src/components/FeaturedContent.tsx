import { FC } from "react";
import { isArticle, isEvent, LandingPage } from "../model";
import PageSection from "./PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "./Divider";
import CallToAction from "./CallToAction";

type FeaturedContentProps = {
  featuredContent: LandingPage["elements"]["featured_content"];
};

const FeaturedContent: FC<FeaturedContentProps> = ({ featuredContent }) => {
  const linkedItems = featuredContent.linkedItems.map(
    (item) => {
      if (isArticle(item)) {
        return (
          <PageSection color="bg-creme">
            <FeaturedArticle article={item} />
          </PageSection>
        );
      }

      if (isEvent(item)) {
        return (
          <PageSection color="bg-creme">
            <FeaturedEvent event={item} />
          </PageSection>
        );
      }

      return (
        <PageSection color="bg-burgundy">
          <div className="pt-24 pb-40">
            <CallToAction
              title={item.elements.headline.value}
              description={item.elements.subheadline.value}
              buttonText={item.elements.button_label.value}
              buttonHref={item.elements.button_link.value[0]}
              imageSrc={item.elements.image.value[0].url}
              imageAlt={item.elements.image.value[0].description ?? "alt"}
              style="burgundy"
            />
          </div>
        </PageSection>
      );
    },
  ).flatMap((item, index) => index === featuredContent.linkedItems.length - 1 ? [item] : [item, <Divider />]);

  return (
    linkedItems.map(item => item)
  );
};

export default FeaturedContent;
