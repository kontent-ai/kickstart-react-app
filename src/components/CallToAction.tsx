import React from "react";

type CallToActionProps = Readonly<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  style?: "linkedItem" | "richTextComponent";
}>;

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  reverse = false,
  style = "linkedItem",
}) => {
  const colors = style === "linkedItem"
    ? {
      title: "text-creme",
      text: "text-creme",
      border: "border-azure",
      linkColor: "bg-azure",
      linkTextColor: "text-white",
    }
    : {
      title: "text-azure",
      text: "text-gray",
      border: "border-burgundy",
      linkColor: "bg-none",
      linkTextColor: "text-grey",
    };

  return (
    <div
      className={`flex flex-col xl:h-[420px] ${reverse ? "xl:flex-row-reverse" : "xl:flex-row"} items-center gap-16`}
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
        <h2 className={`flex text-6xl font-bold ${colors.title}`}>{title}</h2>

        <p className={`flex text-xl ${colors.text} line-clamp-5`}>
          {description}
        </p>

        <div className="flex pt-5">
          <a
            href={buttonHref}
            className={`inline-block px-8 py-3 text-lg font-semibold text-center border-2 border-burgundy rounded-full transition-colors duration-200 ${colors.border} ${colors.linkColor} ${colors.linkTextColor}`}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
