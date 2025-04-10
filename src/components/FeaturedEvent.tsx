import { FC } from "react";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { Event } from "../model";
import { formatDate } from "../utils/date";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { Replace } from "../utils/types";
import RenderElement from "./RenderElement";
import { eventLink } from "../constants/links";
import { PortableText } from "@kontent-ai/rich-text-resolver/utils/react";
import Tags from "./Tags";

type FeaturedEventProps = Readonly<{
  event: Replace<Event, { elements: Partial<Event["elements"]> }>;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ event }) => {
  const shouldRender = Object.entries(event.elements).length > 0;

  return shouldRender
    ? (
      <FeaturedComponentBase image={event.elements.image} type="event">
        <>
          <div>
            <RenderElement
              element={event.elements.name}
              elementCodename="name"
              requiredElementType="text"
              link={eventLink}
              typeCodename={"event"}
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
              typeCodename={"event"}
            >
              <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
                {`${
                  event.elements.start_date?.value?.length
                    ? formatDate(event.elements.start_date?.value as string)
                    : ""
                }${
                  event.elements.end_date?.value?.length
                    ? ` - ${formatDate(event.elements.end_date?.value as string)}`
                    : ""
                }`}
              </p>
            </RenderElement>
            <Tags
              tags={[...event.elements.event_type?.value ?? [], ...event.elements.event_topic?.value ?? []].map(t =>
                t.name
              )}
            />
            <RenderElement
              element={event.elements.description}
              elementCodename="description"
              requiredElementType="rich_text"
              typeCodename={"event"}
              link={eventLink}
              children={() => (
                <div className="mt-4">
                  <PortableText
                    value={transformToPortableText(event.elements.description?.value ?? "")}
                    components={defaultPortableRichTextResolvers}
                  />
                </div>
              )}
            >
            </RenderElement>
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
