import type { FC } from "react";
import Divider from "./Divider.tsx";
import Logo from "./Logo.tsx";
import Navigation from "./Navigation.tsx";

const Footer: FC = () => (
  <footer className="w-full">
    <div className="flex flex-col items-center gap-10 py-20">
      <Logo />
      <Navigation />
    </div>
    <Divider />
    <p className="text-[16px] text-gray-light mx-auto w-fit py-[60px]">
      ©2024 Karma Health, LLC. All Rights Reserved.
    </p>
  </footer>
);

export default Footer;
