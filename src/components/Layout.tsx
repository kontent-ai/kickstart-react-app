import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: FC<PropsWithChildren> = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
