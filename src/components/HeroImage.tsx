import { Elements } from "@kontent-ai/delivery-sdk";
import { FC } from "react";
import RenderElement from "./RenderElement";
import { contentTypes } from "../model/project";
import { landingPageLink } from "../constants/links";

type HeroImageProps = Readonly<{
  data: {
    headline?: Elements.TextElement;
    subheadline?: Elements.TextElement;
    heroImage?: Elements.AssetsElement;
  };
}>;

const HeroImage: FC<HeroImageProps> = ({ data }) => {
  return (
    <div className="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-5">
      <div className="xl:basis-1/2">
        <RenderElement
          element={data.headline}
          elementCodename="headline"
          requiredElementType="text"
          typeCodename={contentTypes.landing_page.codename}
          link={landingPageLink}
        >
          <h1 className="text-center xl:text-left font-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]">
            {data.headline?.value}
          </h1>
        </RenderElement>
        <RenderElement
          element={data.subheadline}
          elementCodename="subheadline"
          requiredElementType="text"
          typeCodename={contentTypes.landing_page.codename}
          link={landingPageLink}
        >
          <p className="text-center xl:text-left font-sans text-xl text-gray">{data.subheadline?.value}</p>
        </RenderElement>
      </div>
      <div className="xl:basis-1/2">
        <RenderElement
          element={data.heroImage}
          elementCodename="hero_image"
          requiredElementType="asset"
          typeCodename={contentTypes.landing_page.codename}
          link={landingPageLink}
        >
          {data.heroImage?.value[0]
            ? (
              <img
                className=" object-cover mx-auto"
                width={670}
                height={440}
                src={`${data.heroImage.value[0].url}?auto=format`}
                alt={data.heroImage.value[0].description ?? "image-alt"}
              >
              </img>
            )
            : <></>}
        </RenderElement>
      </div>
    </div>
  );
};

export default HeroImage;
