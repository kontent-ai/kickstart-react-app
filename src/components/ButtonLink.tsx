import React from "react";
import { NavLink } from "react-router";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  style?: "azure" | "transparent";
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, style = "transparent", className = "" }) => {
  return (
    <NavLink
      to={href}
      className={`${
        style === "azure" ? "button-azure" : ""
      } inline-block w-fit px-16 py-3 text-body font-semibold text-button-text-color hover:text-button-text-hover-color bg-button-background-color hover:bg-button-background-hover-color border-2 border-button-border-color hover:border-button-border-hover-color rounded-full transition-colors duration-200 ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default ButtonLink;
