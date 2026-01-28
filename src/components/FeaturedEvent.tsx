import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { PortableText } from "@kontent-ai/rich-text-resolver/utils/react";
import type { FC } from "react";
import { eventLink } from "../constants/links.ts";
import type { EventType } from "../model/index.ts";
import { formatDate } from "../utils/date.ts";
import { defaultPortableRichTextResolvers } from "../utils/richtext.tsx";
import type { Replace } from "../utils/types.ts";
import FeaturedComponentBase from "./FeaturedComponentBase.tsx";
import RenderElement from "./RenderElement.tsx";

type FeaturedEventProps = Readonly<{
  event: Replace<EventType, { elements: Partial<EventType["elements"]> }>;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ event }) => {
  const createTag = (text: string) => (
    <div key={text} className="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p className="text-[#1D1D1B] text-lg">{text}</p>
    </div>
  );

  const shouldRender = Object.entries(event.elements).length > 0;

  return shouldRender ? (
    <FeaturedComponentBase image={event.elements.image} type="event">
      <div>
        <RenderElement
          element={event.elements.name}
          elementCodename="name"
          requiredElementType="text"
          link={eventLink}
          typeCodename="event"
        >
          <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">
            {event.elements.name?.value}
          </h2>
        </RenderElement>
        <RenderElement
          element={event.elements.start_date}
          elementCodename="start_date"
          requiredElementType="date_time"
          link={eventLink}
          typeCodename="event"
        >
          <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
            {`${event.elements.start_date?.value?.length
                ? formatDate(event.elements.start_date?.value)
                : ""
              }${event.elements.end_date?.value?.length
                ? ` - ${formatDate(event.elements.end_date?.value)}`
                : ""
              }`}
          </p>
        </RenderElement>
        <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
          {event.elements.event_type?.value.map((t) => createTag(t.name.toUpperCase()))}
          {event.elements.event_topic?.value.map((t) => createTag(t.name.toUpperCase()))}
        </div>
        <RenderElement
          element={event.elements.description}
          elementCodename="description"
          requiredElementType="rich_text"
          typeCodename="event"
          link={eventLink}
        >
          <div className="mt-4">
            <PortableText
              value={transformToPortableText(event.elements.description?.value ?? "")}
              components={defaultPortableRichTextResolvers}
            />
          </div>
        </RenderElement>
      </div>
      {event.elements.description?.value !== "<p><br></p>" && (
        <a
          href="#"
          className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline"
        >
          Read more
        </a>
      )}
    </FeaturedComponentBase>
  ) : null;
};

export default FeaturedEvent;
