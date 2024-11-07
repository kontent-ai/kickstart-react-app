import Divider from "./components/Divider";
import FeaturedArticle from "./components/FeaturedArticle";
import FeaturedEvent from "./components/FeaturedEvent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import PageSection from "./components/PageSection";
import Video from "./components/Video";
import "./index.css";

function App() {
  return (
    <div>
      <Header />
      <PageSection color="bg-creme">
        <HeroImage />
      </PageSection>
      <PageSection color="bg-white">
        <div className="pt-[104px] pb-40 flex items-center ">
          <Video />
        </div>
      </PageSection>
      <PageSection color="bg-creme">
        <FeaturedArticle />
      </PageSection>
      <Divider />
      <PageSection color="bg-creme">
        <FeaturedEvent />
      </PageSection>
      <Footer></Footer>
    </div>
  );
}

export default App;
