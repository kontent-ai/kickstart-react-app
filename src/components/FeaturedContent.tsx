import { Component, Show, createMemo } from "solid-js";
import { isArticle, isEvent, LandingPage } from "../model";
import PageSection from "./PageSection";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";
import Divider from "./Divider";

type FeaturedContentProps = {
  featuredContent: LandingPage["elements"]["featured_content"];
};

const FeaturedContent: Component<FeaturedContentProps> = (props) => {
  const featuredArticle = createMemo(() => props.featuredContent.linkedItems.find(isArticle));
  const featuredEvent = createMemo(() => props.featuredContent.linkedItems.find(isEvent));

  return (
    <>
      <Show when={featuredArticle() || featuredEvent()}>
        <h2 class="text-6xl text-azure text-center">
          Featured Content
        </h2>
      </Show>
      <Show when={featuredArticle()}>
        <PageSection color="bg-creme">
          <FeaturedArticle article={featuredArticle()!} />
        </PageSection>
      </Show>

      <Show when={featuredArticle() && featuredEvent()}>
        <Divider />
      </Show>

      <Show when={featuredEvent()}>
        <PageSection color="bg-white">
          <FeaturedEvent event={featuredEvent()!} />
        </PageSection>
      </Show>
    </>
  );
};

export default FeaturedContent;
