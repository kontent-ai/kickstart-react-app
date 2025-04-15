import { FC } from "react";
import PageSection from "../components/PageSection";
import { useAppContext } from "../context/AppContext";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createClient } from "../utils/client";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import TeamMemberList from "../components/team/TeamMemberList";
import { Page, Person } from "../model/content-types";
import { useSearchParams } from "react-router-dom";

const OurTeamPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const [teamPage, teamMembers] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["team_page"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .item<Page>("our_team")
            .toPromise()
            .then(res => res.data)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
      {
        queryKey: ["team_members"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .items<Person>()
            .type("person")
            .toPromise()
            .then(res => res.data.items)
            .catch((err) => {
              if (err instanceof DeliveryError) {
                return null;
              }
              throw err;
            }),
      },
    ],
  });

  if (!teamPage.data || !teamMembers.data) {
    return <div className="flex-grow" />;
  }

  return (
    <div className="flex flex-col gap-12">
      <PageSection color="bg-creme">
        <div className="flex flex-col-reverse gap-16 lg:gap-0 lg:flex-row items-center py-16 lg:py-0 lg:pt-[104px] lg:pb-[160px]">
          <div className="flex flex-col flex-1 gap-6">
            <h1 className="text-heading-1 text-heading-1-color">
              {teamPage.data.item.elements.headline.value}
            </h1>
            <p className="text-body-lg text-body-color">
              {teamPage.data.item.elements.subheadline.value}
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <img
              width={670}
              height={440}
              src={teamPage.data.item.elements.hero_image?.value[0]?.url ?? "https://placehold.co/670x440"}
              alt={teamPage.data.item.elements.hero_image?.value[0]?.description ?? ""}
              className="rounded-lg"
            />
          </div>
        </div>
      </PageSection>
      <PageSection color="bg-white">
        <div className="pb-[160px] pt-[104px]">
          <TeamMemberList
            teamMembers={teamMembers.data.map(member => ({
              image: {
                url: member.elements.image.value[0]?.url ?? "",
                alt: member.elements.image.value[0]?.description
                  ?? member.elements.first_name.value + " " + member.elements.last_name.value,
              },
              prefix: member.elements.prefix.value,
              suffix: member.elements.suffixes.value,
              firstName: member.elements.first_name.value,
              lastName: member.elements.last_name.value,
              position: member.elements.job_title.value,
              link: member.system.codename,
            }))}
          />
        </div>
      </PageSection>
    </div>
  );
};

export default OurTeamPage;
