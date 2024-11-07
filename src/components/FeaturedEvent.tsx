import { FC } from "react";
import FeaturedContent from "./FeaturedContent";
import { Event } from "../model";
import { formatDate } from "../utils/date";

type FeaturedEventProps = Readonly<{
  data: Event;
}>;

const FeaturedEvent: FC<FeaturedEventProps> = ({ data }) => {
  const createTag = (text: string) => (
    <div className="px-4 py-2 border-solid border rounded-full border-[#1D1D1B]">
      <p className="text-[#757565] text-lg">{text}</p>
    </div>
  );

  return (
    <FeaturedContent image={data.elements.asset} type="event">
      <>
        <div>
          <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">{data.elements.name.value}</h2>
          <p className="text-center xl:text-left text-gray-light mt-6 text-lg">
            {`${formatDate(data.elements.start_date.value as string)} - ${
              formatDate(data.elements.end_date.value as string)
            }`}
          </p>
          <div className="flex mt-6 gap-2 justify-center xl:justify-normal">
            {data.elements.event_type.value.map(t => createTag(t.name.toUpperCase()))}
            {data.elements.event_topic.value.map(t => createTag(t.name.toUpperCase()))}
          </div>
          <p className="text-center xl:text-left text-gray-700 mt-4 text-xl">
            {data.elements.description.value}
          </p>
        </div>
        <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </>
    </FeaturedContent>
  );
};

export default FeaturedEvent;
