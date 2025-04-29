import React from "react";
import PageSection from "../components/PageSection";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import BlogList from "../components/blog/BlogList";
import { BlogPost, Page } from "../model";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { useSearchParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { defaultPortableRichTextResolvers, isEmptyRichText } from "../utils/richtext";

const BlogPage: React.FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const [blogPage, blogs] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["blog_page"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .item<Page>("blog")
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
        queryKey: ["blog_posts"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .items<BlogPost>()
            .type("blog_post")
            .toPromise()
            .then(res => res.data.items)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return [];
              }
              throw err;
            }),
      },
    ],
  });

  if (!blogPage.data || !blogs.data) {
    return <div className="flex-grow" />;
  }

  return (
    <div>
      <PageSection color="bg-creme">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-40 pt-28 pb-32 items-center">
          <h1 className="text-8xl text-burgundy font-bold font-libre">Blog</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-gray font-sans">
            Welcome to the Karma Health blog section, where we share insightful thought leadership and engaging blog
            posts from experts within our institution. Stay tuned for the latest trends, research, and discussions in
            the healthcare industry.
          </p>
        </div>
      </PageSection>=
      {!isEmptyRichText(blogPage.data.item.elements.body.value) && (
        <PageSection color="bg-white">
          <div className="flex flex-col pt-16 mx-auto gap-6">
            <PortableText
              value={transformToPortableText(blogPage.data.item.elements.body.value)}
              components={defaultPortableRichTextResolvers}
            />
          </div>
        </PageSection>
      )}
      <div className="pt-[72px]">
        <BlogList
          blogs={blogs.data.map(b => ({
            imageSrc: b.elements.image?.value[0]?.url,
            title: b.elements.title?.value,
            description: transformToPortableText(b.elements.body?.value),
            readMoreLink: b.elements.url_slug.value,
          }))}
        />
      </div>
    </div>
  );
};

export default BlogPage;
