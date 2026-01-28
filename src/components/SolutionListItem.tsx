import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { type FC, useEffect, useState } from "react";
import { articleLink } from "../constants/links.ts";
import { useAppContext } from "../context/AppContext.tsx";
import type { SolutionType } from "../model/index.ts";
import { createClient } from "../utils/client.ts";
import type { Replace } from "../utils/types.ts";
import RenderElement from "./RenderElement.tsx";

const SolutionList: FC = () => {
  const { environmentId, apiKey } = useAppContext();

  const [solutions, setSolutions] = useState<ReadonlyArray<SolutionType> | null>(null);

  useEffect(() => {
    createClient(environmentId, apiKey)
      .items<SolutionType>()
      .type("solution")
      .toPromise()
      .then((res) => setSolutions(res.data.items))
      .catch((err) => {
        if (err instanceof DeliveryError) {
          return null;
        }
        throw err;
      });
  }, [environmentId, apiKey]);

  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-azure text-[40px] md:text-[64px] leading-[54px] w-full p-8 text-center">
        Solutions Tailored to You
      </h2>
      {solutions.map((solution) => (
        <SolutionListItem key={solution.system.id} solution={solution} />
      ))}
    </>
  );
};

type SolutionListItemProps = Readonly<{
  solution: Replace<SolutionType, { elements: Partial<SolutionType["elements"]> }>;
}>;

const SolutionListItem: React.FC<SolutionListItemProps> = ({ solution }) => {
  const shouldRender = Object.entries(solution).length > 0;
  return (
    shouldRender && (
      <div className="flex flex-col xl:flex-row pt-4 pb-4 gap-10 justify-center items-center">
        <div className="pr-4">
          <RenderElement
            element={solution.elements.image}
            elementCodename="image"
            requiredElementType="asset"
            typeCodename="solution"
            link={articleLink}
          >
            {!!solution.elements.image && (
              <img
                width={640}
                height={420}
                src={
                  solution.elements.image.value[0]?.url
                    ? `${solution.elements.image.value[0]?.url}?auto=format&w=800`
                    : ""
                }
                alt={solution.elements.image.value[0].description ?? "image alt"}
                className="object-cover rounded-lg static"
              />
            )}
          </RenderElement>
        </div>
        <div className="xl:w-1/2">
          <RenderElement
            element={solution.elements.headline}
            elementCodename="headline"
            requiredElementType="text"
            typeCodename="solution"
            link={articleLink}
          >
            <h2 className="text-left text-5xl font-semibold text-burgundy">
              {solution.elements.headline?.value}
            </h2>
          </RenderElement>
          <RenderElement
            element={solution.elements.introduction}
            elementCodename="introduction"
            requiredElementType="text"
            typeCodename="solution"
            link={articleLink}
          >
            <p className="text-left text-gray-700 mt-4 text-xl">
              {solution.elements.introduction?.value}
              <p>
                <a href="#" className="text-burgundy text-xl mt-6 font-semibold underline">
                  Read more
                </a>
              </p>
            </p>
          </RenderElement>
        </div>
      </div>
    )
  );
};

export default SolutionList;
