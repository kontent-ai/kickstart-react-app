import { FC } from "react";
import { AssetFragment } from "../graphql/graphql";

type HeroImageProps = Readonly<{
  data: {
    headline?: string;
    subheadline?: string;
    heroImage?: AssetFragment;
  };
}>;

const HeroImage: FC<HeroImageProps> = ({ data }) => {
  return (
    <div className="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-5">
      <div className="xl:basis-1/2">
        {data.headline && (
          <h1 className="text-center xl:text-left font-family-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]">
            {data.headline}
          </h1>
        )}
        {data.subheadline && (
          <p className="text-center xl:text-left font-family-sans text-xl text-gray">{data.subheadline}</p>
        )}
      </div>
      <div className="xl:basis-1/2">
        {data.heroImage && (
          <img
            className="object-cover mx-auto"
            width={670}
            height={440}
            src={`${data.heroImage.url}?auto=format&w=800`}
            alt={data.heroImage.description ?? "image-alt"}
          />
        )}
      </div>
    </div>
  );
};

export default HeroImage;
