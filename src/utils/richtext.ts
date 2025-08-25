import { h } from "vue";
import type { PortableTextComponents } from "@portabletext/vue";

export const defaultPortableRichTextResolvers: PortableTextComponents = {
  list: {
    bullet: (_, {slots}) => h("ul", { class: "text-xl text-gray-700 list-disc ml-8" }, slots.default?.()),
    number: (_, {slots}) => h("ol", { class: "text-xl text-gray-700 list-decimal ml-8" }, slots.default?.()),
  },
  block: {
    h1: (_, { slots }) => h("h1", { class: "text-8xl font-family-libre text-azure" }, slots.default?.()),
    h2: (_, { slots }) => h("h2", { class: "text-6xl text-azure" }, slots.default?.()),
    h3: (_, { slots }) => h("h3", { class: "text-4xl text-azure" }, slots.default?.()),
    normal: (_, { slots }) => h("p", { class: "text-left text-gray-700 text-xl" }, slots.default?.()),
  },
};
