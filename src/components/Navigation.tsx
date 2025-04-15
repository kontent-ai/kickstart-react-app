import { FC } from "react";
import { NavLink, useSearchParams } from "react-router";
import { createPreviewLink } from "../utils/link";

const Navigation: FC = () => {
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
        {createMenuLink("Home", createPreviewLink("/", isPreview))}
        {createMenuLink("Services", createPreviewLink("/services", isPreview))}
        {createMenuLink("Our Team", createPreviewLink("/our-team", isPreview))}
        {createMenuLink("Research", createPreviewLink("/research", isPreview))}
        {createMenuLink("Blog", createPreviewLink("/blog", isPreview))}
      </menu>
    </nav>
  );
};

export default Navigation;
