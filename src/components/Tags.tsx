import { FC } from "react";

type TagProps = Readonly<{
  text: string;
  className?: string;
}>;

const Tag: FC<TagProps> = ({ text, className = "" }) => (
  <div
    key={text}
    className={`w-fit px-4 py-2 border-solid border rounded-full border-[#1D1D1B] ${className}`}
  >
    <p className="text-[#1D1D1B] text-[12px] leading-[150%] uppercase font-[600]">{text}</p>
  </div>
);

type TagsProps = Readonly<{
  tags: ReadonlyArray<string>;
  orientation?: "horizontal" | "vertical";
  className?: string;
}>;

const Tags: FC<TagsProps> = ({ tags, orientation = "horizontal" }) => (
  <div className={`flex gap-2 justify-center xl:justify-normal ${orientation === "vertical" ? "flex-col" : ""}`}>
    {tags.map(tag => <Tag key={tag} text={tag} />)}
  </div>
);

export default Tags;
