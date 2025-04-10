import { FC } from "react";

type TagProps = Readonly<{
  text: string;
  className?: string;
}>;

const Tag: FC<TagProps> = ({ text, className = "" }) => (
  <div
    key={text}
    className={`px-4 py-2 border-solid border rounded-full border-[#1D1D1B] ${className}`}
  >
    <p className="text-[#1D1D1B] text-lg">{text}</p>
  </div>
);

type TagsProps = Readonly<{
  tags: string[];
  className?: string;
}>;

const Tags: FC<TagsProps> = ({ tags }) => (
  <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
    {tags.map(tag => <Tag key={tag} text={tag} />)}
  </div>
);

export default Tags;
