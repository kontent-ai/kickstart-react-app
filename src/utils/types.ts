// biome-ignore lint/suspicious/noExplicitAny: Required for distributive conditional type behavior
export type Replace<T, NewValues extends { [key in keyof T]?: unknown }> = T extends any
  ? Omit<T, keyof NewValues> & Readonly<NewValues>
  : never;
