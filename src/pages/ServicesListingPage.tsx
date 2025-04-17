import { FC } from "react";
import PageSection from "../components/PageSection";
import { useAppContext } from "../context/AppContext";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createClient } from "../utils/client";
import { Page, Service } from "../model";
import { DeliveryError } from "@kontent-ai/delivery-sdk";
import ServiceList from "../components/services/ServiceList";
import { useSearchParams } from "react-router-dom";
const ServicesListingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const [servicesPage, services] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["services_page"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .item<Page>("services")
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
        queryKey: ["services_listing"],
        queryFn: () =>
          createClient(environmentId, apiKey, isPreview)
            .items<Service>()
            .type("service")
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

  if (!servicesPage.data || !services.data) {
    return <div className="flex-grow" />;
  }

  return (
    <div className="flex flex-col gap-12">
      <PageSection color="bg-creme">
        <div className="flex flex-col-reverse gap-16 lg:gap-0 lg:flex-row items-center py-16 lg:py-0 lg:pt-[104px] lg:pb-[160px]">
          <div className="flex flex-col flex-1 gap-6 ">
            <h1 className="text-heading-1 text-heading-1-color">
              {servicesPage.data.item.elements.headline.value}
            </h1>
            <p className="text-body-lg text-body-color">
              {servicesPage.data.item.elements.subheadline.value}
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <img
              width={670}
              height={440}
              src={servicesPage.data.item.elements.hero_image?.value[0]?.url}
              alt={servicesPage.data.item.elements.hero_image?.value[0]?.description ?? ""}
              className="rounded-lg"
            />
          </div>
        </div>
      </PageSection>
      <PageSection color="bg-white">
        <ServiceList
          services={services.data.map(service => ({
            image: {
              url: service.elements.image.value[0]?.url ?? "",
              alt: service.elements.image.value[0]?.description ?? "",
            },
            name: service.elements.name.value,
            summary: service.elements.summary.value,
            tags: service.elements.medical_specialties.value.map(specialty => specialty.name),
            urlSlug: service.elements.url_slug.value,
          }))}
        />
      </PageSection>
    </div>
  );
};

export default ServicesListingPage;
