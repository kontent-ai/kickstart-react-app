import { FC } from "react";

type ImageWithTagProps = Readonly<{
  image: Readonly<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  tagText: string;
  className?: string;
}>;

const ImageWithTag: FC<ImageWithTagProps> = ({ image, tagText, className }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="px-3.5 py-1.5 absolute text-body-xs bg-azure text-white mt-4 ms-4 rounded-md font-bold">
        {tagText}
      </span>
      <img
        width={image.width}
        height={image.height}
        src={image.url}
        alt={image.alt}
        className={`object-cover static rounded-lg w-[${image.width}px] h-[${image.height}px]`}
      />
    </div>
  );
};

export default ImageWithTag;
