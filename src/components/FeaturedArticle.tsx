import type React from "react";
import { articleLink } from "../constants/links.ts";
import type { ArticleType } from "../model/index.ts";
import type { Replace } from "../utils/types.ts";
import FeaturedComponentBase from "./FeaturedComponentBase.tsx";
import RenderElement from "./RenderElement.tsx";

type FeaturedArticleProps = Readonly<{
  article: Replace<ArticleType, { elements: Partial<ArticleType["elements"]> }>;
}>;

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  const shouldRender = Object.entries(article.elements).length > 0;

  return (
    shouldRender && (
      <FeaturedComponentBase type="article" image={article.elements?.image}>
        <div>
          <RenderElement
            element={article.elements.title}
            elementCodename="title"
            requiredElementType="text"
            typeCodename="article"
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
            typeCodename="article"
            link={articleLink}
          >
            <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
              {!!article.elements.publish_date?.value &&
                `Published on ${new Date(article.elements.publish_date.value).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                  },
                )}`}
            </p>
          </RenderElement>
          <RenderElement
            element={article.elements.introduction}
            elementCodename="introduction"
            requiredElementType="text"
            typeCodename="article"
            link={articleLink}
          >
            <p className="text-left text-gray-700 mt-4 text-xl">
              {article.elements.introduction?.value}
            </p>
          </RenderElement>
        </div>
        <a
          href="#"
          className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline"
        >
          Read more
        </a>
      </FeaturedComponentBase>
    )
  );
};

export default FeaturedArticle;
