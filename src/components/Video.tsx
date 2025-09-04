import { FC } from "react";
import { VideoFragment } from "../graphql/graphql";

type VideoProps = {
  video: VideoFragment;
};

const Video: FC<VideoProps> = ({ video }) => {
  return (
    <div className="flex flex-col items-center">
      {video.headline && (
        <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center">
          {video.headline}
        </h2>
      )}
      {video.description && (
        <p className="w-4/6 text-center text-xl pt-6 text-gray">
          {video.description}
        </p>
      )}
      {video.videoLink && (
        <figure className="pt-20">
          <iframe
            className="m-auto w-full lg:w-[900px]"
            title={video.headline ?? "Video Title"}
            width={900}
            height={590}
            src={`${video.videoLink}${video.autoplay?.items[0]?._system_.codename === "true" ? "&autoplay=1&mute=1" : ""
              }`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow={"autoplay"}
          />
          {video.caption && (
            <figcaption className="text-gray-light block m-auto w-fit text-xl pt-6">
              {video.caption}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
};

export default Video;
