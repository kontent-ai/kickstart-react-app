import { FC, PropsWithChildren } from "react";

type FeaturedContentProps = PropsWithChildren<
  Readonly<{
    type: "article" | "event";
    image?: {
      url: string;
      alt: string;
    };
    displayFeatured?: boolean;
  }>
>;

const FeaturedComponentBase: FC<FeaturedContentProps> = ({ type, image, children, displayFeatured = false }) => {
  return (
    <div className="flex flex-col gap-5 xl:gap-16 xl:flex-row py-5 xl:py-[104px] items-center">
      <div className="basis-1/3">
        {image && (
          <>
            {displayFeatured && (
              <span className="px-3.5 py-1.5 absolute text-body-xs bg-azure text-white mt-4 ms-4 rounded-md font-bold">
                {type === "event" ? "FEATURED EVENT" : "FEATURED ARTICLE"}
              </span>
            )}
            <img
              width={440}
              height={280}
              src={image.url ? `${image.url}?auto=format&w=800` : ""}
              alt={image.alt ?? "image alt"}
              className="object-cover rounded-lg static w-[440px] h-[280px]"
            />
          </>
        )}
      </div>
      <div className="basis-2/3">
        {children}
      </div>
    </div>
  );
};

export default FeaturedComponentBase;
