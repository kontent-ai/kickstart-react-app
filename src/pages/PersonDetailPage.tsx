import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { createClient } from "../utils/client";
import { useAppContext } from "../context/AppContext";
import { Person } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import { PortableText } from "@portabletext/react";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import PageSection from "../components/PageSection";

const PersonDetailPage: React.FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const { slug } = useParams();

  const personData = useQuery({
    queryKey: [`person-detail_${slug}`],
    queryFn: () =>
      createClient(environmentId, apiKey)
        .item<Person>(slug ?? "")
        .toPromise()
        .then(res => res.data.item)
        .catch((err) => {
          if (err instanceof DeliveryError) {
            return null;
          }
          throw err;
        }),
  });

  if (!personData.data) {
    return <div className="flex-grow" />;
  }

  const person = personData.data;

  return (
    <div className="flex flex-col">
      <PageSection color="bg-azure">
        <div className="azure-theme flex flex-col lg:flex-row justify-between items-start gap-16 pt-[104px] pb-[160px] items-center">
          <div className="flex flex-col gap-6 max-w-[728px]">
            <div className="w-fit text-body-xs text-white border border-white px-4 py-2 rounded-lg uppercase tracking-wider font-bold">
              Person
            </div>
            <h1 className="text-heading-1 text-heading-1-color">
              {person.elements.prefix?.value
                && <span>{person.elements.prefix.value}</span>}
              &nbsp;
              {person.elements.first_name?.value} {person.elements.last_name?.value}
              {person.elements.suffixes?.value
                && <span>, {person.elements.suffixes.value}</span>}
            </h1>
            <p className="text-[32px] leading-[130%] text-body-color">
              {person.elements.job_title?.value}
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <img
              src={person.elements.image?.value[0]?.url}
              alt={person.elements.image?.value[0]?.description
                ?? `Photo of ${person.elements.first_name?.value} ${person.elements.last_name?.value}`}
              width={550}
              height={440}
              className="rounded-lg w-[550px] h-[440px] object-cover"
            />
          </div>
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <div className="flex flex-col lg:flex-row gap-16 py-16 max-w-6xl mx-auto justify-center">
          <div className="prose prose-lg">
            <PortableText
              value={transformToPortableText(person.elements.biography?.value)}
              components={defaultPortableRichTextResolvers}
            />
          </div>

          {(person.elements.phone?.value || person.elements.email?.value
            || person.elements.website?.value) && (
            <div className="flex-1 flex flex-col gap-10">
              <h2 className="text-heading-2 text-burgundy">Contact</h2>

              <div className="flex flex-col gap">
                {person.elements.phone?.value && (
                  <div>
                    <p className="text-body-lg text-grey-600 mb-1">
                      <span className="font-bold">Phone:</span> {person.elements.phone.value}
                    </p>
                  </div>
                )}

                {person.elements.email?.value && (
                  <div>
                    <p className="text-body-lg text-grey-600 mb-1">
                      <span className="font-bold">Email:</span>&nbsp;
                      <a
                        href={`mailto:${person.elements.email.value}`}
                        className="text-burgundy hover:text-azure underline"
                      >
                        {person.elements.email.value}
                      </a>
                    </p>
                  </div>
                )}

                {person.elements.website?.value && (
                  <div>
                    <p className="text-body-lg text-grey-600 mb-1">
                      <span className="font-[700]">Website:</span>&nbsp;
                      <a
                        href={person.elements.website.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-burgundy hover:text-azure underline"
                      >
                        {person.elements.website.value}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
};

export default PersonDetailPage;
