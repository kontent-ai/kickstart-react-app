import kontentAiConfig from "@kontent-ai/eslint-config";
import { defineConfig } from "eslint/config";

// React-specific linting lives in Biome (see biome.jsonc); ESLint covers type-aware TS rules only.
export default defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [kontentAiConfig],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
]);
