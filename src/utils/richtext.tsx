import { PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";

export const defaultPortableRichTextResolvers: PortableTextReactResolvers = {
  list: {
    bullet: ({ children }) => <ul className="text-xl text-gray-700 list-disc ml-8">{children}</ul>,
    number: ({ children }) => <ol className="text-xl text-gray-700 list-decimal ml-8">{children}</ol>,
  },
  marks: {
    sup: ({ children }) => <sup>{children}</sup>,
    sub: ({ children }) => <sub>{children}</sub>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-8xl font-libre text-azure">{children}</h1>,
    h2: ({ children }) => <h2 className="text-6xl text-azure">{children}</h2>,
    h3: ({ children }) => <h3 className="text-4xl text-azure">{children}</h3>,
    normal: ({ children }) => <p className="text-center xl:text-left text-gray-700 text-xl">{children}</p>,
  },
};
