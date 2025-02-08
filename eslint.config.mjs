import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    {
        rules: {
            "no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: false,
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_"
                }
            ]
        }
    },
    eslintPluginReact.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    eslintPluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript', 'plugin:react-hooks/recommended'],
      }),
    js.configs.recommended,
    ...tailwind.configs["flat/recommended"]
];

export default eslintConfig;