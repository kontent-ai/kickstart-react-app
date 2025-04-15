import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import { CoreClientTypes } from "../model";

export const createClient = (environmentId: string, previewApiKey: string, usePreviewMode: boolean) =>
  createDeliveryClient<CoreClientTypes>({
    environmentId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode,
      waitForLoadingNewContent: true,
    },
    proxy: {
      baseUrl: `https://deliver.${import.meta.env.VITE_KONTENT_URL ?? "kontent.ai"}`,
      basePreviewUrl: `https://preview-deliver.${import.meta.env.VITE_KONTENT_URL ?? "kontent.ai"}`,
    },
  });
