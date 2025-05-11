import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["plugin:@eslint/js/recommended"],
    rules: {
      // Strict rules for JavaScript code
      "strict": ["error", "global"], // Enforce global strict mode (recommended for Express)
      
      // Additional rules to enforce more strictness
      "no-console": "error",         // Disallow console.log (optional, can be useful for production)
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Disallow unused variables except for _ (for unused args)
      "no-debugger": "error",        // Disallow debugger statements
      "eqeqeq": "error",             // Require strict equality (===)
      "curly": ["error", "all"],     // Require curly braces for all control structures
      "no-implicit-globals": "error", // Disallow declaring global variables
    },
    environment: {
      node: true,  // Enable Node.js global variables like `require`, `module`, etc.
      es2021: true, // Enable ES2021 syntax
    },
    globals: {
      ...globals.node, // Add node-specific globals for Express
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",  // Ensure ECMAScript modules are supported (for ES imports)
      },
    },
  },
]);