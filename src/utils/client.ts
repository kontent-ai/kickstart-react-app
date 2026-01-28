import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import type { CoreClientTypes } from "../model/index.ts";

export const createClient = (environmentId: string, previewApiKey: string) =>
  createDeliveryClient<CoreClientTypes>({
    environmentId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: true,
    },
    proxy: {
      basePreviewUrl: import.meta.env.VITE_DELIVER_URL as string | undefined,
    },
  });
