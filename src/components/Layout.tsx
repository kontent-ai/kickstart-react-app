import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import SmartLinkInitializer from "./smartlink/SmartLinkInitializer";

const Layout: FC<PropsWithChildren> = () => (
  <div className="flex flex-col min-h-screen">
    <ScrollRestoration getKey={location => location.pathname} />
    <SmartLinkInitializer />
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
