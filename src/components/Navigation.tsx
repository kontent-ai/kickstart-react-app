import { FC } from "react";
import { NavLink, useParams, useSearchParams } from "react-router";
import { createPreviewLink } from "../utils/link";

const Navigation: FC = () => {
  const { envId } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const createMenuLink = (name: string, link: string) => (
    <li key={name}>
      <NavLink to={link} className="text-xl leading-5 text-gray w-fit block hover:text-burgundy">{name}</NavLink>
    </li>
  );

  return (
    <nav>
      <menu className="flex flex-col lg:flex-row gap-5 lg:gap-[60px] items-center list-none">
        {createMenuLink("Home", createPreviewLink(envId ? `/envid/${envId}` : "/", isPreview))}
        {createMenuLink("Services", createPreviewLink(envId ? `/envid/${envId}/services` : "/services", isPreview))}
        {createMenuLink("Our Team", createPreviewLink(envId ? `/envid/${envId}/our-team` : "/our-team", isPreview))}
        {createMenuLink("Research", createPreviewLink(envId ? `/envid/${envId}/research` : "/research", isPreview))}
        {createMenuLink("Blog", createPreviewLink(envId ? `/envid/${envId}/blog` : "/blog", isPreview))}
      </menu>
    </nav>
  );
};

export default Navigation;
