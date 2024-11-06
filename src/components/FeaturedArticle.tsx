import React from "react";

const FeaturedArticle: React.FC = () => {
  return (
    <div className="flex py-[104px]">
      <div className="min-w-fit">
        <span className="px-3.5 py-1.5 absolute text-[12px] bg-azure text-white mt-4 ms-4 rounded-md font-bold">
          FEATURED ARTICLE
        </span>
        <img
          src="https://s3-alpha-sig.figma.com/img/062b/d1d3/2d721cceacbff2064eeef7982a8625c0?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bOXAT6n19Y5R3XBL~l5J~ANimPCR0dZEIouQP07SW2On8sDkxBWrKBVG-In5PzLAIYEDDRuRxyyrtwocRPMkKF-uzYdERfnpEUjD7OhgFfSGEatwpvfdP95daXB3uYrdKYZ6ygRUWRqPf0yPcvmy6zOM1aclM-VPAoCbAtvTj4qwAff5cEOZ~OOvPwsjJ2gAH~RZuGEibjbFAYIefTtXEtlmgGDpUzLh05Ix7bVL9PULtIOISDzqMPGXHJH84MPXF88lBILOyKbdA7dUNndcGz3Mgq5BI48rDc8N2Xh~t4O6d4Y0VIYJyweSIN4hmWVB~UWmrk5IanqFbccGJvh6TA__"
          alt="Article"
          className="object-cover rounded-lg w-[440px] static"
        />
      </div>
      <div className="ml-16 flex flex-col h-[280px]">
        <div>
          <h2 className="text-5xl font-semibold text-burgundy">Article Title</h2>
          <p className="text-gray-light mt-6 text-lg">Published on Dec 10, 2024</p>
          <p className="text-gray-700 mt-4 text-xl">
            Optimize your athletic performance with our sports nutrition services. We provide tailored advice on fueling
            strategies, hydration, and nutrient timing to help you reach your peak potential.
          </p>
        </div>
        <a href="#" className="text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </div>
    </div>
  );
};

export default FeaturedArticle;
