import { PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";

export const defaultPortableRichTextResolvers = {
  list: {
    bullet: ({ children }) => <ul className="text-xl text-gray-700 list-disc ml-8">{children}</ul>,
    number: ({ children }) => <ol className="text-xl text-gray-700 list-decimal ml-8">{children}</ol>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-heading-1 text-heading-1-color">{children}</h1>,
    h2: ({ children }) => <h2 className="text-heading-2 text-heading-2-color">{children}</h2>,
    h3: ({ children }) => <h3 className="text-heading-3 text-heading-3-color">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="text-heading-4 text-heading-4-color">
        {children}
      </h4>
    ),

    normal: ({ children }) => <p className="text-body text-body-color">{children}</p>,
  },
} as const satisfies PortableTextReactResolvers;
