import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import Navigation from "./Navigation.tsx";

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
