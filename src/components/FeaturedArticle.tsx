import React from "react";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { ArticleFragment } from "../graphql/graphql";

type FeaturedArticleProps = Readonly<{
  article: ArticleFragment
}>;

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  const shouldRender = Object.entries(article).length > 0;

  return shouldRender && (
    <FeaturedComponentBase type="article" image={article.image.items[0]}>
      <>
        <div>
          {article.title && (
            <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
              {article.title}
            </h2>
          )}
          {article.publishDate_with_timezone?.value && (
            <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
              {`Published on ${new Date(article.publishDate_with_timezone.value).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
                day: "numeric",
              })
                }`}
            </p>
          )}
          {article.introduction && (
            <p className="text-left text-gray-700 mt-4 text-xl">
              {article.introduction}
            </p>
          )}
        </div>
        <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </>
    </FeaturedComponentBase>
  );
};

export default FeaturedArticle;
