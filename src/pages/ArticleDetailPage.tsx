import React, { useCallback, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { Article, LanguageCodenames } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { PortableText } from "@portabletext/react";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import PageSection from "../components/PageSection";
import Tags from "../components/Tags";
import { NavLink } from "react-router";
import PersonCard from "../components/PersonCard";
import ArticleList from "../components/articles/ArticleList";
import { createPreviewLink } from "../utils/link";
import { IUpdateMessageData, applyUpdateOnItemAndLoadLinkedItems } from "@kontent-ai/smart-link";
import { useLivePreview } from "../context/SmartLinkContext";
import { createElementSmartLink, createItemSmartLink } from "../utils/smartlink";

const HeroImageAuthorCard: React.FC<{
  prefix?: string;
  firstName: string;
  lastName: string;
  suffix?: string;
  publishDate?: string;
  image: {
    url: string;
    alt: string;
  };
  codename: string;
  language: LanguageCodenames;
}> = ({ prefix, firstName, lastName, suffix, publishDate, image, codename, language }) => {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  return (
    <div className="flex items-center gap-4">
      <img src={image.url} alt={image.alt} className="w-[50px] h-[50px] object-cover rounded-full" />
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-white text-body-md">{language === "es-ES" ? "Por" : "By"}&nbsp;</span>
          <NavLink
            to={createPreviewLink(`/our-team/${codename}`, isPreview)}
            className="text-white text-body-md font-bold hover:text-burgundy underline"
          >
            {prefix && <span>{prefix}</span>}
            {firstName} {lastName}
            {suffix && <span>, {suffix}</span>}
          </NavLink>
        </div>
        {publishDate && (
          <p className="text-body-md text-white">
            {language === "es-ES" ? "Publicado en" : "Published on"} {publishDate}
          </p>
        )}
      </div>
    </div>
  );
};

const useArticle = (slug: string | undefined, isPreview: boolean, lang: string | null) => {
  const { environmentId, apiKey } = useAppContext();
  const [article, setArticle] = useState<Article | null>(null);
  const [articleCodename, setArticleCodename] = useState<string | null>(null);

  const handleLiveUpdate = useCallback((data: IUpdateMessageData) => {
    if (article && data.item.codename === article.system.codename) {
      // Use applyUpdateOnItemAndLoadLinkedItems to ensure all linked content is updated
      applyUpdateOnItemAndLoadLinkedItems(
        article,
        data,
        (codenamesToFetch) => createClient(environmentId, apiKey, isPreview)
          .items()
          .inFilter("system.codename", [...codenamesToFetch])
          .toPromise()
          .then(res => res.data.items)
      ).then((updatedItem) => {
        if (updatedItem) {
          setArticle(updatedItem as Article);
        }
      });
    }
  }, [article, environmentId, apiKey, isPreview]);

  // First fetch to get the article codename
  useEffect(() => {
    if (slug) {
      createClient(environmentId, apiKey, isPreview)
        .items<Article>()
        .type("article")
        .equalsFilter("elements.url_slug", slug)
        .toPromise()
        .then((res) => {
          const item = res.data.items[0];
          if (item) {
            setArticleCodename(item.system.codename);
          } else {
            setArticleCodename(null);
          }
        })
        .catch((err) => {
          if (err instanceof DeliveryError) {
            setArticleCodename(null);
          } else {
            throw err;
          }
        });
    }
  }, [slug, environmentId, apiKey, isPreview]);

  // Second fetch to get the full article data with language
  useEffect(() => {
    if (articleCodename) {
      createClient(environmentId, apiKey, isPreview)
        .items<Article>()
        .type("article")
        .equalsFilter("system.codename", articleCodename)
        .languageParameter((lang ?? "default") as LanguageCodenames)
        .depthParameter(1)
        .toPromise()
        .then((res) => {
          const item = res.data.items[0];
          if (item) {
            setArticle(item);
          } else {
            setArticle(null);
          }
        })
        .catch((err) => {
          if (err instanceof DeliveryError) {
            setArticle(null);
          } else {
            throw err;
          }
        });
    }
  }, [articleCodename, environmentId, apiKey, isPreview, lang]);

  useLivePreview(handleLiveUpdate);

  return article;
};

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const lang = searchParams.get("lang");

  const article = useArticle(slug, isPreview, lang);

  if (!article) {
    return <div className="flex-grow" />;
  }

  const formattedDate = article.elements.publish_date.value
    ? new Date(article.elements.publish_date.value).toLocaleDateString(
      article.system.language === "es-ES" ? "es-ES" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )
    : "";

  const author = article.elements.author.linkedItems[0];
  const authorName = author ? `${author.elements.first_name?.value || ""} ${author.elements.last_name?.value || ""}`.trim() : "";

  return (
    <div className="flex flex-col gap-12">
      <PageSection color="bg-azure">
        <div className="azure-theme flex flex-col-reverse gap-16 lg:flex-row items-center pt-[104px] pb-[160px]">
          <div className="flex flex-col flex-1 gap-6">
            <div className="w-fit text-xs text-body-color border tracking-wider font-[700] border-tag-border-color px-4 py-2 rounded-lg uppercase">
              {article.system.language === "es-ES" ? "Artículo" : "Article"}
            </div>
            <h1 className="text-heading-1 leading-[84%] text-heading-1-color"
            {...createItemSmartLink(article.system.id)}
            {...createElementSmartLink("title")}
            >
              {article.elements.title.value}
            </h1>
            {author && (
              <HeroImageAuthorCard
                prefix={author.elements.prefix?.value}
                firstName={author.elements.first_name?.value || ""}
                lastName={author.elements.last_name?.value || ""}
                suffix={author.elements.suffixes?.value}
                publishDate={formattedDate}
                image={{
                  url: author.elements.image?.value[0]?.url || "",
                  alt: author.elements.image?.value[0]?.description || `Photo of ${authorName}`,
                }}
                codename={author.system.codename}
                language={article.system.language}
              />
            )}
            {article.elements.topics.value.length > 0 && article.system.language === "default" && (
              <Tags
                tags={article.elements.topics.value.map(topic => topic.name)}
                orientation="horizontal"
                className="mt-4"
                itemId={article.system.id}
                elementCodename="topics"
              />
            )}
          </div>
          <div className="flex-1">
            <img
              width={670}
              height={440}
              src={article.elements.image.value[0]?.url ?? ""}
              alt={article.elements.image.value[0]?.description ?? ""}
              className="rounded-lg w-[670px] h-[440px] object-cover"
            />
          </div>
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <div className="flex flex-col gap-12 mx-auto items-center max-w-fit">
          <p className="text-body-xl text-body-color font-[600] w-[728px] max-w-[728px]"
          {...createItemSmartLink(article.system.id)}
          {...createElementSmartLink("introduction")}
          >
            {article.elements.introduction.value}
          </p>
          <div className="rich-text-body flex mx-auto flex-col gap-5 items-center max-w-[728px]"
          {...createItemSmartLink(article.system.id)}
          {...createElementSmartLink("body_copy")}
          >
            <PortableText
              value={transformToPortableText(article.elements.body_copy?.value)}
              components={defaultPortableRichTextResolvers}
            />
          </div>
        </div>
      </PageSection>

      {author && (
        <PageSection color="bg-creme">
          <div className="creme-theme flex gap-24 max-w-[728px] mx-auto py-[104px] items-center ">
            <h2 className="text-heading-2 text-heading-2-color">
              Author
            </h2>
            <div className="text-body-lg text-body-color">
              <PersonCard
                prefix={author.elements.prefix?.value}
                firstName={author.elements.first_name?.value || ""}
                lastName={author.elements.last_name?.value || ""}
                suffix={author.elements.suffixes?.value}
                jobTitle={author.elements.job_title?.value || ""}
                image={{
                  url: author.elements.image?.value[0]?.url || "",
                  alt: author.elements.image?.value[0]?.description || `Photo of ${authorName}`,
                }}
              />
            </div>
          </div>
        </PageSection>
      )}

      {article.elements.related_articles.linkedItems.length > 0 && (
        <PageSection color="bg-white">
          <div className="flex flex-col max-w-6xl mx-auto py-[104px]">
            <h2 className="text-heading-2 text-heading-2-color">
              Related articles
            </h2>
            <ArticleList
              articles={article.elements.related_articles.linkedItems.map(article => ({
                title: article.elements.title.value,
                image: {
                  url: article.elements.image.value[0]?.url ?? "",
                  alt: article.elements.image.value[0]?.description ?? "",
                },
                urlSlug: article.elements.url_slug.value,
                introduction: article.elements.introduction.value,
                publishDate: article.elements.publish_date.value ?? "",
                topics: article.elements.topics.value.map(topic => topic.name),
              }))}
            />
          </div>
        </PageSection>
      )}
    </div>
  );
};

export default ArticleDetailPage;
