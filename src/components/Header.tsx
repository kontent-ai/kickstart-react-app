import Container from "./Container";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <Container>
      <div className="py-8 flex flex-col lg:flex-row gap-5 lg:gap-28 xl:gap-32 items-center">
        <Logo />
        <Navigation />
      </div>
    </Container>
  );
};

export default Header;
