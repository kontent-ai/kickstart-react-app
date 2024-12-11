import { Elements } from "@kontent-ai/delivery-sdk";
import type { FC, ReactNode } from "react";
import { ElementCodenames } from "../model";
import KontentComponentErrorMessage from "./KontentComponentErrorMessage";

type AllElementsUnion =
  | Elements.TextElement
  | Elements.LinkedItemsElement
  | Elements.MultipleChoiceElement
  | Elements.DateTimeElement
  | Elements.RichTextElement
  | Elements.NumberElement
  | Elements.AssetsElement
  | Elements.UrlSlugElement
  | Elements.TaxonomyElement
  | Elements.CustomElement;

type ElementTypeUnion =
  | "text"
  | "number"
  | "modular_content"
  | "asset"
  | "date_time"
  | "rich_text"
  | "multiple_choice"
  | "url_slug"
  | "taxonomy"
  | "custom";

type RenderElementProps = {
  element?: AllElementsUnion;
  elementCodename: ElementCodenames;
  requiredElementType: ElementTypeUnion;
  errorMessageClassName?: string;
  children?: ReactNode | (() => ReactNode);
};

const RenderElement: FC<RenderElementProps> = (props) => {
  if (!props.element) {
    return (
      <KontentComponentErrorMessage errorMessageClassName={props.errorMessageClassName}>
        Missing element with the codename{"  "}
        <b>
          <i>{props.elementCodename}</i>
        </b>. Ensure that your{" "}
        <a
          href="https://kontent.ai/learn/try-kontent-ai/build-the-foundation/create-a-landing-page-structure#a-create-a-landing-page-content-type"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Landing Page content type
        </a>{" "}
        contains elements with elements names and{" "}
        <a
          href="https://kontent.ai/learn/docs/content-model/content-types#a-edit-codenames"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          codenames
        </a>.
      </KontentComponentErrorMessage>
    );
  }

  if (props.element.type !== props.requiredElementType) {
    return (
      <KontentComponentErrorMessage errorMessageClassName={props.errorMessageClassName}>
        Invalid type of element with codename{" "}
        <b>
          <i>{props.elementCodename}</i>
        </b>
        {". "}
        Required type of element: <b>{props.requiredElementType}</b>. Actual type: <b>{props.element.type}</b>.
      </KontentComponentErrorMessage>
    );
  }

  if (typeof props.children === "function") {
    return props.children();
  }

  return <>{props.children}</>;
};

export default RenderElement;
