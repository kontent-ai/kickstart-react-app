import { FC } from "react";
import { Elements } from "@kontent-ai/delivery-sdk";
import { LandingPageType, VideoType } from "../model";
import Video from "./Video";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText, PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";

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
      const item = element.linkedItems.find(item => item.system.codename === value.componentOrItem._ref);
      if (!item) {
        return <div>Did not find any item with codename {value.component._ref}</div>;
      }

      return <Video video={item} />;
    },
  },
});

export default PageContent;
