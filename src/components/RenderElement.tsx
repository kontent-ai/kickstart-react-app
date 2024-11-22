import { Elements } from "@kontent-ai/delivery-sdk";
import type { FC, ReactNode } from "react";
import { ElementCodenames } from "../model";

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
      <p className={`text-balance font-sans text-xl text-gray ${props.errorMessageClassName ?? ""}`}>
        Missing or invalid element codename{" "}
        <b>
          <i>{props.elementCodename}</i>
        </b>. To learn more about codenames refer to the{" "}
        <a
          href="https://kontent.ai/learn/docs/content-model/content-types#a-edit-codenames"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Kontent.ai documentation
        </a>.
      </p>
    );
  }

  if (props.element.type !== props.requiredElementType) {
    return (
      <p className={`text-balance font-sans text-xl text-gray ${props.errorMessageClassName ?? ""}`}>
        Invalid type of element with codename{" "}
        <b>
          <i>{props.elementCodename}</i>
        </b>
        {". "}
        Required type of element: <b>{props.requiredElementType}</b>. Actual type: <b>{props.element.type}</b>.
      </p>
    );
  }

  if (typeof props.children === "function") {
    return props.children();
  }

  return <>{props.children}</>;
};

export default RenderElement;
