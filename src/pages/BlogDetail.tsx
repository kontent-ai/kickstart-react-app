import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { BlogPost } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { PortableText } from "@portabletext/react";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";

const BlogDetail: React.FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const createTag = (tag: string) => (
    <div className="w-fit text-small border tracking-wider font-[700] text-grey border-azure px-4 py-2 rounded-lg uppercase">
      {tag}
    </div>
  );

  const blogPost = useQuery({
    queryKey: [`blog-post_${slug}`],
    queryFn: () =>
      createClient(environmentId, apiKey, isPreview)
        .items<BlogPost>()
        .equalsFilter("elements.url_slug", slug ?? "")
        .toPromise()
        .then((res) => res.data.items[0])
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  });

  if (!blogPost.data) {
    return <div className="flex-grow" />;
  }

  return (
    <div className="container flex flex-col gap-12">
      <div className="flex flex-row items-center pt-[104px] pb-[160px]">
        <div className="flex flex-col flex-1 gap-6 ">
          {createTag("Blog Post")}
          <h1 className="text-heading-1 text-heading-1-color mb-6 max-w-[12ch]">
            {blogPost.data.elements.title?.value}
          </h1>
        </div>
        <div className="flex flex-col flex-1">
          <img
            width={670}
            height={440}
            src={blogPost.data.elements.image?.value[0]?.url ?? ""}
            alt={blogPost.data.elements.image?.value[0]?.description ?? ""}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="rich-text-body max-w-3xl mx-auto flex flex-col gap-5">
        <PortableText
          value={transformToPortableText(blogPost.data.elements.body?.value)}
          components={defaultPortableRichTextResolvers}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
