import { FC } from "react";

type HeroImageProps = Readonly<{
  data: {
    headline: string;
    subheadline: string;
    heroImage: string;
  };
}>;

const HeroImage: FC<HeroImageProps> = ({ data }) => {
  return (
    <div className="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-12">
      <div className="xl:basis-1/2">
        <h1 className="text-center xl:text-left font-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]">
          {data.headline}
        </h1>
        <p className="text-center xl:text-left font-sans text-xl text-gray">
          {data.subheadline}
        </p>
      </div>
      <div className="xl:basis-1/2">
        <img
          className=" object-cover"
          src={data.heroImage}
        >
        </img>
      </div>
    </div>
  );
};

export default HeroImage;
