import { FC } from "react";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { Event } from "../model";
import { formatDate } from "../utils/date";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { Replace } from "../utils/types";
import { PortableText } from "@kontent-ai/rich-text-resolver/utils/react";

type FeaturedEventProps = Readonly<{
  event: Replace<Event, { elements: Partial<Event["elements"]> }>;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ event }) => {
  const createTag = (text: string) => (
    <div key={text} className="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p className="text-[#1D1D1B] text-lg">{text}</p>
    </div>
  );

  const shouldRender = Object.entries(event.elements).length > 0;

  return shouldRender
    ? (
      <FeaturedComponentBase image={event.elements.image} type="event">
        <>
          <div>
            {event.elements.name && (
              <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
                {event.elements.name.value}
              </h2>
            )}
            {event.elements.start_date && (
              <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
                {`${
                  event.elements.start_date.value?.length
                    ? formatDate(event.elements.start_date.value as string)
                    : ""
                }${
                  event.elements.end_date?.value?.length
                    ? ` - ${formatDate(event.elements.end_date.value as string)}`
                    : ""
                }`}
              </p>
            )}
            <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
              {event.elements.event_type?.value.map(t => createTag(t.name.toUpperCase()))}
              {event.elements.event_topic?.value.map(t => createTag(t.name.toUpperCase()))}
            </div>
            {event.elements.description && (
              <div className="mt-4">
                <PortableText
                  value={transformToPortableText(event.elements.description.value ?? "")}
                  components={defaultPortableRichTextResolvers}
                />
              </div>
            )}
          </div>
          {event.elements.description?.value !== "<p><br></p>" && (
            <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
              Read more
            </a>
          )}
        </>
      </FeaturedComponentBase>
    )
    : <></>;
};

export default FeaturedEvent;
