import { Component, Show, For, createMemo } from "solid-js";
import FeaturedComponentBase from "./FeaturedComponentBase";
import { Event } from "../model";
import { formatDate } from "../utils/date";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { Replace } from "../utils/types";
import { PortableText } from "@portabletext/solid";

type FeaturedEventProps = {
  event: Replace<Event, { elements: Partial<Event["elements"]> }>;
};

const FeaturedEvent: Component<FeaturedEventProps> = (props) => {
  const createTag = (text: string) => (
    <div class="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p class="text-[#1D1D1B] text-lg">{text}</p>
    </div>
  );

  const shouldRender = createMemo(() => Object.entries(props.event.elements).length > 0);

  return (
    <Show when={shouldRender()}>
      <FeaturedComponentBase image={props.event.elements.image} type="event">
        <div>
          <Show when={props.event.elements.name}>
            <h2 class="text-center xl:text-left text-5xl font-semibold text-burgundy">
              {props.event.elements.name!.value}
            </h2>
          </Show>
          <Show when={props.event.elements.start_date}>
            <p class="text-center xl:text-left text-gray-light mt-6 text-lg">
              {`${
                props.event.elements.start_date!.value?.length
                  ? formatDate(props.event.elements.start_date!.value as string)
                  : ""
              }${
                props.event.elements.end_date?.value?.length
                  ? ` - ${formatDate(props.event.elements.end_date.value as string)}`
                  : ""
              }`}
            </p>
          </Show>
          <div class="flex mt-6 gap-2 justify-center xl:justify-normal">
            <For each={props.event.elements.event_type?.value}>
              {(t) => createTag(t.name.toUpperCase())}
            </For>
            <For each={props.event.elements.event_topic?.value}>
              {(t) => createTag(t.name.toUpperCase())}
            </For>
          </div>
          <Show when={props.event.elements.description}>
            <div class="mt-4">
              <PortableText
                value={transformToPortableText(props.event.elements.description!.value ?? "")}
                components={defaultPortableRichTextResolvers}
              />
            </div>
          </Show>
        </div>
        <Show when={props.event.elements.description?.value !== "<p><br></p>"}>
          <a href="#" class="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
            Read more
          </a>
        </Show>
      </FeaturedComponentBase>
    </Show>
  );
};

export default FeaturedEvent;
