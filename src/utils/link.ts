export const createPreviewLink = (path: string, isPreview: boolean) => `${path}${isPreview ? "?preview=true" : ""}`;
