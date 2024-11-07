import { Elements } from "@kontent-ai/delivery-sdk";
import { FC, PropsWithChildren } from "react";

type FeaturedContentProps = PropsWithChildren<
  Readonly<{
    type: "article" | "event";
    image: Elements.AssetsElement;
  }>
>;

const FeaturedContent: FC<FeaturedContentProps> = ({ type, image, children }) => {
  return (
    <div className="flex flex-col gap-5 xl:gap-16 xl:flex-row py-5 xl:py-[104px]">
      <div className="basis-1/3">
        <span className="px-3.5 py-1.5 absolute text-[12px] bg-azure text-white mt-4 ms-4 rounded-md font-bold">
          {type === "event" ? "FEATURED EVENT" : "FEATURED ARTICLE"}
        </span>
        <img
          src={image.value[0].url}
          alt={type}
          className="object-cover rounded-lg static"
        />
      </div>
      <div className="basis-2/3 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default FeaturedContent;
