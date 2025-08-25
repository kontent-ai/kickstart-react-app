import { Elements } from "@kontent-ai/delivery-sdk";
import { Component, Show } from "solid-js";

type HeroImageProps = {
  data: {
    headline?: Elements.TextElement;
    subheadline?: Elements.TextElement;
    heroImage?: Elements.AssetsElement;
  };
};

const HeroImage: Component<HeroImageProps> = (props) => {
  return (
    <div class="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-5">
      <div class="xl:basis-1/2">
        <Show when={props.data.headline}>
          <h1 class="text-center xl:text-left font-family-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]">
            {props.data.headline!.value}
          </h1>
        </Show>
        <Show when={props.data.subheadline}>
          <p class="text-center xl:text-left font-family-sans text-xl text-gray">{props.data.subheadline!.value}</p>
        </Show>
      </div>
      <div class="xl:basis-1/2">
        <Show when={props.data.heroImage?.value?.[0]?.url}>
          <img
            class="object-cover mx-auto"
            width={670}
            height={440}
            src={`${props.data.heroImage!.value[0].url}?auto=format&w=800`}
            alt={props.data.heroImage!.value[0].description ?? "image-alt"}
          />
        </Show>
      </div>
    </div>
  );
};

export default HeroImage;
