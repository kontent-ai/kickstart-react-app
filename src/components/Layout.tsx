import { ParentComponent } from "solid-js";
import Footer from "./Footer";
import Header from "./Header";

const Layout: ParentComponent = (props) => (
  <div class="flex flex-col min-h-screen">
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
