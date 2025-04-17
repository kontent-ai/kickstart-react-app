import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import { CoreClientTypes } from "../model";

const url = !import.meta.env.VITE_KONTENT_URL ? "kontent.ai" : import.meta.env.VITE_KONTENT_URL;

export const createClient = (environmentId: string, previewApiKey: string, usePreviewMode: boolean) =>
  createDeliveryClient<CoreClientTypes>({
    environmentId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode,
      waitForLoadingNewContent: true,
    },
    proxy: {
      baseUrl: `https://deliver.${url}`,
      basePreviewUrl: `https://preview-deliver.${url}`,
    },
  });
