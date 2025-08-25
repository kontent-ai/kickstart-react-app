import { Component, Show, createMemo } from "solid-js";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { Article } from "../model";
import { Replace } from "../utils/types";

type FeaturedArticleProps = {
  article: Replace<Article, { elements: Partial<Article["elements"]> }>;
};

const FeaturedArticle: Component<FeaturedArticleProps> = (props) => {
  const shouldRender = createMemo(() => Object.entries(props.article.elements).length > 0);

  return (
    <Show when={shouldRender()}>
      <FeaturedComponentBase type="article" image={props.article.elements?.image}>
        <div>
          <Show when={props.article.elements.title}>
            <h2 class="text-center xl:text-left text-5xl font-semibold text-burgundy">
              {props.article.elements.title!.value}
            </h2>
          </Show>
          <Show when={props.article.elements.publish_date?.value}>
            <p class="text-center xl:text-left text-gray-light mt-6 text-lg">
              {`Published on ${
                new Date(props.article.elements.publish_date!.value!).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                })
              }`}
            </p>
          </Show>
          <Show when={props.article.elements.introduction}>
            <p class="text-left text-gray-700 mt-4 text-xl">
              {props.article.elements.introduction!.value}
            </p>
          </Show>
        </div>
        <a href="#" class="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </FeaturedComponentBase>
    </Show>
  );
};

export default FeaturedArticle;
