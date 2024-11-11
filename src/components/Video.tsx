import { FC } from "react";
import { Video as VideoElement } from "../model";

type VideoProps = {
  video: VideoElement;
};

const Video: FC<VideoProps> = ({ video }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center">
        Personalized Nutrition Plans
      </h2>
      <p className="w-4/6 text-center text-xl pt-6 text-gray">
        We create tailored nutrition plans that fit your unique lifestyle, health concerns, and dietary preferences. Our
        experts work closely with you to develop realistic, achievable goals that promote long-term health and
        well-being.
      </p>
      <figure className="pt-20">
        <iframe
          className="m-auto"
          width={900}
          height={590}
          src={`${video.elements.video_link.value}&autoplay=1&mute=1`}
          referrerPolicy="strict-origin-when-cross-origin"
          allow={`${video.elements.autoplay.value && "autoplay"}`}
        />
        <figcaption className="text-gray-light block m-auto w-fit text-xl pt-6">
          {video.elements.caption.value}
        </figcaption>
      </figure>
    </div>
  );
};

export default Video;
