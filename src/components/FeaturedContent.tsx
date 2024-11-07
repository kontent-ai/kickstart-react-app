import { FC, PropsWithChildren } from "react";

type FeaturedContentProps = PropsWithChildren<
  Readonly<{
    type: "article" | "event";
  }>
>;

const FeaturedContent: FC<FeaturedContentProps> = ({ type, children }) => {
  return (
    <div className="flex flex-col gap-5 xl:gap-16 xl:flex-row py-5 xl:py-[104px]">
      <div className="basis-1/3">
        <span className="px-3.5 py-1.5 absolute text-[12px] bg-azure text-white mt-4 ms-4 rounded-md font-bold">
          {type === "event" ? "FEATURED EVENT" : "FEATURED ARTICLE"}
        </span>
        <img
          src="https://s3-alpha-sig.figma.com/img/062b/d1d3/2d721cceacbff2064eeef7982a8625c0?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bOXAT6n19Y5R3XBL~l5J~ANimPCR0dZEIouQP07SW2On8sDkxBWrKBVG-In5PzLAIYEDDRuRxyyrtwocRPMkKF-uzYdERfnpEUjD7OhgFfSGEatwpvfdP95daXB3uYrdKYZ6ygRUWRqPf0yPcvmy6zOM1aclM-VPAoCbAtvTj4qwAff5cEOZ~OOvPwsjJ2gAH~RZuGEibjbFAYIefTtXEtlmgGDpUzLh05Ix7bVL9PULtIOISDzqMPGXHJH84MPXF88lBILOyKbdA7dUNndcGz3Mgq5BI48rDc8N2Xh~t4O6d4Y0VIYJyweSIN4hmWVB~UWmrk5IanqFbccGJvh6TA__"
          alt="Article"
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
