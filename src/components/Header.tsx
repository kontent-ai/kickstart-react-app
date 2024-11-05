import Container from "./Container";

const Header: React.FC = () => {
  const createMenuLink = (name: string) => (
    <li className="">
      <a href="#" className="text-xl leading-5 text-gray w-fit block hover:text-burgundy">{name}</a>
    </li>
  );

  return (
    <Container>
      <div className="py-8 flex flex-row gap-32 items-center">
        <h1 className="text-5xl text-azure font-libre">Karma Health</h1>
        <nav>
          <menu className="flex flex-row gap-14 items-center list-none">
            {["Solutions", "Products", "Pricing", "Contact", "Our Company"].map(createMenuLink)}
          </menu>
        </nav>
      </div>
    </Container>
  );
};

export default Header;
