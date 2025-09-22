import dotenv from 'dotenv';
import {generateDeliveryModelsAsync, resolveCase} from "@kontent-ai/model-generator";


dotenv.config();

const {VITE_ENVIRONMENT_ID, VITE_MANAGEMENT_API_KEY} = process.env;

if(!VITE_ENVIRONMENT_ID){
  throw new Error("VITE_ENVIRONMENT_ID cannot be empty!");
}

if(!VITE_MANAGEMENT_API_KEY){
  throw new Error("VITE_MAPI_API_KEY cannot be empty!");
}

await generateDeliveryModelsAsync(
  {
    environmentId: VITE_ENVIRONMENT_ID,
    managementApiKey: VITE_MANAGEMENT_API_KEY,
    addTimestamp: false,
    createFiles: true,
    outputDir: "./src/model",
    moduleFileExtension: "ts",
    fileResolvers: {
      taxonomy: (taxonomy) => resolveCase(taxonomy.codename, "camelCase"),
      contentType: (type) => resolveCase(type.codename, "camelCase"),
      snippet: (snippet) => resolveCase(snippet.codename, "camelCase"),
    },
    formatOptions: {
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      trailingComma: "all",
      parser: "typescript"
    }
  }
);