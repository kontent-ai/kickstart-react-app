import Container from "./components/Container";
import Divider from "./components/Divider";
import FeaturedArticle from "./components/FeaturedArticle";
import FeaturedEvent from "./components/FeaturedEvent";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import Video from "./components/Video";
import "./index.css";

function App() {
  return (
    <div>
      <Header />
      <HeroImage />
      <Container>
        <div className="pt-[104px] pb-40 inline-flex items-center ">
          <Video />
        </div>
      </Container>
      <div className="bg-creme">
        <Container>
          <FeaturedArticle />
        </Container>
      </div>
      <Divider />
      <div className="bg-creme">
        <Container>
          <FeaturedEvent />
        </Container>
      </div>
    </div>
  );
}

export default App;
