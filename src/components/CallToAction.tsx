import React from "react";
import ButtonLink from "./ButtonLink";

type CallToActionProps = Readonly<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  style?: "burgundy" | "default";
}>;

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  reverse = false,
  style = "default",
}) => {
  return (
    <div
      className={`${style === "burgundy" ? "burgundy-theme" : ""} flex flex-col xl:h-[420px] ${
        reverse ? "xl:flex-row-reverse" : "xl:flex-row"
      } items-center gap-16`}
    >
      <div className="rounded-lg w-[560px]">
        <img
          src={imageSrc}
          width={560}
          height={420}
          alt={imageAlt}
          className="rounded object-fit"
        />
      </div>

      <div className="flex xl:flex-1 flex-col gap-5">
        <h2 className={`flex text-6xl font-bold text-heading-2-color`}>{title}</h2>

        <p className={`flex text-xl text-body-color line-clamp-5`}>
          {description}
        </p>

        <div className="flex pt-5">
          <ButtonLink
            href={buttonHref}
          >
            {buttonText}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
