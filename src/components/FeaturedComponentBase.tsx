import { Elements } from "@kontent-ai/delivery-sdk";
import { FC, PropsWithChildren } from "react";
import RenderElement from "./RenderElement";
import { contentTypes } from "../model/project";
import { articleLink, eventLink } from "../constants/links";

type FeaturedContentProps = PropsWithChildren<
  Readonly<{
    type: "article" | "event";
    image?: Elements.AssetsElement;
  }>
>;

const FeaturedComponentBase: FC<FeaturedContentProps> = ({ type, image, children }) => {
  const img = image?.value[0];
  return (
    <div className="flex flex-col gap-5 xl:gap-16 xl:flex-row py-5 xl:py-[104px] items-center">
      <div className="basis-1/3">
        <RenderElement
          element={image}
          elementCodename="image"
          requiredElementType="asset"
          typeCodename={type === "article" ? contentTypes.article.codename : contentTypes.event.codename}
          link={type === "article" ? articleLink : eventLink}
        >
          {img && (
            <>
              <span className="px-3.5 py-1.5 absolute text-[12px] bg-azure text-white mt-4 ms-4 rounded-md font-bold">
                {type === "event" ? "FEATURED EVENT" : "FEATURED ARTICLE"}
              </span>
              <img
                width={640}
                height={420}
                src={image.value[0]?.url ? `${image.value[0]?.url}?auto=format&w=800` : ""}
                alt={image.value[0].description ?? "image alt"}
                className="object-cover rounded-lg static"
              />
            </>
          )}
        </RenderElement>
      </div>
      <div className="basis-2/3 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default FeaturedComponentBase;
