import { FC } from "react";
import { isDisclaimer, isVideo, LandingPage } from "../model";
import Video from "./Video";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText, PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";
import PromotionalDisclaimer from "./disclaimer/PromotionalDisclaimer";
import InformationalDisclaimer from "./disclaimer/InformationalDisclaimer";
import CallToAction from "./CallToAction";
import { createElementSmartLink, createItemSmartLink } from "../utils/smartlink";

type PageContentProps = {
  body: LandingPage["elements"]["body_copy"];
  itemId: string;
};

const PageContent: FC<PageContentProps> = ({ body, itemId }) => {
  const portableText = transformToPortableText(body.value);

  return (
    <div className="pt-[104px] pb-40 flex flex-col gap-40"
      {...createItemSmartLink(itemId)}
      {...createElementSmartLink(
        "body_copy"
      )}
    >
      <PortableText value={portableText} components={createPortableTextComponents(body,itemId)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: PageContentProps["body"],
  parentId: PageContentProps["itemId"],
): PortableTextReactResolvers => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value }) => {
      const item = element.linkedItems.find(item => item.system.codename === value.componentOrItem._ref);
      if (!item) {
        return <div>Did not find any item with codename {value.component._ref}</div>;
      }

      if (isVideo(item)) {
        return <Video video={item} parentId={parentId} componentId={item.system.id} />;
      }

      if (isDisclaimer(item)) {
        return item.elements.type.value[0]?.codename === "promotional"
          ? <PromotionalDisclaimer title={item.elements.headline.value} text={item.elements.subheadline.value} parentId={parentId} componentId={item.system.id}  />
          : <InformationalDisclaimer title={item.elements.headline.value} text={item.elements.subheadline.value} parentId={parentId} componentId={item.system.id} />;
      }

      return (
        <CallToAction
          title={item.elements.headline.value}
          description={item.elements.subheadline.value}
          buttonText={item.elements.button_label.value}
          buttonHref={item.elements.button_link.linkedItems[0]?.elements.url.value ?? ""}
          imageSrc={item.elements.image.value[0]?.url}
          imageAlt={item.elements.image.value[0]?.description ?? "alt"}
          imagePosition={item.elements.image_position.value[0]?.codename ?? "left"}
          parentId={parentId}
          componentId={item.system.id}
        />
      );
    },
  },
});

export default PageContent;
