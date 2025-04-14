import { FC } from "react";
import { NavLink } from "react-router";

const Navigation: FC = () => {
  const createMenuLink = (name: string, link: string) => (
    <li key={name}>
      <NavLink to={link} className="text-xl leading-5 text-gray w-fit block hover:text-burgundy">{name}</NavLink>
    </li>
  );

  return (
    <nav>
      <menu className="flex flex-col lg:flex-row gap-5 lg:gap-[60px] items-center list-none">
        {createMenuLink("Home", "")}
        {createMenuLink("Services", "services")}
        {createMenuLink("Our Team", "our-team")}
        {createMenuLink("Research", "research")}
        {createMenuLink("Blog", "blog")}
      </menu>
    </nav>
  );
};

export default Navigation;
