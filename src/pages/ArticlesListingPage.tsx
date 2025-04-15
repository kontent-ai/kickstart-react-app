import { FC, useState } from "react";
import PageSection from "../components/PageSection";
import { useAppContext } from "../context/AppContext";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createClient } from "../utils/client";
import { Page, Article, isArticleType, isGeneralHealthcareTopics } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import ArticleList from "../components/articles/ArticleList";
import Selector, { SelectorOption } from "../components/Selector";
import { useSearchParams } from "react-router-dom";
import ImageWithTag from "../components/ImageWithTag";
import Tags from "../components/Tags";
import ButtonLink from "../components/ButtonLink";

type FeaturedArticleProps = Readonly<{
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  published: string;
  tags: ReadonlyArray<string>;
  description: string;
  urlSlug: string;
}>;
const FeaturedArticle: FC<FeaturedArticleProps> = ({ image, title, published, tags, description, urlSlug }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center pt-[104px] pb-[120px] gap-12">
      <ImageWithTag
        image={{
          url: image.url,
          alt: image.alt,
          width: image.width,
          height: image.height,
        }}
        tagText="Featured Article"
        className="lg:basis-1/2 xl:basis-2/5"
      />

      <div className="lg:basis-1/2 xl:basis-3/5">
        <h2 className="text-heading-2 text-heading-2-color">{title}</h2>
        <p className="text-body-md text-body-color pt-4">{published}</p>
        <Tags tags={tags} className="mt-4" />
        <p className="text-body-lg text-body-color pt-3">
          {description}
        </p>
        <ButtonLink href={urlSlug} className="mt-6">Read More</ButtonLink>
      </div>
    </div>
  );
};

const ArticlesListingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const [articleType, setArticleType] = useState<string>("All");
  const [articleTopic, setArticleTopic] = useState<string>("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const articleTypeCodename = searchParams.get("type");
  const articleTopicCodename = searchParams.get("topic");

  const [articlesPage, articlesTypes, articlesTopics, articles] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["articles_page"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .item<Page>("research")
            .toPromise()
            .then(res => res.data)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
      {
        queryKey: ["articles_types"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .taxonomy("article_type")
            .toPromise()
            .then(res => res.data.taxonomy),
      },
      {
        queryKey: ["articles_topics"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .taxonomy("general_healthcare_topics")
            .toPromise()
            .then(res => res.data.taxonomy),
      },
      {
        queryKey: ["articles_listing"],
        queryFn: () =>
          createClient(environmentId, apiKey)
            .items<Article>()
            .type("article")
            .orderByDescending("elements.publish_date")
            .toPromise()
            .then(res => res.data.items)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
    ],
  });

  const handleArticleTypeChange = (option: SelectorOption) => {
    setArticleType(option.label);
    if (option.label === "All") {
      setSearchParams(prev => {
        prev.delete("type");
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.set("type", option.codename);
        return prev;
      });
    }
  };
  const handleArticleTopicChange = (option: SelectorOption) => {
    setArticleTopic(option.label);
    if (option.label === "All") {
      setSearchParams(prev => {
        prev.delete("topic");
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.set("topic", option.codename);
        return prev;
      });
    }
  };

  if (!articlesPage.data || !articles.data) {
    return <div className="flex-grow" />;
  }

  const featuredArticle = articles.data[0];

  return (
    <div className="flex flex-col">
      <PageSection color="bg-creme">
        <div className="flex flex-col-reverse gap-16 lg:gap-0 lg:flex-row items-center py-16 lg:py-0 lg:pt-[104px] lg:pb-[160px]">
          <div className="flex flex-col flex-1 gap-6 ">
            <h1 className="text-heading-1 text-heading-1-color">
              {articlesPage.data.item.elements.headline.value}
            </h1>
            <p className="text-body-lg text-body-color">
              {articlesPage.data.item.elements.subheadline.value}
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <img
              width={670}
              height={440}
              src={articlesPage.data.item.elements.hero_image?.value[0].url}
              alt={articlesPage.data.item.elements.hero_image?.value[0].description ?? ""}
              className="rounded-lg"
            />
          </div>
        </div>
      </PageSection>
      <PageSection color="bg-burgundy">
        <div className="burgundy-theme">
          <FeaturedArticle
            image={{
              url: featuredArticle.elements.image.value[0].url,
              alt: featuredArticle.elements.image.value[0].description ?? "",
              width: 670,
              height: 440,
            }}
            title={featuredArticle.elements.title.value}
            published={`Published on ${
              new Date(featuredArticle.elements.publish_date.value ?? "").toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
                day: "numeric",
              })
            }`}
            tags={featuredArticle.elements.topics.value.map(t => t.name)}
            description={featuredArticle.elements.introduction.value}
            urlSlug={featuredArticle.elements.url_slug.value}
          />
        </div>
      </PageSection>
      <PageSection color="bg-white">
        <div className="flex flex-row gap-6 pt-16">
          <Selector
            label="Article Type"
            options={[
              { label: "All", codename: "all" },
              ...articlesTypes.data.terms.map(t => ({ label: t.name, codename: t.codename })),
            ]}
            selectedOption={articleType}
            onChange={handleArticleTypeChange}
          />
          <Selector
            label="Article Topic"
            options={[
              { label: "All", codename: "all" },
              ...articlesTopics.data.terms.map(t => ({ label: t.name, codename: t.codename })),
            ]}
            selectedOption={articleTopic}
            onChange={handleArticleTopicChange}
          />
        </div>
      </PageSection>
      <ArticleList
        articles={articles.data.filter(a =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          isArticleType(articleTypeCodename)
            ? a.elements.article_type.value.find(t => t.codename === articleTypeCodename)
            : true
        )
          .filter(a =>
            isGeneralHealthcareTopics(articleTopicCodename)
              ? a.elements.topics.value.find(t => t.codename === articleTopicCodename)
              : true
          )
          .map(article => ({
            image: {
              url: article.elements.image.value[0].url,
              alt: article.elements.image.value[0].description ?? "",
            },
            title: article.elements.title.value,
            introduction: article.elements.introduction.value,
            publishDate: article.elements.publish_date.value
              ? new Date(article.elements.publish_date.value).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              : "No date",
            topics: article.elements.topics.value.map(topic => topic.name),
            urlSlug: article.elements.url_slug.value,
          }))}
      />
    </div>
  );
};

export default ArticlesListingPage;
