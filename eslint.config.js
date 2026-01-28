import kontentAiConfig from "@kontent-ai/eslint-config";
import kontentAiReactConfig from "@kontent-ai/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [kontentAiConfig, kontentAiReactConfig],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },
    rules: {
      "react/jsx-max-props-per-line": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
]);
