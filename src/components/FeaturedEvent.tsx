import { FC } from "react";
import FeaturedContent from "./FeaturedContent";
import { Event } from "../model";
import { formatDate } from "../utils/date";
import { browserParse, transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { PortableText } from "@portabletext/react";
import { defaultPortableRichTextComponents } from "../utils/richtext";

type FeaturedEventProps = Readonly<{
  event: Partial<Event>;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ event }) => {
  const descriptionPortableText = transformToPortableText(browserParse(event.elements?.description.value ?? ""));

  const createTag = (text: string) => (
    <div key={text} className="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p className="text-[#1D1D1B] text-lg">{text}</p>
    </div>
  );

  const shouldRender = event.elements?.name.value || event.elements?.description.value !== "<p><br></p>"
    || event.elements?.start_date.value
    || event.elements?.end_date.value || event.elements?.image.value.length || event.elements?.event_topic.value.length
    || event.elements?.event_type.value.length;

  return (
    <FeaturedContent image={event.elements?.image} type="event">
      {shouldRender
        ? (
          <>
            <div>
              <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
                {event.elements?.name.value}
              </h2>
              <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
                {`${
                  event.elements?.start_date.value !== null
                    ? formatDate(event.elements?.start_date.value as string)
                    : ""
                }${
                  event.elements?.end_date.value !== null
                    ? ` - ${formatDate(event.elements?.end_date.value as string)}`
                    : ""
                }`}
              </p>
              <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
                {event.elements?.event_type.value.map(t => createTag(t.name.toUpperCase()))}
                {event.elements?.event_topic.value.map(t => createTag(t.name.toUpperCase()))}
              </div>
              <div className="mt-4">
                <PortableText value={descriptionPortableText} components={defaultPortableRichTextComponents} />
              </div>
            </div>
            {event.elements?.description.value !== "<p><br></p>" && (
              <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
                Read more
              </a>
            )}
          </>
        )
        : <></>}
    </FeaturedContent>
  );
};

export default FeaturedEvent;
