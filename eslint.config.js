import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
)