import { Component, For } from "solid-js";

const Navigation: Component = () => {
  const menuItems = ["Solutions", "Products", "Pricing", "Contact", "Our Company"];

  return (
    <nav>
      <menu class="flex flex-col lg:flex-row gap-5 lg:gap-[60px] items-center list-none">
        <For each={menuItems}>
          {(name) => (
            <li>
              <a href="#" class="text-xl leading-5 text-gray w-fit block hover:text-burgundy">{name}</a>
            </li>
          )}
        </For>
      </menu>
    </nav>
  );
};

export default Navigation;
