import { FC } from "react";

const Navigation: FC = () => {
  const createMenuLink = (name: string) => (
    <li className="">
      <a href="#" className="text-xl leading-5 text-gray w-fit block hover:text-burgundy">{name}</a>
    </li>
  );

  return (
    <nav>
      <menu className="flex flex-col lg:flex-row gap-5 lg:gap-[60px] items-center list-none">
        {["Solutions", "Products", "Pricing", "Contact", "Our Company"].map(createMenuLink)}
      </menu>
    </nav>
  );
};

export default Navigation;
