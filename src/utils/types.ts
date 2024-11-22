// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Replace<T, NewValues extends { [key in keyof T]?: unknown }> = T extends any ?
    & Omit<T, keyof NewValues>
    & Readonly<NewValues>
  : never;
