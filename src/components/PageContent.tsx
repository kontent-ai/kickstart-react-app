import { FC } from "react";
import { PortableText, PortableTextReactComponents, PortableTextTypeComponentProps } from "@portabletext/react";
import { Elements } from "@kontent-ai/delivery-sdk";
import { Video as VideoElement } from "../model";
import Video from "./Video";
import { browserParse, PortableTextComponent, transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextComponents } from "../utils/richtext";

type PageContentProps = {
  body: Elements.RichTextElement<VideoElement>;
};

const PageContent: FC<PageContentProps> = ({ body }) => {
  const parsedTree = browserParse(body.value);
  const portableText = transformToPortableText(parsedTree);

  return (
    <div className="pt-[104px] pb-40 flex flex-col gap-8">
      <PortableText value={portableText} components={createPortableTextComponents(body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: Elements.RichTextElement<VideoElement>,
): Partial<PortableTextReactComponents> => ({
  ...defaultPortableRichTextComponents,
  types: {
    component: ({ value }: PortableTextTypeComponentProps<PortableTextComponent>) => {
      const item = element.linkedItems.find(item => item.system.codename === value.component._ref);
      if (!item) {
        return <div>Did not find any item with codename {value.component._ref}</div>;
      }

      return <Video video={item} />;
    },
  },
});

export default PageContent;
