import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="container px-3">
    {children}
  </div>
);

export default Container;