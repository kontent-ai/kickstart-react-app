import { Component, createSignal, createEffect, For, Show } from "solid-js";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { Solution } from "../model/content-types/solution";
import { Replace } from "../utils/types";
import { DeliveryError } from "@kontent-ai/delivery-sdk";

const SolutionList: Component = () => {
  const { environmentId, apiKey } = useAppContext();

  const [solutions, setSolutions] = createSignal<ReadonlyArray<Solution> | null>(null);

  createEffect(() => {
    createClient(environmentId, apiKey)
      .items<Solution>()
      .type("solution")
      .toPromise()
      .then(res => setSolutions(res.data.items))
      .catch((err) => {
        if (err instanceof DeliveryError) {
          return null;
        }
        throw err;
      });
  });

  return (
    <Show when={solutions() && solutions()!.length > 0}>
      <h2 class="text-azure text-[40px] md:text-[64px] leading-[54px] w-full p-8 text-center">
        Solutions Tailored to You
      </h2>
      <For each={solutions()}>
        {(solution) => <SolutionListItem solution={solution} />}
      </For>
    </Show>
  );
};

type SolutionListItemProps = {
  solution: Replace<Solution, { elements: Partial<Solution["elements"]> }>;
};

const SolutionListItem: Component<SolutionListItemProps> = (props) => {
  const shouldRender = () => Object.entries(props.solution).length > 0;

  return (
    <Show when={shouldRender()}>
      <div class="flex flex-col xl:flex-row pt-4 pb-4 gap-10 justify-center items-center">
        <div class="pr-4">
          <Show when={props.solution.elements.image && props.solution.elements.image.value[0]?.url}>
            <img
              width={640}
              height={420}
              src={`${props.solution.elements.image!.value[0].url}?auto=format&w=800`}
              alt={props.solution.elements.image!.value[0].description ?? "image alt"}
              class="object-cover rounded-lg static"
            />
          </Show>
        </div>
        <div class="xl:w-1/2">
          <Show when={props.solution.elements.headline}>
            <h2 class="text-left text-5xl font-semibold text-burgundy">
              {props.solution.elements.headline!.value}
            </h2>
          </Show>
          <Show when={props.solution.elements.introduction}>
            <div class="text-left text-gray-700 mt-4 text-xl">
              {props.solution.elements.introduction!.value}
              <p>
                <a href="#" class="text-burgundy text-xl mt-6 font-semibold underline">
                  Read more
                </a>
              </p>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
};

export default SolutionList;
