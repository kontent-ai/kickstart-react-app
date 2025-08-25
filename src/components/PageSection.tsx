import { ParentProps, ParentComponent } from "solid-js";
import Container from "./Container";

type PageSectionProps = ParentProps<{
  color: string;
}>;

const PageSection: ParentComponent<PageSectionProps> = (props) => (
  <div class={props.color}>
    <Container>
      {props.children}
    </Container>
  </div>
);

export default PageSection;
