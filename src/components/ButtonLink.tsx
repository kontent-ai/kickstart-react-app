import React from "react";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, className = "" }) => {
  return (
    <a
      href={href}
      className={`inline-block w-fit px-12 py-6 text-xl font-semibold text-white bg-azure hover:bg-sky-600 rounded-full transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
