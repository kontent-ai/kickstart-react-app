import { Component } from "solid-js";
import { Elements } from "@kontent-ai/delivery-sdk";
import { LandingPage, Video as VideoElement } from "../model";
import Video from "./Video";
import { transformToPortableText, PortableTextComponentOrItem } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText, PortableTextTypeComponentProps } from "@portabletext/solid";
import { PortableTextComponents } from "@portabletext/solid";

type PageContentProps = {
  body: LandingPage["elements"]["body_copy"];
};

const PageContent: Component<PageContentProps> = (props) => {
  const portableText = transformToPortableText(props.body.value);

  return (
    <div class="pt-[104px] pb-40 flex flex-col gap-8">
      <PortableText value={portableText} components={createPortableTextComponents(props.body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: Elements.RichTextElement<VideoElement>,
): PortableTextComponents => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: (portableTextItem: PortableTextTypeComponentProps<PortableTextComponentOrItem>) => {
      const item = element.linkedItems.find(item => item.system.codename === portableTextItem.value.componentOrItem._ref);
      if (!item) {
        return <div>Did not find any item with codename {portableTextItem.value.componentOrItem._ref}</div>;
      }

      return <Video video={item} />;
    },
  },
});

export default PageContent;
