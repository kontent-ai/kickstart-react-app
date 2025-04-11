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

  if (!articlesPage.data || !articles.data) {
    return <div className="flex-grow" />;
  }

  return (
    <div className="flex flex-col gap-12">
      <PageSection color="bg-creme">
        <div className="flex flex-row items-center pt-[104px] pb-[160px]">
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
      <PageSection color="bg-white">
        <div className="flex flex-row gap-6">
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
