import { Component, Show } from "solid-js";
import { Video as VideoType } from "../model";
import { Replace } from "../utils/types";

type VideoProps = {
  video: Replace<VideoType, { elements: Partial<VideoType["elements"]> }>;
};

const Video: Component<VideoProps> = (props) => {
  return (
    <div class="flex flex-col items-center">
      <Show when={props.video.elements.headline}>
        <h2 class="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center">
          {props.video.elements.headline!.value}
        </h2>
      </Show>
      <Show when={props.video.elements.description}>
        <p class="w-4/6 text-center text-xl pt-6 text-gray">
          {props.video.elements.description!.value}
        </p>
      </Show>
      <Show when={props.video.elements.video_link?.value}>
        <figure class="pt-20">
          <iframe
            class="m-auto w-full lg:w-[900px]"
            title={props.video.elements.headline?.value ?? "Video Title"}
            width={900}
            height={590}
            src={`${props.video.elements.video_link!.value}${
              props.video.elements.autoplay?.value[0]?.codename === "true" ? "&autoplay=1&mute=1" : ""
            }`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow={"autoplay"}
          />
          <Show when={props.video.elements.caption}>
            <figcaption class="text-gray-light block m-auto w-fit text-xl pt-6">
              {props.video.elements.caption!.value}
            </figcaption>
          </Show>
        </figure>
      </Show>
    </div>
  );
};

export default Video;
