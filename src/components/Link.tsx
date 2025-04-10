type LinkProps = Readonly<{
  href: string;
  text: string;
  className?: string;
}>;

const Link = ({ href, text, className = "" }: LinkProps) => {
  return (
    <a href={href} className={`text-link-color text-body underline hover:text-link-hover-color ${className}`}>
      {text}
    </a>
  );
};

export default Link;
