import React from "react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  style?: "azure" | "transparent";
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, className = "" }) => {
  return (
    <a
      href={href}
      className={`inline-block w-fit px-12 py-6 text-xl font-semibold text-button-text-color hover:text-button-text-hover-color bg-button-background-color hover:bg-button-background-hover-color border-1 border-button-border-color hover:border-button-border-hover-color rounded-full transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
