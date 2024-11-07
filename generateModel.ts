import dotenv from 'dotenv';
import {generateDeliveryModelsAsync} from "@kontent-ai/model-generator";


dotenv.config();

const {VITE_ENVIRONMENT_ID, VITE_MAPI_API_KEY} = process.env;

if(!VITE_ENVIRONMENT_ID){
  throw new Error("VITE_ENVIRONMENT_ID cannot be empty!");
}

if(!VITE_MAPI_API_KEY){
  throw new Error("VITE_DELIVERY_API_KEY cannot be empty!");
}

await generateDeliveryModelsAsync(
  {
    environmentId: VITE_ENVIRONMENT_ID,
    apiKey: VITE_MAPI_API_KEY,
    addTimestamp: false,
    outputDir: "./src/model",
    moduleFileExtension: "ts",
    fileResolvers: {
      taxonomy: "camelCase",
      contentType: "camelCase",
      snippet: "camelCase"
    }
  }
);