import React from "react";
import FeaturedArticle from "../FeaturedArticle";
import { interleave } from "../../utils/array";
import Divider from "../Divider";
import PageSection from "../PageSection";

// Define the ArticleData type with a flattened structure
type ArticleData = Readonly<{
  image: Readonly<{
    url: string;
    alt: string;
  }>;
  title: string;
  introduction: string;
  publishDate: string;
  topics: ReadonlyArray<string>;
  urlSlug: string;
}>;

type ArticleListProps = Readonly<{
  articles: ReadonlyArray<ArticleData>;
}>;

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="flex flex-col items-center ">
      {articles.length === 0 ? <p className="text-center text-grey text-body-xl">No articles available</p> : (
        interleave(
          articles.map((article, index) => (
            <PageSection color="bg-white">
              <FeaturedArticle
                key={index}
                article={{
                  image: article.image,
                  title: article.title,
                  introduction: article.introduction,
                  publishDate: article.publishDate,
                  topics: article.topics,
                }}
                urlSlug={article.urlSlug}
              />
            </PageSection>
          )),
          <Divider />,
        )
      )}
    </div>
  );
};

export default ArticleList;
