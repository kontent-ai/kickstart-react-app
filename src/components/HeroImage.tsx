import { Elements } from "@kontent-ai/delivery-sdk";
import { FC } from "react";
import RenderElement from "./RenderElement";
import { landingPageLink } from "../constants/links";
import ButtonLink from "./ButtonLink";

type HeroImageProps = Readonly<{
  data: {
    headline?: Elements.TextElement;
    subheadline?: Elements.TextElement;
    heroImage?: Elements.AssetsElement;
  };
}>;

const HeroImage: FC<HeroImageProps> = ({ data }) => {
  return (
    <div className="flex flex-col py-10 xl:py-0 xl:flex-row xl:gap-32">
      <div className="xl:basis-1/2 pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] flex flex-col items-center xl:items-start gap-10">
        <RenderElement
          element={data.headline}
          elementCodename="headline"
          requiredElementType="text"
          typeCodename={"landing_page"}
          link={landingPageLink}
        >
          <h1 className="text-center xl:text-left font-libre text-[64px] md:text-[94px] text-creme font-bold leading-[64px] md:leading-[78px]">
            {data.headline?.value}
          </h1>
        </RenderElement>
        <RenderElement
          element={data.subheadline}
          elementCodename="subheadline"
          requiredElementType="text"
          typeCodename={"landing_page"}
          link={landingPageLink}
        >
          <p className="text-center xl:text-left font-sans text-xl text-creme">{data.subheadline?.value}</p>
        </RenderElement>

        <ButtonLink href={"/?preview"}>
          <p>Explore our services</p>
        </ButtonLink>
      </div>
      <div className="xl:basis-1/2">
        <RenderElement
          element={data.heroImage}
          elementCodename="hero_image"
          requiredElementType="asset"
          typeCodename={"landing_page"}
          link={landingPageLink}
        >
          {data.heroImage?.value[0]
            ? (
              <img
                className="object-cover h-full mx-auto"
                width={660}
                height={770}
                src={`${data.heroImage.value[0].url}?auto=format&w=800`}
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
