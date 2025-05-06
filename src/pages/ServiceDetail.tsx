import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { Service, Person, LanguageCodenames } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { PortableText } from "@portabletext/react";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import PageSection from "../components/PageSection";
import Tags from "../components/Tags";
import { NavLink, useSearchParams } from "react-router";
import { createPreviewLink } from "../utils/link";
import { useCustomRefresh } from "../context/SmartLinkContext";
import { IRefreshMessageData, IRefreshMessageMetadata } from "@kontent-ai/smart-link";

const TeamMemberCard: React.FC<{
  prefix?: string;
  firstName: string;
  lastName: string;
  suffix?: string;
  jobTitle: string;
  image: {
    url?: string;
    alt: string;
  };
  codename: string;
}> = ({ prefix, firstName, lastName, suffix, jobTitle, image, codename }) => {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  return (
    <div className="flex gap-4 items-center">
      <img src={image.url} alt={image.alt} className="w-[95px] h-[95px] object-cover rounded-full" />
      <div className="flex flex-col gap-2 items-start">
        <NavLink
          to={createPreviewLink(`/our-team/${codename}`, isPreview)}
          className="text-heading-4 underline text-burgundy hover:text-azure"
        >
          {prefix && <span>{prefix}</span>}
          {firstName} {lastName}
          {suffix && <span>, {suffix}</span>}
        </NavLink>
        <p className="text-small text-grey text-center">
          {jobTitle}
        </p>
      </div>
    </div>
  );
};

const ServiceDetail: React.FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const lang = searchParams.get("lang");

  const serviceData = useQuery({
    queryKey: [`service-detail_${slug}`],
    queryFn: () =>
      createClient(environmentId, apiKey, isPreview)
        .items<Service>()
        .type("service")
        .equalsFilter("elements.url_slug", slug ?? "")
        .languageParameter((lang ?? "default") as LanguageCodenames)
        .toPromise()
        .then((res) => res.data.items[0])
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  });

  const onRefresh = useCallback(
    (_: IRefreshMessageData, metadata: IRefreshMessageMetadata, originalRefresh: () => void) => {
      if (metadata.manualRefresh) {
        originalRefresh();
      } else {
        serviceData.refetch();
      }
    },
    [serviceData],
  );

  useCustomRefresh(onRefresh);

  if (!serviceData.data) {
    return <div className="flex-grow" />;
  }

  const service = serviceData.data;

  return (
    <div className="flex flex-col gap-12">
      <PageSection color="bg-azure">
        <div className="azure-theme flex flex-col-reverse gap-16 lg:gap-0 lg:flex-row items-center pt-[104px] pb-[160px]">
          <div className="flex flex-col flex-1 gap-6">
            <div className="w-fit text-small text-body-color border tracking-wider font-[700] border-white px-4 py-2 rounded-lg uppercase">
              Service
            </div>
            <h1 className="text-heading-1 text-heading-1-color max-w-[12ch]">
              {service.elements.name.value}
            </h1>
            <p className="text-body-lg text-body-color text-[32px] leading-[130%]">
              {service.elements.summary.value}
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <img
              width={670}
              height={440}
              src={service.elements.image.value[0]?.url ?? ""}
              alt={service.elements.image.value[0]?.description ?? ""}
              className="rounded-lg w-[670px] h-[440px]"
            />
          </div>
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 max-w-6xl mx-auto">
          <div className="rich-text-body lg:basis-2/3 flex-mx-auto flex flex-col gap-5">
            <PortableText
              value={transformToPortableText(service.elements.description?.value)}
              components={defaultPortableRichTextResolvers}
            />
          </div>

          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-10">
              <h2 className="text-heading-2 text-burgundy">
                Medical Specialties
              </h2>
              <Tags
                tags={service.elements.medical_specialties.value.map(specialty => specialty.name)}
                orientation="vertical"
              />
            </div>

            {service.elements.team?.value.length > 0 && (
              <div className="max-w-3xl">
                <h2 className="text-heading-2 text-burgundy mb-10">Team</h2>
                <div className="flex flex-col gap-6">
                  {service.elements.team.linkedItems.map((person: Person) => (
                    <TeamMemberCard
                      key={person.system.id}
                      prefix={person.elements.prefix?.value}
                      firstName={person.elements.first_name?.value || ""}
                      lastName={person.elements.last_name?.value || ""}
                      suffix={person.elements.suffixes?.value}
                      jobTitle={person.elements.job_title?.value || ""}
                      image={{
                        url: person.elements.image?.value[0]?.url || "",
                        alt: person.elements.image?.value[0]?.description
                          || `Photo of ${person.elements.first_name?.value} ${person.elements.last_name?.value}`,
                      }}
                      codename={person.system.codename}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default ServiceDetail;
