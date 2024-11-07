import React from "react";
import FeaturedContent from "./FeaturedContent";

const FeaturedArticle: React.FC = () => {
  return (
    <FeaturedContent type="article">
      <>
        <div>
          <h2 className="text-center xl:text-left text-5xl font-semibold text-burgundy">Article Title</h2>
          <p className="text-center xl:text-left text-gray-light mt-6 text-lg">Published on Dec 10, 2024</p>
          <p className="text-center xl:text-left text-gray-700 mt-4 text-xl">
            Optimize your athletic performance with our sports nutrition services. We provide tailored advice on fueling
            strategies, hydration, and nutrient timing to help you reach your peak potential.
          </p>
        </div>
        <a href="#" className="text-center xl:text-left text-burgundy text-xl mt-6 font-semibold underline">
          Read more
        </a>
      </>
    </FeaturedContent>
  );
};

export default FeaturedArticle;
