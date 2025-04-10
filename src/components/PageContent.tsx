import { FC } from "react";
import { isDisclaimer, isVideo, LandingPage } from "../model";
import Video from "./Video";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText, PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";
import PromotionalDisclaimer from "./disclaimer/PromotionalDisclaimer";
import InformationalDisclaimer from "./disclaimer/InformationalDisclaimer";
import CallToAction from "./CallToAction";

type PageContentProps = {
  body: LandingPage["elements"]["body_copy"];
};

const PageContent: FC<PageContentProps> = ({ body }) => {
  const portableText = transformToPortableText(body.value);

  return (
    <div className="pt-[104px] pb-40 flex flex-col gap-40">
      <PortableText value={portableText} components={createPortableTextComponents(body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: PageContentProps["body"],
): PortableTextReactResolvers => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value, index }) => {
      const item = element.linkedItems.find(item => item.system.codename === value.componentOrItem._ref);
      if (!item) {
        return <div>Did not find any item with codename {value.component._ref}</div>;
      }

      if (isVideo(item)) {
        return <Video video={item} />;
      }

      if (isDisclaimer(item)) {
        return item.elements.type.value[0].codename === "promotional"
          ? <PromotionalDisclaimer title={item.elements.headline.value} text={item.elements.subheadline.value} />
          : <InformationalDisclaimer title={item.elements.headline.value} text={item.elements.subheadline.value} />;
      }

      return (
        <CallToAction
          title={item.elements.headline.value}
          description={item.elements.subheadline.value}
          buttonText={item.elements.button_label.value}
          buttonHref={item.elements.button_link.value[0]}
          imageSrc={item.elements.image.value[0].url}
          imageAlt={item.elements.image.value[0].description ?? "alt"}
          reverse={index % 2 === 0}
        />
      );
    },
  },
});

export default PageContent;
