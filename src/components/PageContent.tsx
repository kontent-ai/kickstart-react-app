import type { Elements } from "@kontent-ai/delivery-sdk";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { PortableText, type PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver-react";
import type { FC } from "react";
import type { LandingPageType, VideoType } from "../model/index.ts";
import { defaultPortableRichTextResolvers } from "../utils/richtext.tsx";
import Video from "./Video.tsx";

type PageContentProps = {
  body: LandingPageType["elements"]["body_copy"];
};

const PageContent: FC<PageContentProps> = ({ body }) => {
  const portableText = transformToPortableText(body.value);

  return (
    <div className="pt-[104px] pb-40 flex flex-col gap-8">
      <PortableText value={portableText} components={createPortableTextComponents(body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: Elements.RichTextElement<VideoType>,
): PortableTextReactResolvers => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value }) => {
      const item = element.linkedItems.find(
        (item) => item.system.codename === value.componentOrItem._ref,
      );
      if (!item) {
        return <div>Did not find any item with codename {value.componentOrItem._ref}</div>;
      }

      return <Video video={item} />;
    },
  },
});

export default PageContent;
