import { FC } from "react";

type TagProps = Readonly<{
  text: string;
  className?: string;
}>;

const Tag: FC<TagProps> = ({ text, className = "" }) => (
  <div
    key={text}
    className={`w-fit px-4 py-2 border-solid border rounded-full border-tag-border-color ${className}`}
  >
    <p className="text-tag-text-color text-body-xs uppercase font-[600]">{text}</p>
  </div>
);

type TagsProps = Readonly<{
  tags: ReadonlyArray<string>;
  orientation?: "horizontal" | "vertical";
  className?: string;
}>;

const Tags: FC<TagsProps> = ({ tags, orientation = "horizontal", className = "" }) => (
  <div
    className={`flex gap-2 justify-center lg:justify-normal ${
      orientation === "vertical" ? "flex-col" : ""
    } ${className}`}
  >
    {tags.map(tag => <Tag key={tag} text={tag} />)}
  </div>
);

export default Tags;
