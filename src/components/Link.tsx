import { NavLink } from "react-router";

type LinkProps = Readonly<{
  href: string;
  text: string;
  className?: string;
}>;

const Link = ({ href, text, className = "" }: LinkProps) => {
  return (
    <NavLink to={href} className={`text-link-color text-body underline hover:text-link-hover-color ${className}`}>
      {text}
    </NavLink>
  );
};

export default Link;
