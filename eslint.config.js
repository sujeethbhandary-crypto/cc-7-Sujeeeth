import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "post-browser/**"
    ]
  },

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      },
      globals: globals.node
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    }
  },

  js.configs.recommended,
  ...tseslint.configs.recommended
]);
