import { ParentComponent } from "solid-js";

const Container: ParentComponent = (props) => (
  <div class="container">
    {props.children}
  </div>
);

export default Container;
