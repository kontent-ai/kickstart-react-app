import { FC } from "react";
import { VideoType } from "../model";
import { Replace } from "../utils/types";
import RenderElement from "./RenderElement";
import { videoLink } from "../constants/links";

type VideoProps = {
  video: Replace<VideoType, { elements: Partial<VideoType["elements"]> }>;
};

const Video: FC<VideoProps> = ({ video }) => {
  return (
    <div className="flex flex-col items-center">
      <RenderElement
        element={video.elements.headline}
        elementCodename="headline"
        requiredElementType="text"
        typeCodename={"video"}
        link={videoLink}
      >
        <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-2/4 text-center">
          {video.elements.headline?.value}
        </h2>
      </RenderElement>
      <RenderElement
        element={video.elements.description}
        elementCodename="description"
        requiredElementType="text"
        typeCodename={"video"}
        link={videoLink}
      >
        <p className="w-4/6 text-center text-xl pt-6 text-gray">
          {video.elements.description?.value}
        </p>
      </RenderElement>
      <RenderElement
        element={video.elements.video_link}
        elementCodename="video_link"
        requiredElementType="text"
        typeCodename={"video"}
        link={videoLink}
      >
        {video.elements.video_link?.value
          ? (
            <figure className="pt-20">
              <iframe
                className="m-auto w-full lg:w-[900px]"
                title={video.elements.headline?.value ?? "Video Title"}
                width={900}
                height={590}
                src={`${video.elements.video_link.value}${video.elements.autoplay?.value[0].codename === "true" ? "&autoplay=1&mute=1" : ""
                  }`}
                referrerPolicy="strict-origin-when-cross-origin"
                allow={"autoplay"}
              />
              <RenderElement
                element={video.elements.caption}
                elementCodename="caption"
                requiredElementType="text"
                typeCodename={"video"}
                link={videoLink}
              >
                <figcaption className="text-gray-light block m-auto w-fit text-xl pt-6">
                  {video.elements.caption?.value}
                </figcaption>
              </RenderElement>
            </figure>
          )
          : <></>}
      </RenderElement>
    </div>
  );
};

export default Video;
