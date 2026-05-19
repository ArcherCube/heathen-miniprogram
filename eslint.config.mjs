// @ts-check

import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import { config } from "@heathen/eslint-config";

export default defineConfig(
  includeIgnoreFile(path.resolve(import.meta.dirname, ".gitignore")),
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"] },
  config,
);
