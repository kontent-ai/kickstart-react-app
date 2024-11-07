import { createDeliveryClient } from "@kontent-ai/delivery-sdk";

export const createClient = (environmentId: string, previewApiKey: string) =>
  createDeliveryClient({
    environmentId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: true,
    },
  });
