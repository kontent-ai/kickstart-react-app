type LinkProps = Readonly<{
  href: string;
  text: string;
}>;

const Link = ({ href, text }: LinkProps) => {
  return (
    <a href={href} className="text-burgundy text-body underline hover:text-azure">
      {text}
    </a>
  );
};

export default Link;
