import { FC } from "react";
import { Video as VideoElement } from "../model";

type VideoProps = {
  video: VideoElement;
};

const Video: FC<VideoProps> = ({ video }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center">
        {video.elements.headline.value}
      </h2>
      <p className="w-4/6 text-center text-xl pt-6 text-gray">
        {video.elements.description.value}
      </p>
      <figure className="pt-20">
        <iframe
          className="m-auto"
          width={900}
          height={590}
          src={`${video.elements.video_link.value}${video.elements.autoplay.value && "autoplay=1"}`}
          referrerPolicy="strict-origin-when-cross-origin"
          allow={"autoplay"}
        />
        <figcaption className="text-gray-light block m-auto w-fit text-xl pt-6">
          {video.elements.caption.value}
        </figcaption>
      </figure>
    </div>
  );
};

export default Video;
