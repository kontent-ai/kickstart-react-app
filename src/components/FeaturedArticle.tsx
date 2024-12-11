import React from "react";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { Article } from "../model";
import { Replace } from "../utils/types";
import RenderElement from "./RenderElement";
import { contentTypes } from "../model/project";
import { articleLink } from "../constants/links";

type FeaturedArticleProps = Readonly<{
  article: Replace<Article, { elements: Partial<Article["elements"]> }>;
}>;

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  const shouldRender = Object.entries(article.elements).length > 0;

  return shouldRender && (
    <FeaturedComponentBase type="article" image={article.elements?.image}>
      <>
        <div>
          <RenderElement
            element={article.elements.title}
            elementCodename="title"
            requiredElementType="text"
            typeCodename={contentTypes.article.codename}
            link={articleLink}
          >
            <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
              {article.elements.title?.value}
            </h2>
          </RenderElement>
          <RenderElement
            element={article.elements.publish_date}
            elementCodename="publish_date"
            requiredElementType="date_time"
            typeCodename={contentTypes.article.codename}
            link={articleLink}
          >
            <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
              {article.elements.publish_date?.value
                && `Published on ${
                  new Date(article.elements.publish_date.value!).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                  })
                }`}
            </p>
          </RenderElement>
          <RenderElement
            element={article.elements.introduction}
            elementCodename="introduction"
            requiredElementType="text"
            typeCodename={contentTypes.article.codename}
            link={articleLink}
          >
            <p className="text-center xl:text-left text-gray-700 mt-4 text-xl">
              {article.elements.introduction?.value}
            </p>
          </RenderElement>
        </div>
        <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </>
    </FeaturedComponentBase>
  );
};

export default FeaturedArticle;
