import { Elements } from "@kontent-ai/delivery-sdk";
import { ParentProps, ParentComponent, Show, createMemo } from "solid-js";

type FeaturedContentProps = ParentProps<{
  type: "article" | "event";
  image?: Elements.AssetsElement;
}>;

const FeaturedComponentBase: ParentComponent<FeaturedContentProps> = (props) => {
  const img = createMemo(() => props.image?.value[0]);

  return (
    <div class="flex flex-col gap-5 xl:gap-16 xl:flex-row py-5 xl:py-[104px] items-center">
      <div class="basis-1/3">
        <Show when={img()}>
          <span class="px-3.5 py-1.5 absolute text-[12px] bg-azure text-white mt-4 ms-4 rounded-md font-bold">
            {props.type === "event" ? "FEATURED EVENT" : "FEATURED ARTICLE"}
          </span>
          <img
            width={640}
            height={420}
            src={img()!.url ? `${img()!.url}?auto=format&w=800` : ""}
            alt={img()!.description ?? "image alt"}
            class="object-cover rounded-lg static"
          />
        </Show>
      </div>
      <div class="basis-2/3 flex flex-col">
        {props.children}
      </div>
    </div>
  );
};

export default FeaturedComponentBase;
