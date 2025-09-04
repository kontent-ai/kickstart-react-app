import React, { useEffect, useState } from "react";
import { execute } from "../graphql/execute";
import { GetSolutionsQuery } from "../queries/getSolutions";
import type { GetSolutionsQueryQuery } from "../graphql/graphql";

const SolutionList: React.FC = () => {
  const [solutions, setSolutions] = useState<GetSolutionsQueryQuery['solution_All']['items'] | null>(null);

  useEffect(() => {
    execute(GetSolutionsQuery)
      .then(res => setSolutions(res.data.solution_All.items))
      .catch((err) => {
        console.error('Failed to fetch solutions:', err);
        setSolutions(null);
      });
  }, []);

  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-full p-8 text-center">
        Solutions Tailored to You
      </h2>
      {solutions.map(solution => <SolutionListItem key={solution._system_.id} solution={solution} />)}
    </>
  );
};

type SolutionListItemProps = Readonly<{
  solution: GetSolutionsQueryQuery['solution_All']['items'][0];
}>;

const SolutionListItem: React.FC<SolutionListItemProps> = ({ solution }) => {
  const shouldRender = Boolean(solution._system_.id);
  
  return shouldRender && (
    <div className="flex flex-col xl:flex-row pt-4 pb-4 gap-10 justify-center items-center">
      <div className="pr-4">
        {solution.image?.items[0]?.url && (
          <img
            width={640}
            height={420}
            src={`${solution.image.items[0].url}?auto=format&w=800`}
            alt={solution.image.items[0].description ?? "image alt"}
            className="object-cover rounded-lg static"
          />
        )}
      </div>
      <div className="xl:w-1/2">
        {solution.headline && (
          <h2 className="text-left text-5xl font-semibold text-burgundy">
            {solution.headline}
          </h2>
        )}
        {solution.introduction && (
          <div className="text-left text-gray-700 mt-4 text-xl">
            {solution.introduction}
            <p>
              <a href="#" className="text-burgundy text-xl mt-6 font-semibold underline">
                Read more
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionList;