import { PortableTextComponents } from "@portabletext/solid";

export const defaultPortableRichTextResolvers: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul class="text-xl text-gray-700 list-disc ml-8">{children}</ul>,
    number: ({ children }) => <ol class="text-xl text-gray-700 list-decimal ml-8">{children}</ol>,
  },
  block: {
    h1: ({ children }) => <h1 class="text-8xl font-family-libre text-azure">{children}</h1>,
    h2: ({ children }) => <h2 class="text-6xl text-azure">{children}</h2>,
    h3: ({ children }) => <h3 class="text-4xl text-azure">{children}</h3>,
    normal: ({ children }) => <p class="text-left text-gray-700 text-xl">{children}</p>,
  },
};
