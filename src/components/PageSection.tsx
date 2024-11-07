import { FC, PropsWithChildren } from "react";
import Container from "./Container";

type PageSectionProps = PropsWithChildren<
  Readonly<{
    color: string;
  }>
>;

const PageSection: FC<PageSectionProps> = ({ children, color }) => (
  <div className={color}>
    <Container>
      {children}
    </Container>
  </div>
);

export default PageSection;
