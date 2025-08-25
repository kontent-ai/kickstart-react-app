import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    environmentId: import.meta.env.VITE_ENVIRONMENT_ID as string,
    apiKey: import.meta.env.VITE_DELIVERY_API_KEY as string,
  }),
  getters: {
    getEnvironmentId: (state) => state.environmentId,
    getApiKey: (state) => state.apiKey,
  },
});
